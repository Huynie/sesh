import "./App.css"
import Layout from './component/Layout';
import Home from './component/Home';
import Map from './component/Map';
import Test from './component/Test';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';

export default function App() {
	return (
		<div className="App">
			<Layout>
				<Routes>
					<Route path="/" element={<Home/>}/>
					<Route path="/map" element={<Map/>}/>
					<Route path="/test" element={<Test/>}/>
				</Routes>
			</Layout>
		</div>
	)
};