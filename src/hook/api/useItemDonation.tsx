import {useEffect, useState} from 'react';
import {ItemDonationType} from '@/types/ItemDonationType';
import {API_URL} from '@env';

export function useGetItemDonation(id: number) {
    const [items, setItems] = useState<ItemDonationType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const fetchItems = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/api/donation-items/organization/${id}`);
            const data = await response.json();
            setItems(data);
        } catch (err) {
            setError('Failed to fetch items');
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchItems();
    }, [id]);
    return {items, loading, error, refetch: fetchItems};
}

export function useEditItemDonation() {
    const addItem = async (id: number, itemName: string, requiredQuantity: number) => {
        try {
            const response = await fetch(`${API_URL}/api/donation-items/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id, itemName, requiredQuantity}),
            });
            if (!response.ok) {
                throw new Error('Failed to create item');
            }
            return await response.json();
        } catch (error) {
            console.error('Error creating item:', error);
            throw error;
        }
    };
    const editItem = async (itemId: number, itemName: string, requiredQuantity: number, currentQuantity: number) => {
        try {
            const response = await fetch(`${API_URL}/api/donation-items/${itemId}`, {
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
        } catch (error) {
            console.error('Error creating item:', error);
            throw error;
        }
    };
    const deleteItem = async (id: number) => {
        try {
            const response = await fetch(`${API_URL}/api/donation-items/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete item');
            }
            return await response.json();
        } catch (error) {
            console.error('Error deleting item:', error);
            throw error;
        }
    };
    return {addItem, editItem, deleteItem};
}
