import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from '../../services/api';

// Async action for creating a new service package
export const createServicePackage = createAsyncThunk(
	'serviceSlice/createServicePackage',
	async (formData, {rejectWithValue}) => {
		try {
			const response = await api.post('/services/createServicePackage', formData);
			return response.data;
		} catch (error) {
			console.error(error);
			return rejectWithValue(error.response.data);
		}
	}
);

export const getServicePackageList = createAsyncThunk(
	'serviceSlice/getServicePackageList',
	async () => {
		try {
			const response = await api.get('/services/getListServicePackages');
			return response.data.metadata;
		} catch (error) {
			console.error(error);
		}
	}
);

const serviceSlice = createSlice({
	name: 'serviceSlice',
	initialState: {
		service: [],
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(createServicePackage.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(createServicePackage.fulfilled, (state, action) => {
				state.loading = false;
			})
			.addCase(createServicePackage.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || 'Service package creation failed';
			})
			.addCase(getServicePackageList.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getServicePackageList.fulfilled, (state, action) => {
				state.loading = false;
				state.service = action.payload;
			})
			.addCase(getServicePackageList.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || 'Service package getting failed';
			});
	},
});

export default serviceSlice;
