import './App.css';
import Home from './components/home';
import { Watermark } from 'antd';



export default function App() {
  return (
    <Watermark content="FoxTailConsulting">
    <div className="App">
      <Home/>
    </div>
    </Watermark>
  );
}

