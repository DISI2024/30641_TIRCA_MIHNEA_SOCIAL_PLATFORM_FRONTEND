import Leftbar from "../../../Leftbar/Leftbar";
import Homepage from "../../../Homepage/Homepage";
import Rightbar from "../../../Rightbar/Rightbar";
import Navbar from "../../../Navbar/Navbar";

const Home = () => {
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

export default Home