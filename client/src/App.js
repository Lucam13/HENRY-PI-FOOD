import './App.css';
import { BrowserRouter, Route, Switch, Routes } from 'react-router-dom'
import Home from './components/Home/Home';
import LandingPage from './components/LandingPage/LandingPage'
import RecipeCreate from './components/RecipeCreate/RecipeCreate'
import Detail from './components/Detail/Detail';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path='/' Component={LandingPage}/>
      <Route path='/home' Component={Home}/>
      <Route path='/recipes' Component={RecipeCreate}/>
      <Route path='/recipes/:recipeID' Component={Detail} />
    </Routes>
    
    </BrowserRouter>
  );
}

export default App;
