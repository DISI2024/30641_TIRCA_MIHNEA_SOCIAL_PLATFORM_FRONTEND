import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import '../styles/Navbar.css';
import {logout} from "../../../redux/slices/security/securitySlice";

const Navbar = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const goToHome = () => navigate('/home');
    const goToProfile = () => navigate('/profile'); 
    const goToChat = () => navigate('/chat');

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <div className="navbar">
            <div className="left">
                <span>Connectify</span>
                <HomeOutlinedIcon onClick={goToHome} style={{ cursor: 'pointer' }} />
                <GridViewOutlinedIcon />
                <div className="search">
                    <SearchOutlinedIcon />
                    <input type="text" placeholder="Search..." />
                </div>
            </div>

            <div className="right">
                <LogoutIcon onClick={handleLogout} style={{ cursor: 'pointer' }} />
                <ChatOutlinedIcon onClick={goToChat} style={{ cursor: 'pointer'}}/>
                <div className="user" onClick={goToProfile} style={{ cursor: 'pointer' }}>
                    <img src="https://imgv3.fotor.com/images/blog-richtext-image/10-profile-picture-ideas-to-make-you-stand-out.jpg" alt="User Profile"/>
                    <span>John Doe</span>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
