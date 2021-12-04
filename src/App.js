import './App.scss';
import { BrowserRouter, Route } from 'react-router-dom';
import Sidebar from './component/Sidebar';
import Home from './pages/home';

function App() {
  return (
    <BrowserRouter>
      <Route render={props => (
        <>
          <Sidebar />
          <Home />
        </>
      )} />
    </BrowserRouter>
  );
}

export default App;
