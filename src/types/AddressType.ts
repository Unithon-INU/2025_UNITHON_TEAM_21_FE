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
    gugunCd: string; // 구군 코드
    gugunNm: string; // 구군 이름
    sidoCd: string; // 시도 코드
    sidoNm: string; // 시도 이름
}
