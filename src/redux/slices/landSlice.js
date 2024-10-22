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

export const getListOfRequestViewLand = createAsyncThunk(
	'landSlice/getListOfRequestViewLand',
	async ({page_size, page_index, status}, {rejectWithValue}) => {
		console.log({page_size, page_index, status});
		const urlAPI =
			status === 'all'
				? `/requests?&type=view_land&page_size=${page_size}&page_index=${page_index}`
				: `/requests?status=${status}&type=view_land&page_size=${page_size}&page_index=${page_index}`;
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

export const landSlice = createSlice({
	name: 'landSlice',
	initialState: {
		land: {},
		request: {},
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
			});
	},
});

export const {setLand} = landSlice.actions;

export default landSlice.reducer;
