import {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import {RootState} from '@/store/store';
import {DonationInquiry, CenterTotalDonation, UserTotalDonation, UserBill} from '@/types/DonationType';
import {API_URL} from '@env';

export function useInquiryDonation(id: number) {
    const [items, setItems] = useState<DonationInquiry[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState('');

    const fetchDonations = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/blockchain/donations?orgId=${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                setError('네트워크 오류가 발생했습니다.');
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setItems(data);
        } catch (e) {
            setError('목록 가져오기를 실패했습니다.');
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
    const [error, setError] = useState('');

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
                    setError('네트워크 오류가 발생했습니다.');
                    throw new Error('Network response was not ok');
                }
                const item = await response.json();
                console.log(`Fetching total donation for orgId ${id}:`, item);
                setTotal(item);
            } catch (e) {
                setError('목록 가져오기를 실패했습니다.');
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
            console.log(response);
            if (!response.ok) {
                throw new Error('요청 처리 중 오류가 발생했습니다.');
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
    const [error, setError] = useState('');
    const {token} = useSelector((state: RootState) => state.user);

    const fetchDonation = async (organizationId: number, amount: number) => {
        setLoading(true);
        try {
            if (!token) {
                setError('로그인이 필요합니다.');
                throw new Error('로그인이 필요합니다. 로그인 후 다시 시도해주세요.');
            }
            const response = await fetch(`${API_URL}/api/donations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token?.accessToken}`,
                },
                body: JSON.stringify({organizationId, amount}),
            });
            console.log(response);
            if (!response.ok) {
                setError('기부 처리 중 오류가 발생했습니다.');
                throw new Error('기부 처리 중 오류가 발생했습니다.');
            }
        } catch (err) {
            setError('기부 처리 중 오류가 발생했습니다.');
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
                if (!token) {
                    setError('로그인이 필요합니다.');
                    throw new Error('로그인이 필요합니다. 로그인 후 다시 시도해주세요.');
                }
                const response = await fetch(`${API_URL}/api/donations/my-total`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token?.accessToken}`,
                    },
                });
                if (!response.ok) {
                    setError('네트워크 오류가 발생했습니다.');
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setItem(data);
            } catch (e) {
                setError('목록 가져오기를 실패했습니다.');
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
                if (!token) {
                    setError('로그인이 필요합니다.');
                    throw new Error('로그인이 필요합니다. 로그인 후 다시 시도해주세요.');
                }
                const response = await fetch(`${API_URL}/api/donations/my`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token.accessToken}`,
                    },
                });
                if (!response.ok) {
                    setError('네트워크 오류가 발생했습니다.');
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setItems(data);
            } catch (e) {
                setError('목록 가져오기를 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };
        fetchTotalDonation();
    }, [token]);
    return {items, loading, error};
}
