import {useEffect, useState, useCallback} from 'react';
import {getVltrAreaListItem, getVltrPartcptnItemListItem, getVltrSearchWordList, getVltrSearchWordListItem} from '@/types/volunteerTyps';
import {xml2Json} from '@/utils/xml2json';
import {RootState} from '@/store/store';
import {useSelector} from 'react-redux';

export function useVolunteerData(iconKey: string = '', keyword: string = '') {
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [volunteerData, setVolunteerData] = useState<getVltrSearchWordList | null>(null);
    const [items, setItems] = useState<any[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const location = useSelector((state: RootState) => state.location);

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
            const params = [`upperClCode=${iconKey}`, `schSido=${location.address?.sidoCd ? location.address?.sidoCd : ''}`, 'numOfRows=10', `pageNo=${page}`];
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
    }, [hasMore, iconKey, page, keyword, location]);

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
    const location = useSelector((state: RootState) => state.location);

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
                    `http://openapi.1365.go.kr/openapi/service/rest/VolunteerPartcptnService/getVltrSearchWordList?Keyword=${keyword}&schSido=${
                        location.address?.sidoCd ? location.address?.sidoCd : ''
                    }&numOfRows=10&pageNo=${page}`,
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
    }, [hasMore, page, keyword, location]);

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

export function useVolunteerNearBy() {
    const location = useSelector((state: RootState) => state.location);
    const [items, setItems] = useState<getVltrPartcptnItemListItem[] | null>(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        async function fetchNearbyVolunteers() {
            setLoading(true);
            if (!location) {
                console.warn('위치 정보가 없습니다.');
                return;
            }
            try {
                const response = await fetch(
                    `http://openapi.1365.go.kr/openapi/service/rest/VolunteerPartcptnService/getVltrAreaList?schSido=${location.address?.sidoCd}&schSign1=${location.address?.gugunCd}`,
                    {method: 'GET', headers: {'Content-Type': 'application/json'}},
                );
                if (!response.ok) {
                    throw new Error('네트워크 응답이 실패했습니다.');
                }

                const data = await response.text();
                const volunteerData = xml2Json(data);
                const areaItem = volunteerData.body?.items?.item;
                const detailPromises = areaItem.map((item: getVltrAreaListItem) => {
                    const volunteerId = item.progrmRegistNo;
                    return fetch(`http://openapi.1365.go.kr/openapi/service/rest/VolunteerPartcptnService/getVltrPartcptnItem?progrmRegistNo=${volunteerId}`)
                        .then(res => {
                            if (!res.ok) return null;
                            return res.text();
                        })
                        .then(xml => {
                            if (!xml) return null;
                            const detailData = xml2Json(xml);
                            return detailData.body?.items?.item || null;
                        });
                });

                const detailedItems = await Promise.all(detailPromises);
                setItems(detailedItems);
            } catch (error) {
                console.error('자원봉사자 정보를 가져오는 중 오류 발생:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchNearbyVolunteers();
    }, [location]);
    return {items, loading};
}

export function useVolunteerCenterName(name?: string) {
    const [items, setItems] = useState<getVltrSearchWordListItem[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    function normalizeItems(item: any): getVltrSearchWordListItem[] {
        if (!item) return [];
        return Array.isArray(item) ? item : [item];
    }
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            if (!name) return;
            try {
                const response = await fetch(`http://openapi.1365.go.kr/openapi/service/rest/VolunteerPartcptnService/getVltrSearchWordList?nanmmbyNm=${name}`);
                if (!response.ok) {
                    throw new Error('API 호출 실패');
                }
                const xml = await response.text();
                const data = xml2Json(xml);
                setItems(normalizeItems(data.body.items.item));
            } catch (e: any) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [name]);
    return {items, loading, error};
}
