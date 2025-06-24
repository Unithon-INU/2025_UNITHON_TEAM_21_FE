import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import Geolocation, {GeoPosition} from 'react-native-geolocation-service';
import {REST_KAKAO_API_KEY} from '@env';

import {xml2Json} from '@/utils/xml2json';

export interface AddressCodeType {
    gugunCd: string;
    gugunNm: string;
    sidoCd: string;
    sidoNm: string;
}
interface LocationState {
    location: {
        latitude: number;
        longitude: number;
    } | null;
    address: AddressCodeType | null;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: LocationState = {
    location: null,
    address: null,
    loading: 'idle',
    error: null,
};

const getCurrentPosition = (): Promise<GeoPosition> => {
    return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
            position => resolve(position),
            error => reject(error),
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
    });
};

export const fetchLocation = createAsyncThunk('location/fetchLocation', async (_, {rejectWithValue}) => {
    try {
        const position = await getCurrentPosition();
        const {latitude, longitude} = position.coords;

        const response = await fetch(`https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${longitude}&y=${latitude}`, {
            headers: {
                Authorization: `KakaoAK ${REST_KAKAO_API_KEY}`,
            },
        });

        if (!response.ok) {
            throw new Error('주소 정보를 가져오는 데 실패했습니다.');
        }
        const data = await response.json();
        if (!data.documents || data.documents.length === 0) {
            throw new Error('해당 좌표에 대한 주소 정보가 없습니다.');
        }
        const gugunData = await fetch(
            `http://openapi.1365.go.kr/openapi/service/rest/CodeInquiryService/getAreaCodeInquiryList?schSido=${data.documents[0].region_1depth_name}&schGugun=${data.documents[0].region_2depth_name}`,
            {
                method: 'GET',
            },
        );
        const xmlData = await gugunData.text();
        const gugunCode = xml2Json(xmlData);
        if (!gugunCode.body || gugunCode.body.pageNo === 0) {
            throw new Error('해당 지역의 코드 정보를 가져오는 데 실패했습니다.');
        }
        return {
            location: {latitude, longitude},
            address: gugunCode.body.items.item,
        };
    } catch (error: any) {
        return rejectWithValue(error.message || '알 수 없는 오류가 발생했습니다.');
    }
});

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        clearLocation: state => {
            state.location = null;
            state.address = null;
            state.loading = 'idle';
            state.error = null;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchLocation.pending, state => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(fetchLocation.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.location = action.payload.location;
                state.address = action.payload.address;
            })
            .addCase(fetchLocation.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.payload as string;
            });
    },
});

export const {clearLocation} = locationSlice.actions;
export default locationSlice.reducer;
