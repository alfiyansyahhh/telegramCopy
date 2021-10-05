import { BrowserRouter } from 'react-router-dom'
import Router from '../src/router/Router';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
