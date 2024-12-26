import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import down_arrow from "../../img/header/ic_arrow_down.png";

export default function BasicMenu() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate(); // React Router's navigation hook

    // Handles menu opening
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Handles menu closing
    const handleClose = () => {
        setAnchorEl(null);
    };

    // Handles logout and navigation to login page
    const handleLogout = () => {
        localStorage.removeItem('authToken');

        // Confirm token is removed before navigating
        if (!localStorage.getItem('authToken')) {
            console.log('Token successfully removed');
            navigate('/login', { replace: true });
        } else {
            console.error('Failed to remove token');
        }
    };

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <img className="down_arrow" src={down_arrow} alt="Dropdown Icon" />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>My Profile</MenuItem>
                <MenuItem onClick={handleClose}>My Purchases</MenuItem>
                <MenuItem
                    onClick={() => {
                        handleLogout();
                        handleClose();
                    }}
                >
                    Log Out
                </MenuItem>
            </Menu>
        </div>
    );
}
