import './App.scss';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/auth/signUp';
import ChangePassword from './pages/auth/changePassword';
import Login from './pages/auth/login';
import LoginLayoutRoute from './layouts/LoginLayoutRoute ';
import Links from "./pages/Links";
import Appearance from "./pages/Appearance";
import Messages from "./pages/Messages";
import Analytic from "./pages/Analytic";
import Payments from "./pages/Payments";
import Settings from "./pages/Settings"
import ViewLayout from './layouts/ViewLayout';
import View from './pages/View';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" ><Redirect from="/" to="/links" /></Route>
        <LoginLayoutRoute path="/login" component={Login} />
        <LoginLayoutRoute path="/signUp" component={SignUp} />
        <LoginLayoutRoute path="/changePassword" component={ChangePassword} />
        <Home path="/links" component={Links} />
        <Home path="/appearance" component={Appearance} />
        <Home path="/messages" component={Messages} />
        <Home path="/analytic" component={Analytic} />
        <Home path="/payments" component={Payments} />
        <Home path="/settings" component={Settings} />
        <ViewLayout path="/view" component={View} />
      </Switch>
    </Router>
  );
}

export default App;
