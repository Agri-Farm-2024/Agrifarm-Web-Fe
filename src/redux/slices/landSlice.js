import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from '../../services/api';

// Async action for creating a new land entry
export const createLand = createAsyncThunk(
	'landSlice/createLand',
	async (landInfor, {rejectWithValue}) => {
		try {
			const response = await api.post('/lands/createLand', landInfor);
			return response.data;
		} catch (error) {
			console.error(error);
			return rejectWithValue(error.response.data);
		}
	}
);

export const createLandType = createAsyncThunk(
	'landSlice/createLandType',
	async (formData, {rejectWithValue}) => {
		try {
			const response = await api.post('/lands/createLandType', {
				name: formData.landTypeName,
				description: formData.landTypeDescription,
			});
			return response.data;
		} catch (error) {
			console.error(error);
			return rejectWithValue(error.response.data);
		}
	}
);

export const updateLand = createAsyncThunk(
	'landSlice/updateLand',
	async (
		{
			name,
			title,
			description,
			acreage_land,
			price_booking_per_month,
			staff_id,
			land_id,
			url,
			url_deleted,
		},
		{rejectWithValue}
	) => {
		const landInfor = {
			name,
			title,
			description,
			acreage_land,
			price_booking_per_month,
			staff_id,
			url,
			url_deleted,
		};

		console.log(landInfor);

		try {
			const response = await api.put(`/lands/${land_id}`, landInfor);
			return response.data;
		} catch (error) {
			console.error(error);
			return rejectWithValue(error.response.data);
		}
	}
);

export const updateLandType = createAsyncThunk(
	'landSlice/updateLandType',
	async (formData, {rejectWithValue}) => {
		try {
			const response = await api.put(`/lands/updateLandType/${formData.landTypeId}`, {
				name: formData.landTypeName,
				description: formData.landTypeDescription,
			});
			return response.data;
		} catch (error) {
			console.error(error);
			return rejectWithValue(error.response.data);
		}
	}
);

export const getListOfLand = createAsyncThunk(
	'landSlice/getListOfLand',
	async ({page_size, page_index, status}, {rejectWithValue}) => {
		console.log({page_size, page_index, status});

		const urlAPI =
			status === 'all'
				? `/lands/getListByStaff?status=&page_size=${page_size}&page_index=${page_index}`
				: `/lands/getListByStaff?status=${status}&page_size=${page_size}&page_index=${page_index}`;
		try {
			const response = await api.get(urlAPI);
			console.log(response.data.metadata);
			return response.data;
		} catch (error) {
			console.error(error);
			return rejectWithValue(error.response.data);
		}
	}
);

export const getLandType = createAsyncThunk('landSlice/getLandType', async () => {
	try {
		const response = await api.get('/lands/landType');
		return response.data;
	} catch (error) {
		console.error(error);
		return rejectWithValue(error.response.data);
	}
});

export const getListOfRequestViewLand = createAsyncThunk(
	'landSlice/getListOfRequestViewLand',
	async ({page_size, page_index, status}, {rejectWithValue}) => {
		console.log({page_size, page_index, status});
		const urlAPI =
			status === 'all'
				? `/requests/getListRequest?&type=view_land&page_size=${page_size}&page_index=${page_index}`
				: `/requests/getListRequest?status=${status}&type=view_land&page_size=${page_size}&page_index=${page_index}`;
		try {
			const response = await api.get(urlAPI);
			console.log(response.data.metadata);
			return response.data;
		} catch (error) {
			console.error(error);
			return rejectWithValue(error.response.data);
		}
	}
);

export const getListOfBooking = createAsyncThunk(
	'landSlice/getListOfBooking',
	async ({page_size, page_index, status, type}, {rejectWithValue}) => {
		console.log({page_size, page_index, status, type});

		const urlAPI =
			status === 'all'
				? `/bookings?type=${type}&page_size=${page_size}&page_index=${page_index}`
				: `/bookings?type=${type}&status=${status}&page_size=${page_size}&page_index=${page_index}`;
		try {
			const response = await api.get(urlAPI);
			console.log(response.data.metadata);
			return response.data;
		} catch (error) {
			console.error(error);
			return rejectWithValue(error.response.data);
		}
	}
);

export const updateBooking = createAsyncThunk(
	'landSlice/updateBooking',
	async (
		{booking_id, is_schedule, contract_image, reason_for_reject, payment_frequency, status},
		{rejectWithValue}
	) => {
		console.log({
			booking_id,
			is_schedule,
			contract_image,
			reason_for_reject,
			payment_frequency,
			status,
		});
		try {
			const response = await api.put(`bookings/${booking_id}`, {
				is_schedule,
				contract_image,
				reason_for_reject,
				payment_frequency,
				status,
			});
			console.log(response.data.metadata);
			return response.data;
		} catch (error) {
			console.error(error);
			return rejectWithValue(error.response.data);
		}
	}
);

const landSlice = createSlice({
	name: 'landSlice',
	initialState: {
		land: {},
		lands: [],
		landType: [],
		listOfBooking: [],
		request: {},
		msg: '',
		loading: false,
		error: null,
	},
	reducers: {
		setLand: (state, action) => {
			state.land = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createLand.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(createLand.fulfilled, (state, action) => {
				state.loading = false;
				state.land = action.payload;
			})
			.addCase(createLand.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || 'Land creation failed';
			})
			.addCase(createLandType.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(createLandType.fulfilled, (state, action) => {
				state.loading = false;
			})
			.addCase(createLandType.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || 'Land type creation failed';
			})
			.addCase(updateLand.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateLand.fulfilled, (state, action) => {
				state.loading = false;
				state.msg = 'success';
			})
			.addCase(updateLand.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || 'Land updation failed';
			})

			.addCase(getListOfLand.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getListOfLand.fulfilled, (state, action) => {
				state.loading = false;
				state.lands = action.payload.metadata;
			})
			.addCase(getListOfLand.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || 'Land getListOfLand failed';
			})

			.addCase(getListOfRequestViewLand.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getListOfRequestViewLand.fulfilled, (state, action) => {
				state.loading = false;
				state.request = action.payload;
			})
			.addCase(getListOfRequestViewLand.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || 'Get request fail';
			})

			.addCase(getLandType.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getLandType.fulfilled, (state, action) => {
				state.loading = false;
				state.landType = action.payload.metadata;
			})
			.addCase(getLandType.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || 'Get landType fail';
			})

			.addCase(getListOfBooking.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getListOfBooking.fulfilled, (state, action) => {
				state.loading = false;
				state.listOfBooking = action.payload;
			})
			.addCase(getListOfBooking.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || 'Get listOfBooking fail';
			})
			.addCase(updateBooking.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateBooking.fulfilled, (state, action) => {
				state.loading = false;
				state.msg = action.payload;
			})
			.addCase(updateBooking.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || 'Get listOfBooking fail';
			})
			.addCase(updateLandType.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateLandType.fulfilled, (state, action) => {
				state.loading = false;
			})
			.addCase(updateLandType.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || 'Update land type fail';
			});
	},
});

export const {setLand} = landSlice.actions;

export default landSlice;
