import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from '../../services/api';

export const getMaterial = createAsyncThunk(
	'materialSlice/getMaterial',
	async (params, {rejectWithValue}) => {
		try {
			const data = await api.get(`/materials/getAllMaterial`, params);
			return data.data.metadata;
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
			});
	},
});

export default materialSlice;
