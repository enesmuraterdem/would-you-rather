import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Login from './Login';
import Home from './Home';
import CreatePool from './CreatePool';
import Leaderboard from './Leaderboard';

const App = () => {
  const authUser = useSelector(state => state.auth);
  
  return (
    <Router>
      {
          authUser === null
            ? <Routes>
                <Route path="*" element={ <Layout><Login /></Layout> } />
              </Routes>
            : <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/create-pool" element={<CreatePool />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
              </Routes>
      }
    </Router>
  );
}

export default App;
