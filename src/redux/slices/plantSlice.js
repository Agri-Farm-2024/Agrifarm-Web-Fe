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

export const deletePlant = createAsyncThunk(
	'plantSlice/deletePlant',
	async (plantInfo, {rejectWithValue}) => {
		try {
			const response = await api.delete(`/plants/deletePlant/${plantInfo.plantId}`);
			return response.data;
		} catch (error) {
			console.error(error);
			return rejectWithValue(error.response.data);
		}
	}
);

export const deletePlantSeason = createAsyncThunk(
	'plantSlice/deletePlantSeason',
	async (plantInfo, {rejectWithValue}) => {
		try {
			const response = await api.delete(
				`/plants/deletePlantSeason/${plantInfo.plantSeasonId}`
			);
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

export const updatePlant = createAsyncThunk(
	'plantSlice/updatePlant',
	async (formData, {rejectWithValue}) => {
		try {
			const response = await api.patch(`/plants/updateplant/${formData.plantId}`, {
				land_type_id: formData.land_type_id,
				name: formData.name,
				status: 'active',
			});
			return response.data;
		} catch (error) {
			console.error(error);
			return rejectWithValue(error.response.data);
		}
	}
);

export const updatePlantSeason = createAsyncThunk(
	'plantSlice/updatePlantSeason',
	async (formData, {rejectWithValue}) => {
		try {
			const updateData = {
				month_start: formData.month_start,
				total_month: formData.total_month,
				price_process: formData.price_process,
				price_purchase_per_kg: formData.price_purchase_per_kg,
				type: formData.type,
				plant_id: formData.plant_id,
			};
			const response = await api.put(
				`/plants/updatePlantSeason/${formData.plant_season_id}`,
				updateData
			);
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

export const getPlantSeasonList = createAsyncThunk(
	'plantSlice/getPlantSeasonList',
	async (params, {rejectWithValue}) => {
		try {
			const response = await api.get('/plants/plantSeasons', {params: params});
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
		plantSeason: {},
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
			.addCase(deletePlant.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deletePlant.fulfilled, (state, action) => {
				state.loading = false;
			})
			.addCase(deletePlant.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || 'Plant delete failed';
			})
			.addCase(deletePlantSeason.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deletePlantSeason.fulfilled, (state, action) => {
				state.loading = false;
			})
			.addCase(deletePlantSeason.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || 'Plant delete failed';
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
				state.error = action.payload;
			})
			.addCase(updatePlant.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updatePlant.fulfilled, (state, action) => {
				state.loading = false;
			})
			.addCase(updatePlant.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(getPlantSeasonList.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getPlantSeasonList.fulfilled, (state, action) => {
				state.loading = false;
				state.plantSeason = action.payload;
			})
			.addCase(getPlantSeasonList.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(updatePlantSeason.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updatePlantSeason.fulfilled, (state, action) => {
				state.loading = false;
			})
			.addCase(updatePlantSeason.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export default plantSlice;
