import './App.css';
import {BrowserRouter} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import {AppRouters} from './routes/AppRouters';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	return (
		<BrowserRouter>
			<AppRouters />
			<ToastContainer limit={3} />
		</BrowserRouter>
	);
}

export default App;
