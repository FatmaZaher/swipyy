import './App.scss';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Home from './pages/Home';
import signUp from './pages/auth/signUp';
import changePassword from './pages/auth/changePassword';
import Login from './pages/auth/login';
import AppLayoutRoute from './layouts/AppLayoutRoute';
import LoginLayoutRoute from './layouts/LoginLayoutRoute ';
import Links from "./pages/Links";
import Appearance from "./pages/appearance";
import Messages from "./pages/Messages";
import Analytic from "./pages/Analytic";


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" ><Redirect from="/" to="/links" /></Route>
        <LoginLayoutRoute path="/login" component={Login} />
        <LoginLayoutRoute path="/signUp" component={signUp} />
        <LoginLayoutRoute path="/changePassword" component={changePassword} />
        <Home path="/links" component={Links} />
        <Home path="/appearance" component={Appearance} />
        <Home path="/messages" component={Messages} />
        <Home path="/analytic" component={Analytic} />
      </Switch>
    </Router>
  );
}

export default App;
