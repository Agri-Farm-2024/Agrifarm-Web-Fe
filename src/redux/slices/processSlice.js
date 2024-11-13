import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from '../../services/api';

export const getStandardProcessList = createAsyncThunk(
	'processSlice/getStandardProcessList',
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

export const confirmProcess = createAsyncThunk(
	'processSlice/confirmProcess',
	async (formData, {rejectWithValue}) => {
		try {
			const data = await api.put(
				`/processes/updateProcessStandardStatus/${formData.processId}`,
				{reason_of_reject: formData.rejectReason}
			);
			return data.data;
		} catch (error) {
			console.log('error', error);
			return rejectWithValue(error.response.data);
		}
	}
);

export const updateStandardProcess = createAsyncThunk(
	'processSlice/updateStandardProcess',
	async (formData, {rejectWithValue}) => {
		try {
			const {name, stage, process_technical_standard_id} = formData;
			const data = await api.put(
				`/processes/updateProcessStandard/${process_technical_standard_id}`,
				{
					name,
					stage,
				}
			);
			return data.data;
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
			})
			.addCase(confirmProcess.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(confirmProcess.fulfilled, (state, action) => {
				state.loading = false;
			})
			.addCase(confirmProcess.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(updateStandardProcess.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(updateStandardProcess.fulfilled, (state, action) => {
				state.loading = false;
			})
			.addCase(updateStandardProcess.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export default processSlice;
