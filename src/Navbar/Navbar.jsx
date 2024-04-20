import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import './Navbar.css';
const Navbar = () =>{
    return (
        <div className="navbar">
            <div className="left">
                <span>Connectify</span>
                <HomeOutlinedIcon></HomeOutlinedIcon>
                <DarkModeOutlinedIcon></DarkModeOutlinedIcon>
                <GridViewOutlinedIcon></GridViewOutlinedIcon>
                <div className="search">
                    <SearchOutlinedIcon></SearchOutlinedIcon>
                    <input type="text" placeholder="Search..."/>
                </div>
            </div>

            <div className="right">
                <PersonOutlineOutlinedIcon></PersonOutlineOutlinedIcon>
                <ChatOutlinedIcon></ChatOutlinedIcon>
                <NotificationsNoneOutlinedIcon></NotificationsNoneOutlinedIcon>
                <div className="user">
                    <img src="https://imgv3.fotor.com/images/blog-richtext-image/10-profile-picture-ideas-to-make-you-stand-out.jpg" alt = ""/>
                    <span>John Doe</span>

                </div>
            </div>
        </div>
    )
}

export default Navbar