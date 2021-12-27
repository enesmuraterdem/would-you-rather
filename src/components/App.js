import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginLayout from './LoginLayout';
import DefaultLayout from './DefaultLayout';
import Login from './Login';
import Home from './Home';
import Question from './Question';
import NewPoll from './NewPoll';
import Leaderboard from './Leaderboard';
import NoMatch from './NoMatch';

const RequiredAuth = ({ children }) => {
  const authUser = useSelector(state => state.auth);

  if(!authUser) {
    return (
      <LoginLayout>
        <Login />
      </LoginLayout>
    )
  }

  return children
}

const App = () => {
  return (
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <RequiredAuth>
                <DefaultLayout>
                  <Home />
                </DefaultLayout>
              </RequiredAuth>
            }
          />
          <Route path="/questions">
            <Route path="bad_id" element={ <NoMatch /> }/>
            <Route
              path=":question_id"
              element={
              <RequiredAuth>
                <DefaultLayout>
                  <Question />
                </DefaultLayout>
              </RequiredAuth>
            }
          />
          </Route>
          <Route
            path="/add"
            element={ 
              <RequiredAuth>
                <DefaultLayout>
                  <NewPoll />
                </DefaultLayout>
              </RequiredAuth>
            }
          />
          <Route
            path="/leaderboard"
            element={ 
              <RequiredAuth>
                <DefaultLayout>
                  <Leaderboard />
                </DefaultLayout>
              </RequiredAuth>
            }
          />
          <Route
            path="*"
            element={
              <NoMatch />
            }
          />
        </Routes>
      </Router>
  );
}

export default App;
