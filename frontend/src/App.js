import './App.css';

import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Read from './components/Read';
import Create from './components/Create';
import Update from './components/Update';
import Login from './components/Login';
import Signup from './components/Signup';
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<Read/>}/>
      <Route path='/create' element={<Create/>}/>
      <Route path='/update/:id' element={<Update/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/createuser' element={<Signup/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
