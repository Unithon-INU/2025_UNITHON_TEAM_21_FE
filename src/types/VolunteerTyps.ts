export interface getVltrCategoryListItem {
    gugunCd: number;
    nanmmbyNm: string;
    progrmBgnde: number;
    progrmEndde: number;
    progrmRegistNo: number;
    progrmSj: string;
    progrmSttusSe: number;
    sidoCd: number;
}
export interface getVltrCategoryList {
    body: {
        items: {
            item: getVltrCategoryListItem[];
        };
        numOfRows: number;
        pageNo: number;
        totalCount: number;
    };
    header: {
        resultCode: number;
        resultMsg: string;
    };
}

export interface getVltrSearchWordListItem {
    actBeginTm: number;
    actEndTm: number;
    actPlace: string;
    adultPosblAt: string;
    gugunCd: number;
    nanmmbyNm: string;
    noticeBgnde: number;
    noticeEndde: number;
    progrmBgnde: number;
    progrmEndde: number;
    progrmRegistNo: number;
    progrmSj: string;
    progrmSttusSe: number;
    sidoCd: number;
    srvcClCode: string;
    url: string;
    yngbgsPosblAt: string;
}
export interface getVltrSearchWordList {
    body: {
        items: {
            item: getVltrSearchWordListItem[];
        };
        numOfRows: number;
        pageNo: number;
        totalCount: number;
    };
    header: {
        resultCode: number;
        resultMsg: string;
    };
}

export interface getVltrPartcptnItemListItem {
    actBeginTm: number;
    actEndTm: number;
    actPlace: string;
    actWkdy: string; // 주간 활동 가능일 (예: '1111111'은 매일 가능)
    adultPosblAt: 'Y' | 'N';
    appTotal: number;
    areaAddress1: string;
    areaAddress2: string;
    areaAddress3: string;
    areaLalo1: string; // 위경도 좌표 (예: "36.56092716643554,128.7265489323239")
    areaLalo2: string;
    areaLalo3: string;
    email: string;
    familyPosblAt: 'Y' | 'N';
    fxnum: string; // 팩스번호
    grpPosblAt: 'Y' | 'N';
    gugunCd: string; // 구군 코드
    mnnstNm: string; // 기관명
    nanmmbyNm: string; // 단체명
    nanmmbyNmAdmn: string; // 단체 관리자명
    noticeBgnde: string; // 공지 시작일 (YYYYMMDD)
    noticeEndde: string; // 공지 종료일 (YYYYMMDD)
    pbsvntPosblAt: 'Y' | 'N';
    postAdres: string; // 우편주소
    progrmBgnde: string; // 프로그램 시작일
    progrmCn: string; // 프로그램 내용 (개행 문자 포함)
    progrmEndde: string; // 프로그램 종료일
    progrmRegistNo: number;
    progrmSj: string; // 프로그램 제목
    progrmSttusSe: 1 | 2 | 3; // 1:모집대기, 2:모집중, 3:모집완료
    rcritNmpr: number; // 모집인원
    sidoCd: string; // 시도 코드
    srvcClCode: string; // 서비스 분류 코드 (예: '재난ㆍ재해')
    telno: string;
    yngbgsPosblAt: 'Y' | 'N';
}
export interface getVltrPartcptnItemList {
    body: {
        items: {
            item: getVltrPartcptnItemListItem;
        };
        numOfRows: number;
        pageNo: number;
        totalCount: number;
    };
    header: {
        resultCode: number;
        resultMsg: string;
    };
}
