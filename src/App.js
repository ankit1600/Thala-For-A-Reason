import './App.css';
import MainComponent from './components/MainComponent';
 import Img from '../src/img/4.jpeg';

function App() {
  return (
    <div className="App" style={{
       backgroundImage: `url(${Img})`
       }}>
       <MainComponent />
   
    </div>
  );
}

export default App;
