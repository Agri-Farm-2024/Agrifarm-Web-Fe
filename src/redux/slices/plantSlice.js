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
			});
	},
});

export default plantSlice;
