import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import CreatePool from './CreatePool';
import Leaderboard from './Leaderboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/create-pool" element={<CreatePool />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
}

export default App;
