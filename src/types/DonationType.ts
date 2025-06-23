export interface DonationInquiry {
    donationId: number;
    donorEmail: string;
    donorNickName: string;
    amount: number;
    status: 'PENDING' | 'CONFIRMED' | 'REJECTED';
    donatedAt: string;
}
export interface CenterTotalDonation {
    orgId: number;
    totalAmount: number;
}
export interface UserTotalDonation {
    email: string;
    totalDonation: number;
    asOfDate: string;
}

export interface UserBill {
    donationId: number;
    donorEmail: string;
    donorNickName: string;
    organization: string;
    amount: number;
    status: 'PENDING' | 'CONFIRMED' | 'REJECTED';
    donatedAt: string;
}
