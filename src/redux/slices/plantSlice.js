import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from '../../services/api';

export const createPlant = createAsyncThunk(
	'plantSlice/createPlant',
	async (plantInfo, {rejectWithValue}) => {
		try {
			const response = await api.post('/plants/createPlant', plantInfo);
			return response.data;
		} catch (error) {
			console.error(error);
			return rejectWithValue(error.response.data);
		}
	}
);

export const createCrop = createAsyncThunk(
	'plantSlice/createCrop',
	async (seasonInfo, {rejectWithValue}) => {
		try {
			const response = await api.post('/plants/createPlantSeason', seasonInfo);
			return response.data;
		} catch (error) {
			console.error(error);
			return rejectWithValue(error.response.data);
		}
	}
);

export const removePlant = createAsyncThunk(
	'plantSlice/removePlant',
	async (plantId, {rejectWithValue}) => {
		try {
			const response = await api.delete(`/plants/${plantId}`);
			return response.data;
		} catch (error) {
			console.error(error);
			return rejectWithValue(error.response.data);
		}
	}
);

export const getPlantList = createAsyncThunk(
	'plantSlice/getPlantList',
	async (params, {rejectWithValue}) => {
		try {
			const response = await api.get('/plants', {params: params});
			return response.data.metadata;
		} catch (error) {
			console.error(error);
			return rejectWithValue(error.response.data);
		}
	}
);

const plantSlice = createSlice({
	name: 'plantSlice',
	initialState: {
		plant: {},
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(createPlant.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(createPlant.fulfilled, (state, action) => {
				state.loading = false;
			})
			.addCase(createPlant.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || 'Plant creation failed';
			})
			.addCase(createCrop.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(createCrop.fulfilled, (state, action) => {
				state.loading = false;
			})
			.addCase(createCrop.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || 'Season creation failed';
			})
			.addCase(getPlantList.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getPlantList.fulfilled, (state, action) => {
				state.loading = false;
				state.plant = action.payload;
			})
			.addCase(getPlantList.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || 'Plant creation failed';
			})
			.addCase(removePlant.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(removePlant.fulfilled, (state, action) => {
				state.loading = false;
			})
			.addCase(removePlant.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || 'Plant deleting failed';
			});
	},
});

export default plantSlice;
