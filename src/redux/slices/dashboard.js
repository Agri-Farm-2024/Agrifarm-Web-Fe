import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from '../../services/api';

// Async action for creating a new service package
export const getDashboardByManager = createAsyncThunk(
	'dashboard/getDashboardByManager',
	async (_, {rejectWithValue}) => {
		try {
			const response = await api.get(`/dashboard`);
			console.log('Response', response);
			return response.data.metadata;
		} catch (error) {
			console.error(error);
			return rejectWithValue(error.response.data);
		}
	}
);

const dashboardSlice = createSlice({
	name: 'dashboardSlice',
	initialState: {
		dashboardManager: [],
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getDashboardByManager.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getDashboardByManager.fulfilled, (state, action) => {
				state.loading = false;
				state.dashboardManager = action.payload;
			})
			.addCase(getDashboardByManager.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || 'Service package creation failed';
			});
	},
});

export default dashboardSlice;
