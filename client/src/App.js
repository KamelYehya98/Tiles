import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route} from "react-router-dom";
import { Routes } from 'react-router-dom';
import Home from './pages/Home';
import Scores from './pages/Scores';

function App() {

    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/scores' element={<Scores/>} />
            </Routes>
        </Router>
    );
}

export default App;
