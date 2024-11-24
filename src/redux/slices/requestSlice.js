import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from '../../services/api';

// Async action to fetch request details by ID
export const getRequestById = createAsyncThunk(
	'requestSlice/getRequestById',
	async (requestId, {rejectWithValue}) => {
		try {
			const response = await api.get(`/requests/${requestId}`);
			return response.data;
		} catch (error) {
			console.error(error);
			return rejectWithValue(error.response.data);
		}
	}
);

export const getListRequest = createAsyncThunk(
	'requestSlice/getListRequest',
	async (params, {rejectWithValue}) => {
		try {
			const response = await api.get(`/requests/getListRequest`, {params});
			return response.data;
		} catch (error) {
			console.error(error);
			return rejectWithValue(error.response.data);
		}
	}
);

export const approveRequest = createAsyncThunk(
	'requestSlice/approveRequest',
	async (params, {rejectWithValue}) => {
		try {
			const {requestId, formData} = params;
			const response = await api.patch(`/requests/confirmRequest/${requestId}`, formData);
			return response.data;
		} catch (error) {
			console.error(error);
			return rejectWithValue(error.response.data);
		}
	}
);

export const assignForTask = createAsyncThunk(
	'requestSlice/assignForTask',
	async ({taskID, staffID}, {rejectWithValue}) => {
		try {
			const response = await api.put(`tasks/assign/${taskID}`, {
				assigned_to_id: staffID,
			});

			return response.data;
		} catch (error) {
			console.error(error);
			return rejectWithValue(error.response.data);
		}
	}
);

export const createStandardProcessRequest = createAsyncThunk(
	'requestSlice/createStandardProcessRequest',
	async (formData, {rejectWithValue}) => {
		try {
			const data = await api.post(`/requests/createRequestProcessStandard`, formData);
			return data.data;
		} catch (error) {
			console.log('error', error);
			return rejectWithValue(error.response.data);
		}
	}
);

const requestSlice = createSlice({
	name: 'requestSlice',
	initialState: {
		requestList: {},
		requestDetails: {},
		result: true,
		loading: false,
		error: null,
	},
	reducers: {
		// Optional reducer to manually set request data
		setRequest: (state, action) => {
			state.requestDetails = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getRequestById.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getRequestById.fulfilled, (state, action) => {
				state.loading = false;
				state.requestDetails = action.payload;
			})
			.addCase(getRequestById.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || 'Failed to fetch request details';
			})
			.addCase(getListRequest.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getListRequest.fulfilled, (state, action) => {
				state.loading = false;
				state.requestList = action.payload.metadata;
			})
			.addCase(getListRequest.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || 'Failed to fetch request details';
			})

			.addCase(assignForTask.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(assignForTask.fulfilled, (state, action) => {
				state.loading = false;
				state.result = action.payload;
			})
			.addCase(assignForTask.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || 'Failed to assign';
			})
			.addCase(createStandardProcessRequest.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(createStandardProcessRequest.fulfilled, (state, action) => {
				state.loading = false;
			})
			.addCase(createStandardProcessRequest.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || 'Failed to create standard process request';
			})
			.addCase(approveRequest.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(approveRequest.fulfilled, (state, action) => {
				state.loading = false;
			})
			.addCase(approveRequest.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export const {setRequest} = requestSlice.actions;

export default requestSlice;
