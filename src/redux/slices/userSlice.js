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
			user: {
				id: '9764b614-32a8-442f-9e38-3fd704d58f75',
				created_at: '2024-10-15T12:16:17.196Z',
				updated_at: '2024-10-15T12:16:17.196Z',
				email: 'manager@gmail.com',
				password: '$2a$08$9T3Pv/wpTl/vkyA5XZm08.tkFjt651tICxp.UA8gw/NgQQY7bFwfO',
				full_name: 'Manager',
				dob: '1990-01-01',
				avatar_url: 'http://example.com/avatar.jpg',
				status: 'pending',
				role: '',
			},
			token: {
				accessToken:
					'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk3NjRiNjE0LTMyYTgtNDQyZi05ZTM4LTNmZDcwNGQ1OGY3NSIsImVtYWlsIjoibWFuYWdlckBnbWFpbC5jb20iLCJmdWxsX25hbWUiOiJNYW5hZ2VyIiwicm9sZSI6MSwiaWF0IjoxNzI4OTk0NjM4LCJleHAiOjE3MjkwODEwMzh9.cEdhmrQ59q3JpAqLo8R3UjEwhkI6-a6BNF5X4WbXyeziawH6RVSu2lAAv6odrhH3FoLQc95nyTSFOi3KyHjTlKt38NR5PcShYj-cqLquckLYoZJgq1xZH2rjQEkKG0N2Rd4vEV1VBjbUns9AuNtGMvgqGmG12EIhaBLD104qTJkdrZ7i1bpy69ElMz0f3tna0vTONI7rWiscDAghxSlBiycwNnqN6kbM8IcZDov9ToOE0BQ_dOH4U2Ai_ESQmKMJAfB4p0Dx6HODmPMNBwA7dAJgGZRY-dq3tGrGLrodlN9hAn0dgmhqpj8uBwyHUt2C_hOiSuR05RWlLSzg0WRHzDiVR4E1swATt97Fv5wqjVRdzIVTR79gsMOlkzBBKONMU5HJo_46UZZ086CC4Mg20LXEAjWaL6V0Y9b3VzxFV8ZWk9xuQNQveWpTZSKLl_obvnEoqE3vQjUiAaKRS12K_gvdpL6ItWPC2M7gTUdIfyP33NzktqXi86P6axidot_RzoHltMX19GHZ5W0NIzjVAoOKN4gEBz2qeccrTLGnpAqsetXQKIJj4CDOa6wiR0Ihuxipms416V3p0nQgkSLBPyIG3Zh3RIvoO0QuPw1N81QVJ-GzOLv7otc4Qd8c0asBH0dVMoK0jWTita6EC0BK91z9OOhDQd3FCCtD94WN_a0',
				refreshToken:
					'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk3NjRiNjE0LTMyYTgtNDQyZi05ZTM4LTNmZDcwNGQ1OGY3NSIsImVtYWlsIjoibWFuYWdlckBnbWFpbC5jb20iLCJmdWxsX25hbWUiOiJNYW5hZ2VyIiwicm9sZSI6MSwiaWF0IjoxNzI4OTk0NjM4fQ.KwwR__XA3aGUtkkxQQRKaEEjRw0d9cYMOWwZDFLlXral1tbYKvDh_E0IwqBLkZbpoY8poZgrHLPDEvf16cIfDU4XRyugyXCUsil8h041fVcTe0OCqy4cjJ4NFtzNZvEPM0qBYU6HGnL1UQ8uMfM_LixdtkUwQ57vlWkhbqw-Mxz0LOlJJMjPr-kULnenQ9JwcsrnQBwpQcpAjSNYIzonfPlXJ2E93ZqJNJ1g5zbmjYGOsd4Px9vrpY_zk751lsIA_H-1v3biAp0gWifx72Yr_OfJXU6C0KYQjgw6Q6giZAXsRvgQ0OUgBbaf8aUh7szm60yOrtEAbEKbE9BHNv464fTwDxg_SosAHdvWcwdSj_74ML9r21D6h7pfh-0j_6NxY_TtXGdTVOE9AmtfpZMYioUcL3cDs26Y4cBJeqfgdgspMLkBrAzai2Jl88og8hWCrVFYNe7ueDzd6JhjeXb2iwfWaewaR1SXpcQjj1K6q8H3HfXIpAlRxjILQ8k6PIYNjjavwo8qPIqtXD3FyZqxhkuo_hzHIjW1EZKRvVYVuslwS4zHQZTjcT-6HDN8HillyI57u-F7VvlJueRC2U22Ha1ZOLgkb51zv6Kc4BKi_hxPFS5TZs68CIQeRvx174VUm4gFUWR6apSlcULLPagJadgh5br-hNBqY_Q50H6ONQI',
			},
		},
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
			});
	},
});

export default userSlice;
