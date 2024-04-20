import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import './Post.css';
const Post = ({post}) => {
    return(
        <div className="post">
            <div className="container">
                <div className="user">
                    <div className="userInfo">
                        <img src={post.profilePic} alt=""/>
                        <div className="details">
                            <span className="name">{post.name}</span>
                            <span className="date">1 min ago</span>
                        </div>
                    </div>
                    <MoreHorizOutlinedIcon></MoreHorizOutlinedIcon>
                </div>
                <div className="content">
                    <p>{post.desc}</p>
                    <img src={post.img} alt="" />

                </div>
                <div className="info"></div>


            </div>
        </div>
    );
}
export default Post