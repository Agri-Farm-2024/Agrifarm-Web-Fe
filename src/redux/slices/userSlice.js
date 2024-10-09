import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from '../../services/api';

// Fetch users
// export const fetchUsers = createAsyncThunk(
//     'users/fetchAll',
//     async ({ currentPage, pageSize, name }, { rejectWithValue }) => {
//       try {
//         let url = `/users?page_size=${pageSize}&page_number=${currentPage}`;
//         if (name) {
//           url += `&name=${name}`;
//         }
//         const response = await api.get(url);
//         return response.data.metadata;
//       } catch (error) {
//         return rejectWithValue(error.response.data);
//       }
//     }
//   );

export const userSlice = createSlice({
	name: 'userSlice',
	initialState: {
		user: {
			role: '',
		},
		loading: false,
		error: null,
	},
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder;
		// .addCase(fetchUsers.pending, (state) => {
		//   state.loading = true;
		// })
		// .addCase(fetchUsers.fulfilled, (state, action) => {
		//   state.loading = false;
		//   state.users = action.payload;
		// })
		// .addCase(fetchUsers.rejected, (state, action) => {
		//   state.loading = false;
		//   state.error = action.payload;
		// })
	},
});

export default userSlice;
