import logo from './logo.svg';
import './App.css';
import Navbar from "./Navbar/Navbar";
import Homepage from "./Homepage/Homepage";
import Leftbar from "./Leftbar/Leftbar";
import Rightbar from "./Rightbar/Rightbar"

function App() {
  return (
    <div className="App">
        <Navbar></Navbar>
        <div style={{ display: "flex" }}>
            <Leftbar />
            <Homepage></Homepage>
            <Rightbar />
        </div>
    </div>
  );
}

export default App;
