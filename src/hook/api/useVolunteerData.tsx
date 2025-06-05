import {useEffect, useState, useCallback} from 'react';
import {getVltrPartcptnItemListItem, getVltrSearchWordList} from '@/types/volunteerTyps';
import {xml2Json} from '@/utils/xml2json';

export function useVolunteerData(iconKey: string = '', keyword: string = '') {
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [volunteerData, setVolunteerData] = useState<getVltrSearchWordList | null>(null);
    const [items, setItems] = useState<any[]>([]);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        setPage(1);
        setHasMore(true);
        setVolunteerData(null);
    }, [iconKey, keyword]);

    useEffect(() => {
        const fetchVolunteerData = async () => {
            if (!hasMore && page !== 1) return;
            if (page === 1) setLoading(true);
            else setIsFetchingMore(true);
            const params = [`upperClCode=${iconKey}`, 'schSido=6280000', 'numOfRows=10', `pageNo=${page}`];
            if (keyword) params.push(`keyword=${encodeURIComponent(keyword)}`);

            try {
                const response = await fetch(
                    `http://openapi.1365.go.kr/openapi/service/rest/VolunteerPartcptnService/getVltrSearchWordList?${params.join('&')}`,
                );
                if (!response.ok) throw new Error('API call failed');
                const xml = await response.text();
                const json = xml2Json(xml);

                const newItems = Array.isArray(json?.body?.items?.item) ? json.body.items.item : json?.body?.items?.item ? [json.body.items.item] : [];

                setVolunteerData(json);

                if (page === 1) setItems(newItems);
                else setItems(prev => [...prev, ...newItems]);

                const totalCount = Number(json?.body?.totalCount ?? 0);
                if ((page - 1) * 10 + newItems.length >= totalCount || newItems.length < 10) {
                    setHasMore(false);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
                setIsFetchingMore(false);
            }
        };
        fetchVolunteerData();
    }, [hasMore, iconKey, page, keyword]);

    const loadMore = useCallback(() => {
        if (!loading && !isFetchingMore && hasMore) {
            setPage(prev => prev + 1);
        }
    }, [loading, isFetchingMore, hasMore]);

    return {
        loading,
        volunteerData,
        items,
        loadMore,
        isFetchingMore,
        hasMore,
    };
}

export function useVolunteerDeatil(progrmRegistNo: number) {
    const [loading, setLoading] = useState(false);
    const [item, setItem] = useState<getVltrPartcptnItemListItem>({} as getVltrPartcptnItemListItem);
    useEffect(() => {
        const fetchitem = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `http://openapi.1365.go.kr/openapi/service/rest/VolunteerPartcptnService/getVltrPartcptnItem?progrmRegistNo=${progrmRegistNo}`,
                );
                if (!response.ok) {
                    throw new Error('API 호출 실패');
                }
                const xml = await response.text();
                const json = xml2Json(xml);
                setItem(json.body.items.item);
            } catch (e: any) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        };
        fetchitem();
    }, [progrmRegistNo]);
    return {
        loading,
        item,
    };
}

export function useVolunteerDataKeyword(keyword: string = '') {
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [volunteerData, setVolunteerData] = useState<getVltrSearchWordList | null>(null);
    const [items, setItems] = useState<any[]>([]);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        setPage(1);
        setItems([]);
        setHasMore(true);
        setVolunteerData(null);
    }, [keyword]);

    useEffect(() => {
        const fetchVolunteerData = async () => {
            if (!hasMore && page !== 1) return;
            if (page === 1) setLoading(true);
            else setIsFetchingMore(true);
            try {
                const response = await fetch(
                    `http://openapi.1365.go.kr/openapi/service/rest/VolunteerPartcptnService/getVltrSearchWordList?Keyword=${keyword}&schSido=6280000&numOfRows=10&pageNo=${page}`,
                );
                if (!response.ok) throw new Error('API call failed');
                const xml = await response.text();
                const json = xml2Json(xml);

                const newItems = Array.isArray(json?.body?.items?.item) ? json.body.items.item : json?.body?.items?.item ? [json.body.items.item] : [];

                setVolunteerData(json);

                if (page === 1) setItems(newItems);
                else setItems(prev => [...prev, ...newItems]);

                const totalCount = Number(json?.body?.totalCount ?? 0);
                if ((page - 1) * 10 + newItems.length >= totalCount || newItems.length < 10) {
                    setHasMore(false);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
                setIsFetchingMore(false);
            }
        };
        fetchVolunteerData();
    }, [hasMore, page, keyword]);

    const loadMore = useCallback(() => {
        if (!loading && !isFetchingMore && hasMore) {
            setPage(prev => prev + 1);
        }
    }, [loading, isFetchingMore, hasMore]);

    return {
        loading,
        volunteerData,
        items,
        loadMore,
        isFetchingMore,
        hasMore,
    };
}
