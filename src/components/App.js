import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginLayout from './LoginLayout';
import DefaultLayout from './DefaultLayout';
import Login from './Login';
import Home from './Home';
import CreatePool from './CreatePool';
import Leaderboard from './Leaderboard';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const App = () => {
  const authUser = useSelector(state => state.auth);
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Router>
        {
            authUser === null
              ? <Routes>
                  <Route path="*" element={ <LoginLayout><Login /></LoginLayout> } />
                </Routes>
              : <Routes>
                  <Route exact path="/" element={ <DefaultLayout><Home /></DefaultLayout>} />
                  <Route path="/create-pool" element={ <DefaultLayout><CreatePool /></DefaultLayout>} />
                  <Route path="/leaderboard" element={ <DefaultLayout><Leaderboard /></DefaultLayout>} />
                </Routes>
        }
      </Router>
    </ThemeProvider>
  );
}

export default App;
