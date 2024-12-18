import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from '../../services/api';

// Async action for creating a new service package
export const getAllTransaction = createAsyncThunk(
	'transactions/getAllTransaction',
	async ({status, type, page_size, page_index}, {rejectWithValue}) => {
		try {
			const response = await api.get(`/transactions/getAllTransaction`, {
				params: {status, type, page_size, page_index},
			});
			console.log('Response', response);
			return response.data.metadata;
		} catch (error) {
			console.error(error);
			return rejectWithValue(error.response.data);
		}
	}
);

export const approveTransaction = createAsyncThunk(
	'transactions/approveTransaction',
	async ({transactionID}, {rejectWithValue}) => {
		console.log('approveTransaction: ' + transactionID);
		try {
			const response = await api.patch(`/transactions/confirm/${transactionID}`);
			return response.data;
		} catch (error) {
			console.error(error);
			return rejectWithValue(error.response.data);
		}
	}
);

const transactionSlice = createSlice({
	name: 'transactionSlice',
	initialState: {
		transactions: {},
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAllTransaction.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getAllTransaction.fulfilled, (state, action) => {
				state.loading = false;
				state.transactions = action.payload;
			})
			.addCase(getAllTransaction.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || 'Service package creation failed';
			})
			.addCase(approveTransaction.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(approveTransaction.fulfilled, (state, action) => {
				state.loading = false;
			})
			.addCase(approveTransaction.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || 'failed';
			});
	},
});

export default transactionSlice;
