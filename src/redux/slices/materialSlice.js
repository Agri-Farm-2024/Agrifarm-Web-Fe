import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from '../../services/api';

export const getMaterial = createAsyncThunk(
	'materialSlice/getMaterial',
	async (params, {rejectWithValue}) => {
		try {
			const data = await api.get(`/materials/getAllMaterial`, {params});
			return data.data.metadata;
		} catch (error) {
			console.log('error', error);
			return rejectWithValue(error.response.data);
		}
	}
);

export const createMaterial = createAsyncThunk(
	'materialSlice/createMaterial',
	async (formData, {rejectWithValue}) => {
		try {
			const data = await api.post(`/materials/createMaterial`, formData);
			return data.data;
		} catch (error) {
			console.log('error', error);
			return rejectWithValue(error.response.data);
		}
	}
);

export const updateMaterial = createAsyncThunk(
	'materialSlice/updateMaterial',
	async (formData, {rejectWithValue}) => {
		try {
			const newFormData =
				formData.type === 'buy'
					? {
							name: formData.name,
							total_quantity: formData.total_quantity,
							description: formData.description,
							unit: formData.unit,
							price_per_piece: formData.price_per_piece,
							image_material: formData.image_material,
						}
					: {
							name: formData.name,
							total_quantity: formData.total_quantity,
							description: formData.description,
							unit: formData.unit,
							price_of_rent: formData.price_of_rent,
							deposit_per_piece: formData.deposit_per_piece,
							image_material: formData.image_material,
						};
			const data = await api.put(
				`/materials/updateMaterial/${formData.materialId}`,
				newFormData
			);
			return data.data;
		} catch (error) {
			console.log('error', error);
			return rejectWithValue(error.response.data);
		}
	}
);

export const materialSlice = createSlice({
	name: 'materialSlice',
	initialState: {
		material: {},
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getMaterial.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(getMaterial.fulfilled, (state, action) => {
				state.loading = false;
				state.material = action.payload;
			})
			.addCase(getMaterial.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(createMaterial.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(createMaterial.fulfilled, (state, action) => {
				state.loading = false;
			})
			.addCase(createMaterial.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(updateMaterial.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(updateMaterial.fulfilled, (state, action) => {
				state.loading = false;
			})
			.addCase(updateMaterial.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export default materialSlice;
