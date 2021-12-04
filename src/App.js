import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Sidebar from './component/Sidebar';
import Home from './pages/home';
import login from './pages/auth/login';
import signUp from './pages/auth/signUp';
import changePassword from './pages/auth/changePassword';
import MobileSide from './component/MobileSide';
// import authLayout from './layouts/authLayout';

function App() {
  return (
    <BrowserRouter>
      <Route render={props => (
        <>

          <Switch>
            <Route path="/" exact>
              <Sidebar />
              <Home />
              <MobileSide />
            </Route>
            <Route path="/login" component={login} />
            <Route path="/signUp" component={signUp} />
            <Route path="/changePassword" component={changePassword} />
          </Switch>

        </>
      )} />
    </BrowserRouter>
  );
}

export default App;
