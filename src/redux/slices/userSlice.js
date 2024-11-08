import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from '../../services/api';

export const handleLogin = createAsyncThunk(
	'userLoginSlice/handleLogin',
	async ({email, password}, {rejectWithValue}) => {
		try {
			const data = await api.post(`/auths/login?type=emailAndPassword`, {
				email: email,
				password: password,
			});
			return data.data;
		} catch (error) {
			console.error(error);
			return rejectWithValue(error.response.data);
		}
	}
);
export const getUserList = createAsyncThunk(
	'userLoginSlice/getUserList',
	async (params, {rejectWithValue}) => {
		try {
			const data = await api.get(`/users`, {params});

			return data.data.metadata;
		} catch (error) {
			console.error(error);
			return rejectWithValue(error.response.data);
		}
	}
);

export const getListOfStaff = createAsyncThunk(
	'userLoginSlice/getListOfStaff',
	async (_, {rejectWithValue}) => {
		try {
			const data = await api.get(`/users?role=2&page_size=20&page_index=1`);

			return data.data;
		} catch (error) {
			console.error(error);
			return rejectWithValue(error.response.data);
		}
	}
);

const userSlice = createSlice({
	name: 'userSlice',
	initialState: {
		user: {
			created_at: null,
			updated_at: null,
			user_id: null,
			email: '',
			password: '',
			full_name: '',
			dob: null,
			phone: null,
			avatar_url: '',
			status: '',
			role: 0,
		},
		userList: {},
		listOfStaff: [],
		loading: false,
		error: null,
	},
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(handleLogin.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(handleLogin.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload.metadata;
				localStorage.setItem('user', JSON.stringify(action.payload.metadata));
			})
			.addCase(handleLogin.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || 'Login failed';
			})

			.addCase(getListOfStaff.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getListOfStaff.fulfilled, (state, action) => {
				state.loading = false;
				state.listOfStaff = action.payload.metadata;
			})
			.addCase(getListOfStaff.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || 'Login failed';
			})
			.addCase(getUserList.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getUserList.fulfilled, (state, action) => {
				state.loading = false;
				state.userList = action.payload;
			})
			.addCase(getUserList.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || 'Login failed';
			});
	},
});

export default userSlice;
