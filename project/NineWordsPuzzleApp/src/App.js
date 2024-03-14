import './App.css';
import Signin from './components/Signin';
import Signup from './components/Signup';
import GameArea from './components/GameArea';
import LeaderBoard from './components/LeaderBoard';
import { Authentication } from './components/Authentication';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Authentication>
        <Routes>
        <Route exact path='/' element={<PrivateRoute />}>
          <Route exact path='/' element={<GameArea />}/>
          <Route exact path='/leaderboard' element={<LeaderBoard />}/>
        </Route>
        <Route path="/signin" element={<Signin />}/>
        <Route path="/signup" element={<Signup />}/>
        </Routes>
        </Authentication>
      </Router>
    </div>
  );
}

export default App;
