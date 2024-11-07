import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from '../../services/api';

export const getStandardProcessList = createAsyncThunk(
	'processSlice/getMaterial',
	async (params, {rejectWithValue}) => {
		try {
			const data = await api.get(`/processes/getListProcessStandard`, {params});
			return data.data.metadata;
		} catch (error) {
			console.log('error', error);
			return rejectWithValue(error.response.data);
		}
	}
);

export const processSlice = createSlice({
	name: 'processSlice',
	initialState: {
		standardProcess: {},
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getStandardProcessList.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(getStandardProcessList.fulfilled, (state, action) => {
				state.loading = false;
				state.standardProcess = action.payload;
			})
			.addCase(getStandardProcessList.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export default processSlice;
