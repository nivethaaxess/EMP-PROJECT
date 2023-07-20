import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Badge, Typography, useMediaQuery, useTheme, Box } from '@mui/material';
import Input from '@mui/material/Input';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { AccountCircle, Notifications } from '@mui/icons-material';
import NavBar from './NavBar';
import logo from './react.png';



const MenuBar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [notifications, setNotifications] = useState([]);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Function to handle profile icon click
    const handleProfileIconClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Function to handle profile menu close
    const handleProfileMenuClose = () => {
        setAnchorEl(null);
    };

    // Function to handle notification click
    const handleNotificationClick = () => {
        // Do something when notification bell icon is clicked
    };

    return (
        <Box sx={{ display: 'flex', marginLeft: 0 }}>
            <NavBar />

            {/* Main Content */}
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ height: 50 }}>
                    <Toolbar>
                        <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                            <img
                                src={logo}
                                alt="Company Logo"
                                style={{ height: '40px', width: 'auto' }}
                            />
                        </div>
                        <Typography variant="h8" component="div" sx={{ flexGrow: 1, margin: '0 10px', fontSize: '14px' }}>
                            All Programme
                        </Typography>
                        <Typography variant="h8" component="div" sx={{ flexGrow: 1, margin: '0 10px', fontSize: '14px' }}>
                            All Learner
                        </Typography>
                        <Typography variant="h8" component="div" sx={{ flexGrow: 1, margin: '0 10px', fontSize: '14px' }}>
                            Group
                        </Typography>
                        <Typography variant="h8" component="div" sx={{ flexGrow: 1, margin: '0 10px', fontSize: '14px' }}>
                            Filter
                        </Typography>

                        {!isMobile && (
                            <>
                                <IconButton color="inherit" onClick={handleNotificationClick}>
                                    <Badge badgeContent={notifications.length} color="error">
                                        <Notifications />
                                    </Badge>
                                </IconButton>
                                <IconButton color="inherit" onClick={handleProfileIconClick}>
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleProfileMenuClose}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                >
                                    <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
                                    <MenuItem onClick={handleProfileMenuClose}>Settings</MenuItem>
                                    <MenuItem onClick={handleProfileMenuClose}>Logout</MenuItem>
                                </Menu>
                            </>
                        )}
                    </Toolbar>
                </AppBar>
            </Box>
        </Box>
    );
};

export default MenuBar;