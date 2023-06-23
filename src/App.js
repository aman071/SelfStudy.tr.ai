import logo from './logo.svg';
import './App.css';
import NavBar from './Components/NavBar';
import Banner from './Components/Banner';
import TextForm from './Components/TextForm';
import { useState } from 'react';


function App() {
  const [mode, setMode] = useState('light');  //we want to handle entire page's darkmode, so we set a state in App.js

  const toggleMode = () => {
    if(mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor='black';
    }
    else {
      setMode('light');
      document.body.style.backgroundColor='white';
    }
  }

  return (
    <>
      <NavBar title="SelfStudy.tr.ai" mode={mode} toggleMode={toggleMode}/>
      <Banner/>
      <div className="container my-3">
        <TextForm heading="What did you learn today?"/>
      </div>
      
    </>
  );
}

export default App;
