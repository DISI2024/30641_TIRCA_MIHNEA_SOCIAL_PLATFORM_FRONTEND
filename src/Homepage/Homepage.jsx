import Stories from "../Stories/Stories";
import Posts from "../Posts/Posts";
const Homepage = () => {
    return (
        <div className="home">
            <Stories/>
            <Posts/>
        </div>
    )
}

export default Homepage