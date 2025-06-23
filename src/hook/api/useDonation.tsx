import {useCallback, useEffect, useState} from 'react';
import {RootState} from '@/store/store';
import {DonationInquiry, CenterTotalDonation, UserTotalDonation, UserBill} from '@/types/DonationType';
import {API_URL} from '@env';
import {useSelector} from 'react-redux';

export function useInquiryDonation(id: number) {
    const [items, setItems] = useState<DonationInquiry[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchDonations = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_URL}/api/blockchain/donations?orgId=${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || '데이터를 불러오는 데 실패했습니다.');
            }
            const item: DonationInquiry[] = await response.json();
            setItems(item);
        } catch (err) {
            setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchDonations();
    }, [id, fetchDonations]);

    return {
        items,
        loading,
        error,
        fetchDonations,
    };
}

export function useCenterTotalDonation(id: number) {
    const [total, setTotal] = useState<CenterTotalDonation>({orgId: id, totalAmount: 0});
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTotalDonation = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${API_URL}/api/blockchain/total?orgId=${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const item = await response.json();
                setTotal(item);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };
        fetchTotalDonation();
    }, [id]);
    return {
        total,
        loading,
        error,
    };
}

export function useConfirmDonation() {
    const confirmDonation = async (donationId: number) => {
        try {
            const response = await fetch(`${API_URL}/api/org/donations/${donationId}/confirm`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || '요청 처리 중 오류가 발생했습니다.');
            }
        } catch (err) {
            throw err;
        }
    };
    return {
        confirm: (donationId: number) => confirmDonation(donationId),
    };
}

export function useDonation() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const {token} = useSelector((state: RootState) => state.user);

    const fetchDonation = async (organizationId: number, amount: number) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_URL}/api/donations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token?.accessToken}`,
                },
                body: JSON.stringify({organizationId, amount}),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || '기부 처리 중 오류가 발생했습니다.');
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return {donation: fetchDonation, loading, error};
}

export function useUserTotalDonation() {
    const [item, setItem] = useState<UserTotalDonation>({email: '', totalDonation: 0, asOfDate: ''});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const {token} = useSelector((state: RootState) => state.user);

    useEffect(() => {
        const fetchTotalDonation = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${API_URL}/api/donations/my-total`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token?.accessToken}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setItem(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };
        fetchTotalDonation();
    }, [token]);
    return {item, loading, error};
}

export function useUserBill() {
    const [items, setItems] = useState<UserBill[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const {token} = useSelector((state: RootState) => state.user);

    useEffect(() => {
        const fetchTotalDonation = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${API_URL}/api/donations/my`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token?.accessToken}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setItems(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };
        fetchTotalDonation();
    }, [token]);
    return {items, loading, error};
}
