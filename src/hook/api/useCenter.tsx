import {useEffect, useState, useCallback} from 'react';
import {ChildrenCenterList} from '@/types/ChildrenCenter';

export function useCenter(perPage: number = 10) {
    const [centerData, setCenterData] = useState<ChildrenCenterList[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const fetchData = useCallback(
        async (pageNum: number) => {
            try {
                const response = await fetch(`https://chatbot-server-cyan.vercel.app/api/childrenCenter/data?perPage=${perPage}&page=${pageNum}`);
                const results = await response.json();
                if (results.data && results.data.length > 0) {
                    if (pageNum === 1) {
                        setCenterData(results.data);
                    } else {
                        setCenterData(prev => [...prev, ...results.data]);
                    }
                    setHasMore(true);
                } else {
                    setHasMore(false);
                }
            } catch (e) {
                console.error('Failed to read CSV:', e);
            } finally {
                setLoading(false);
                setIsFetchingMore(false);
            }
        },
        [perPage],
    );

    useEffect(() => {
        setLoading(true);
        fetchData(1);
        setPage(1);
    }, [perPage, fetchData]);

    const fetchMore = useCallback(() => {
        if (isFetchingMore || !hasMore) return;
        setIsFetchingMore(true);
        const nextPage = page + 1;
        fetchData(nextPage);
        setPage(nextPage);
    }, [isFetchingMore, hasMore, page, fetchData]);

    return {centerData, loading, fetchMore, isFetchingMore, hasMore};
}
