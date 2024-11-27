import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {api} from '../../services/api';

export const fetchNotifications = createAsyncThunk(
	'notificationSlice/fetchNotifications',
	async ({pageSize = 100, pageIndex = 1}, {rejectWithValue}) => {
		try {
			const response = await api.get('/notifications', {
				params: {
					page_size: pageSize,
					page_index: pageIndex,
				},
			});

			const notifications = response.data.metadata.notifications;

			return {notifications};
		} catch (error) {
			console.error('Error fetching notifications:', error);
			return rejectWithValue(error.response ? error.response.data : error.message);
		}
	}
);

export const markToSeenNoti = createAsyncThunk(
	'notificationSlice/markToSeenNoti',
	async (_, {rejectWithValue}) => {
		try {
			const response = await api.patch(`/notifications/seen`);

			const data = response.data;

			return data;
		} catch (error) {
			console.error('Error fetching notifications:', error);
			return rejectWithValue(error.response ? error.response.data : error.message);
		}
	}
);

// Notification slice
const notificationSlice = createSlice({
	name: 'notificationSlice',
	initialState: {
		notifications: [],
		numberNoSeen: 0,
		loading: false,
		error: null,
	},
	reducers: {
		markNotificationAsSeen: (state, action) => {
			const notificationId = action.payload;
			const notification = state.notifications.find((n) => n.id === notificationId);
			if (notification && !notification.is_seen) {
				notification.is_seen = true;
				state.numberNoSeen -= 1;
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchNotifications.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchNotifications.fulfilled, (state, action) => {
				state.loading = false;
				state.notifications = action.payload.notifications;
			})
			.addCase(fetchNotifications.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || 'Failed to fetch notifications';
			})

			.addCase(markToSeenNoti.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(markToSeenNoti.fulfilled, (state, action) => {
				state.loading = false;
			})
			.addCase(markToSeenNoti.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || 'Failed to seen notifications';
			});
	},
});

export const {markNotificationAsSeen} = notificationSlice.actions;

export default notificationSlice;
