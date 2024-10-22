import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userSlice from './slices/userSlice';
import plantSlice from './slices/plantSlice';
import serviceSlice from './slices/serviceSlice';
import {landSlice} from './slices/landSlice';

const rootPersistConfig = {
	key: 'root',
	storage,
	safelist: ['userSlice'], // Add slices which you want persisted
};

const rootReducer = combineReducers({
	userSlice: userSlice.reducer,
	plantSlice: plantSlice.reducer,
	serviceSlice: serviceSlice.reducer,
	landSlice: landSlice.reducer,
	//add more slices here
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
