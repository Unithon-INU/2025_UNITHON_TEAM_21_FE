export interface KakaoAddressDocument {
    meta: {
        total_count: number;
    };
    documents: [
        {
            region_type: 'B' | 'H';
            code: string;
            address_name: string;
            region_1depth_name: string;
            region_2depth_name: string;
            region_3depth_name: string;
            region_4depth_name: string;
            x: number;
            y: number;
        },
    ];
}
export interface AddressCodeType {
    gugunCd: string;
    gugunNm: string;
    sidoCd: string;
    sidoNm: string;
}
