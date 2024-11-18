import './App.css';
import {BrowserRouter, useNavigate} from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify';
import {AppRouters} from './routes/AppRouters';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	return (
		<BrowserRouter>
			<AppRouters />
			<ToastContainer limit={5} hideProgressBar />
		</BrowserRouter>
	);
}

export default App;
