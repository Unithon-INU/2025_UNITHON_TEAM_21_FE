import {useEffect, useState} from 'react';
import {ItemDonationType} from '@/types/ItemDonationType';
import {API_URL} from '@env';

export function useGetItemDonation(id: number) {
    const [items, setItems] = useState<ItemDonationType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [e, sete] = useState<string | null>(null);

    const fetchItems = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/api/donation-items/organization/${id}`);
            const data = await response.json();
            setItems(data);
        } catch (err) {
            sete('Failed to fetch items');
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchItems();
    }, [id]);
    return {items, loading, e, refetch: fetchItems};
}

export function useEditItemDonation() {
    const addItem = async (orgid: number, itemName: string, requiredQuantity: number) => {
        try {
            const response = await fetch(`${API_URL}/api/donation-items/${orgid}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({orgid, itemName, requiredQuantity}),
            });
            if (!response.ok) {
                throw new Error('Failed to create item');
            }
            return await response.json();
        } catch (e) {
            throw e;
        }
    };
    const editItem = async (itemid: number, itemName: string, requiredQuantity: number, currentQuantity: number) => {
        try {
            const response = await fetch(`${API_URL}/api/donation-items/${itemid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({itemName, requiredQuantity, currentQuantity}),
            });
            if (!response.ok) {
                throw new Error('Failed to edit item');
            }
            return await response.json();
        } catch (e) {
            throw e;
        }
    };
    const deleteItem = async (id: number) => {
        try {
            const response = await fetch(`${API_URL}/api/donation-items/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new e('Failed to delete item');
            }
            return await response.json();
        } catch (e) {
            throw e;
        }
    };
    return {addItem, editItem, deleteItem};
}
