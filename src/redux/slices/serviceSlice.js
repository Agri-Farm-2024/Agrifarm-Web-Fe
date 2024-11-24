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

export const updateToUsedServiceSpecific = createAsyncThunk(
	'serviceSlice/updateToUsedServiceSpecific',
	async ({contract_image, service_specific_id}, {rejectWithValue}) => {
		try {
			const response = await api.patch(
				`/services/updateToUsedServiceSpecific/${service_specific_id}`,
				{
					contract_image,
				}
			);
			return response.data;
		} catch (error) {
			console.error(error);
			return rejectWithValue(error.response.data);
		}
	}
);

export const getServiceInUse = createAsyncThunk('serviceSlice/getServiceInUse', async (params) => {
	try {
		const response = await api.get('/services/getListServiceSpecific', {params});
		return response.data;
	} catch (error) {
		console.error(error);
	}
});

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

			.addCase(updateToUsedServiceSpecific.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateToUsedServiceSpecific.fulfilled, (state, action) => {
				state.loading = false;
			})
			.addCase(updateToUsedServiceSpecific.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || 'Service package update failed';
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
			})
			.addCase(getServiceInUse.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getServiceInUse.fulfilled, (state, action) => {
				state.loading = false;
				state.serviceInUse = action.payload.metadata;
			})
			.addCase(getServiceInUse.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || 'Service package getting failed';
			});
	},
});

export default serviceSlice;
