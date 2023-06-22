import logo from './logo.svg';
import './App.css';
import NavBar from './Components/NavBar';
import Banner from './Components/Banner';
import TextForm from './Components/TextForm';


function App() {
  return (
    <>
      <NavBar title="SelfStudy.tr.ai"/>
      <Banner/>
      <div className="container my-3">
        <TextForm heading="What did you learn today?"/>
      </div>
      
    </>
  );
}

export default App;
