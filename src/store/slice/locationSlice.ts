import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import Geolocation from 'react-native-geolocation-service';

interface LocationState {
    location: {
        latitude: number;
        longitude: number;
    } | null;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: LocationState = {
    location: null,
    loading: 'idle',
    error: null,
};

export const fetchLocation = createAsyncThunk('location/fetchLocation', async (_, {rejectWithValue}) => {
    return new Promise<Geolocation.GeoPosition>((resolve, reject) => {
        Geolocation.getCurrentPosition(
            position => resolve(position),
            error => reject(rejectWithValue(error.message)),
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
    });
});

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchLocation.pending, state => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(fetchLocation.fulfilled, (state, action: PayloadAction<Geolocation.GeoPosition>) => {
                state.loading = 'succeeded';
                state.location = {
                    latitude: action.payload.coords.latitude,
                    longitude: action.payload.coords.longitude,
                };
            })
            .addCase(fetchLocation.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.payload as string;
            });
    },
});

export default locationSlice.reducer;
