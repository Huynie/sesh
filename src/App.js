import "./App.css"
import Layout from './component/Layout';
// import Home from './component/Home';
import Map from './component/Map';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';

export default function App() {
	return (
		<div className="App">
			<Layout>
				<Routes>
					{/* <Route path="/" element={<Home/>}/> */}
					<Route path="/" element={<Map/>}/>
				</Routes>
			</Layout>
		</div>
	)
};