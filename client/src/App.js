import './App.css';
import { BrowserRouter, Route, Switch, Routes } from 'react-router-dom'
import Home from './components/Home';
import LandingPage from './components/LandingPage'


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path='/' Component={LandingPage}/>
      <Route path='/home' Component={Home}/>
    </Routes>
    <div className="App">
    <h1>Henry Food</h1>
    </div>
    </BrowserRouter>
  );
}

export default App;
