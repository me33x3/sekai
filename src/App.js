import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route } from 'react-router-dom'
import { Limited, Future } from './pages';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/limited' element={ <Limited /> } />
        <Route path='/future' element={ <Future /> } />
      </Routes>
    </div>
  );
}

export default App;
