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

export const requestSlice = createSlice({
	name: 'requestSlice',
	initialState: {
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
			});
	},
});

export const {setRequest} = requestSlice.actions;

export default requestSlice.reducer;
