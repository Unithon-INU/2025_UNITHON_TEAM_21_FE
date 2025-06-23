import {useMemo} from 'react';
import {useCenter} from './useCenter';

export function useCenterData(searchText: string) {
    const {centerData, loading} = useCenter(180);

    const filtered = useMemo(() => {
        if (!searchText.trim()) return [];
        return centerData.filter(center =>
            center.centerName.toLowerCase().includes(searchText.trim().toLowerCase())
        );
    }, [searchText, centerData]);

    return {
        items: filtered,
        loading,
    };
}
