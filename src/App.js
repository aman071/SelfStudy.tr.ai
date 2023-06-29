// import logo from './logo.svg';
import './App.css';
import NavBar from './Components/NavBar';
import Banner from './Components/Banner';
import TextForm from './Components/TextForm';
import Alert from './Components/Alert';
import About from './Components/About';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes, Route
} from "react-router-dom";
import TextEditor from './Components/TextEditor';


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

  /*
  Everything related to router will be nested under BrowserRouter (imported here as Router)
  In latest react-router-dom v6, Switch has been replaced by Routes
  Every route you want, must be as a nested component inside Routes.
  Whatever components you want to render on a path, must be enclosed in element tag and not outside it. (v6 standard)
  */
  return (
    <>
    <Router>
      <Routes>
        {/* writing 'exact' keyword is good practice because by default React does partial matching of routes, not complete
        For example, if we have 2 paths
        /users        --> Where we render component 1
        /users/home   --> Where we render component 2
        If we don't write exact then React will match both routes(in case we dont write the second route correctly) 
        to /users and render component 1 only.
        */}
        <Route exact path="/" element={
          <>
            <NavBar title="SelfStudy.tr.ai" mode={mode} toggleMode={toggleMode}/>
            <Alert alert={alert} />
            <Banner/>
            <div className="container my-3">
              {/* <TextForm heading="What did you learn today?" mode={mode} /> */}
              <TextEditor/>
            </div>
          </>
        } />
        
        <Route exact path="/about" element={
        <About />
        } />
          
        {/* <Route path="/users" element={<About />} />
          <Route path="/" element={<About />} /> */}
      </Routes>
    </Router>  
    </>
  );
}

export default App;
