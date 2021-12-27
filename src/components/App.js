import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginLayout from './LoginLayout';
import DefaultLayout from './DefaultLayout';
import Login from './Login';
import Home from './Home';
import Question from './Question';
import NewPoll from './NewPoll';
import Leaderboard from './Leaderboard';
import NoMatch from './NoMatch';

const App = () => {
  const authUser = useSelector(state => state.auth);

  return (
      <Router>
        {
            !authUser
              ? <Routes>
                  <Route path="*" element={ <LoginLayout><Login /></LoginLayout> } />
                </Routes>
              : <Routes>
                  <Route exact path="/" element={ <DefaultLayout><Home /></DefaultLayout>} />
                  <Route path="/question">
                    <Route path=":question_id" element={<DefaultLayout><Question /></DefaultLayout>} />
                  </Route>
                  <Route path="/add" element={ <DefaultLayout><NewPoll /></DefaultLayout>} />
                  <Route path="/leaderboard" element={ <DefaultLayout><Leaderboard /></DefaultLayout>} />
                  <Route path="*" element={ <DefaultLayout><NoMatch /></DefaultLayout>} />
                </Routes>
        }
      </Router>
  );
}

export default App;
