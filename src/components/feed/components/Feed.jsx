import Stories from "./Stories";
import Posts from "./Posts";
import CreatePost from "./CreatePost";
const Feed = () => {
    return (
        <div className="home">
            <CreatePost/>
            <Posts/>
        </div>
    )
}

export default Feed