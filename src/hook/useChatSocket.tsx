import {useEffect, useReducer, useRef, useCallback} from 'react';
import {Client, IMessage} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';
type SubscriptionCallback = (message: any) => void;

type State = {
    client: Client | null;
    subscriptions: Map<string, any>;
};
type Action =
    | {type: 'SET_CLIENT'; payload: Client}
    | {type: 'ADD_SUBSCRIPTION'; payload: {destination: string; subscription: any}}
    | {type: 'REMOVE_SUBSCRIPTION'; payload: string}
    | {type: 'CLEAR_CLIENT'};

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_CLIENT':
            return {...state, client: action.payload};
        case 'ADD_SUBSCRIPTION':
            return {...state, subscriptions: new Map(state.subscriptions).set(action.payload.destination, action.payload.subscription)};
        case 'REMOVE_SUBSCRIPTION':
            const updatedSubscriptions = new Map(state.subscriptions);
            updatedSubscriptions.delete(action.payload);
            return {...state, subscriptions: updatedSubscriptions};
        case 'CLEAR_CLIENT':
            return {client: null, subscriptions: new Map()};
        default:
            return state;
    }
};

export const useWebSocketService = (webSocketUrl: string, onConnectCallback: () => void, onErrorCallback: (error: string) => void) => {
    const [state, dispatch] = useReducer(reducer, {
        client: null,
        subscriptions: new Map(),
    });
    const {token} = useSelector((state: RootState) => state.user);

    const clientRef = useRef<Client | null>(null);
    const isConnected = useRef(false);

    useEffect(() => {
        clientRef.current = state.client;
    }, [state.client]);

    const connect = useCallback(() => {
        // if (state.client || isConnected.current) return;

        const socket = new SockJS('/ws-chat');
        const client = new Client({
            webSocketFactory: () => socket,//new SockJS('http://43.203.198.154:8080/ws-chat')//, null, {transports: ['websocket']}),
            debug: str => console.log('debugLog', str),
            reconnectDelay: 5000,
            heartbeatIncoming: 1000,
            heartbeatOutgoing: 1000,
            connectHeaders: {
                Authorization: `Bearer ${token?.accessToken}`,
            },
            onConnect: () => {
                //isConnected.current = true;
                console.log('WebSocket connected');
                onConnectCallback();
            },
            onStompError: error => {
                onErrorCallback(error.headers['message'] || 'Unknown error');
            },
            onWebSocketError: error => {
                console.error('❌ WebSocket 에러 발생:', error);
            },
        });
        try {
            client.activate();
        } catch (error) {
            console.error('❌ WebSocket 연결 실패:', error);
            onErrorCallback(error instanceof Error ? error.message : 'Unknown error');
            return;
        }
        dispatch({type: 'SET_CLIENT', payload: client});
    }, [token, state.client, webSocketUrl, onConnectCallback, onErrorCallback]);

    const subscribe = useCallback(
        (destination: string, callback: SubscriptionCallback) => {
            const client = clientRef.current;
            if (!client || !isConnected.current) return;

            if (state.subscriptions.has(destination)) return;

            const subscription = client.subscribe(destination, (message: IMessage) => {
                if (message.body) callback(JSON.parse(message.body));
            });

            dispatch({type: 'ADD_SUBSCRIPTION', payload: {destination, subscription}});
        },
        [state.subscriptions],
    );

    const send = useCallback((destination: string, body: Record<string, any> = {}) => {
        const client = clientRef.current;
        if (!client || !isConnected.current) return;
        client.publish({destination, body: JSON.stringify(body)});
    }, []);

    const unsubscribe = useCallback(
        (destination: string) => {
            const subscription = state.subscriptions.get(destination);
            if (subscription) {
                subscription.unsubscribe();
                dispatch({type: 'REMOVE_SUBSCRIPTION', payload: destination});
            }
        },
        [state.subscriptions],
    );

    const disconnect = useCallback(() => {
        const client = clientRef.current;
        if (client && isConnected.current) {
            state.subscriptions.forEach(subscription => subscription.unsubscribe());
            client.deactivate();
            dispatch({type: 'CLEAR_CLIENT'});
            isConnected.current = false;
        }
    }, [state.subscriptions]);

    return {connect, subscribe, send, unsubscribe, disconnect};
};
