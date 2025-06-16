import {useState, useEffect, useCallback} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';
import {ChildrenCenterList} from '@/types/ChildrenCenter';

function deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    if (!lat1 || !lon1 || !lat2 || !lon2) return Infinity;
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c * 1000;
}

export function useCenter(perPage: number = 10) {
    const {location} = useSelector((state: RootState) => state.location);

    const [rawCenterData, setRawCenterData] = useState<ChildrenCenterList[]>([]);
    const [sortedCenterData, setSortedCenterData] = useState<ChildrenCenterList[]>([]);
    const [centerData, setCenterData] = useState<ChildrenCenterList[]>([]);

    const [loading, setLoading] = useState(true);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const fetchAllData = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://chatbot-server-cyan.vercel.app/api/childrenCenter/data?perPage=180');
                const results = await response.json();
                if (results.data && results.data.length > 0) {
                    setRawCenterData(results.data);
                }
            } catch (e) {
                console.error('Failed to fetch all data:', e);
            }
        };
        fetchAllData();
    }, []);

    useEffect(() => {
        if (rawCenterData.length === 0) return;

        const dataWithDistance = rawCenterData.map(center => {
            const distance = location ? calculateDistance(location.latitude, location.longitude, center.y, center.x) : Infinity;

            return {
                ...center,
                distance,
            };
        });

        dataWithDistance.sort((a, b) => a.distance - b.distance);

        setSortedCenterData(dataWithDistance);
        setCenterData(dataWithDistance.slice(0, perPage));
        setPage(1);
        setHasMore(dataWithDistance.length > perPage);
        setLoading(false);
    }, [rawCenterData, location, perPage]);

    const fetchMore = useCallback(() => {
        if (isFetchingMore || !hasMore) return;
        setIsFetchingMore(true);

        const nextPage = page + 1;
        const nextDataSize = nextPage * perPage;
        const nextSlice = sortedCenterData.slice(0, nextDataSize);

        setCenterData(nextSlice);
        setPage(nextPage);

        if (nextSlice.length >= sortedCenterData.length) {
            setHasMore(false);
        }

        setTimeout(() => setIsFetchingMore(false), 100);
    }, [isFetchingMore, hasMore, page, perPage, sortedCenterData]);

    return {centerData, loading, fetchMore, isFetchingMore, hasMore};
}
