import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userSlice from './slices/userSlice';
import plantSlice from './slices/plantSlice';
import serviceSlice from './slices/serviceSlice';
import materialSlice from './slices/materialSlice';
import landSlice from './slices/landSlice';
import requestSlice from './slices/requestSlice';
import processSlice from './slices/processSlice';
import transactionSlice from './slices/transactionSlice';
import notificationSlice from './slices/notificationSlice';
import dashboardSlice from './slices/dashboard';

const rootPersistConfig = {
	key: 'root',
	storage,
	whitelist: ['userSlice'], // Add slices which you want persisted
};

const rootReducer = combineReducers({
	userSlice: userSlice.reducer,
	plantSlice: plantSlice.reducer,
	serviceSlice: serviceSlice.reducer,
	landSlice: landSlice.reducer,
	requestSlice: requestSlice.reducer,
	materialSlice: materialSlice.reducer,
	processSlice: processSlice.reducer,
	transactionSlice: transactionSlice.reducer,
	notificationSlice: notificationSlice.reducer,
	dashboardSlice: dashboardSlice.reducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export const persistor = persistStore(store);

export * from './selectors'; // Export selectors
