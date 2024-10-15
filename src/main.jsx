import {createRoot} from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {Provider} from 'react-redux';
import {persistor, store} from './redux/store.js';
import {PersistGate} from 'redux-persist/integration/react';
import {ConfigProvider} from 'antd';
import locale from 'antd/locale/vi_VN';
import dayjs from 'dayjs';

import 'dayjs/locale/vi';

dayjs.locale('vi');

createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<ConfigProvider
			locale={locale}
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
					Tooltip: {
						colorBgSpotlight: 'rgba(0, 0, 0, 0.7)',
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
