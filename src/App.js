import logo from './logo.svg';
import './App.css';
import NavBar from './Components/NavBar';
import Banner from './Components/Banner';
import TextForm from './Components/TextForm';
import Alert from './Components/Alert';
import { useState } from 'react';


function App() {
  const [mode, setMode] = useState('light');  //we want to handle entire page's darkmode, so we set a state in App.js
  const [alert, setAlert] = useState(null);  //we want to handle entire page's darkmode, so we set a state in App.js

  const showAlert = (message, type) => {
    setAlert({
      message:message,
      type:type
    })

    setTimeout(() => {
      setAlert(null)
    }, 2000);
  }

  const toggleMode = () => {
    if(mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor='#495057';
      showAlert('Dark mode enabled.', 'success')
    }
    else {
      setMode('light');
      document.body.style.backgroundColor='white';
      showAlert('Dark mode disabled.', 'success')
    }
  }

  return (
    <>
      <NavBar title="SelfStudy.tr.ai" mode={mode} toggleMode={toggleMode}/>
      <Alert alert={alert} />
      <Banner/>
      <div className="container my-3">
        <TextForm heading="What did you learn today?" mode={mode} />
      </div>
      
    </>
  );
}

export default App;
