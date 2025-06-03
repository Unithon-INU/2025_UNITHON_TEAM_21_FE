import {useEffect, useState} from 'react';

import {ChildrenCenterList} from '@/types/ChildrenCenter';

export function useCenter(perPage: number = 10) {
    const [centerData, setCenterData] = useState<ChildrenCenterList[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://chatbot-server-cyan.vercel.app/api/childrenCenter/data?perPage=${perPage}`);
                const results = await response.json();
                setCenterData(results.data as ChildrenCenterList[]);
            } catch (e) {
                console.error('Failed to read CSV:', e);
            } finally{
                setLoading(false);
            }
        };
        fetchData();
    }, [perPage]);

    return {centerData, loading};
}
