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

export const landSlice = createSlice({
	name: 'landSlice',
	initialState: {
		land: {},
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
			});
	},
});

export const {setLand} = landSlice.actions;

export default landSlice.reducer;
