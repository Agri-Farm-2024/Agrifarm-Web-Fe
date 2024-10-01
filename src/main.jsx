import {createRoot} from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {Provider} from 'react-redux';
import {persistor, store} from './redux/store.js';
import {PersistGate} from 'redux-persist/integration/react';
import {ConfigProvider} from 'antd';

createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: '#7fb640',
				},
				components: {
					Button: {
						colorPrimary: '#7fb640',
					},
					Table: {
						rowHoverBg: '#f1f1f1',
					},
				},
			}}
		>
			<PersistGate persistor={persistor}>
				<App />
			</PersistGate>
		</ConfigProvider>
	</Provider>
);
