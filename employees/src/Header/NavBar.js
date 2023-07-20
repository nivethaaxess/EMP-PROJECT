import { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { AccountCircle, Edit, Mail } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import logo from './business-management.png';

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: 60,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 60,
    background: 'linear-gradient(180deg, #0a192f 0%, #1a2a47 100%)',
    color: '#fff',
    overflow: 'hidden', // Hide the scrollbar
  },
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  marginTop: 50,
  marginLeft: 15,
  paddingRight: 24, // Use a numeric value instead of a string
  justifyContent: 'center',
  '& .MuiListItemIcon-root': {
    color: '#fff',
  },
}));

const NavBar = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleMouseEnter = (item) => {
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div
      onMouseEnter={handleDrawerOpen}
      onMouseLeave={handleDrawerClose}
    >
      <StyledDrawer variant="permanent" anchor="left" open={isDrawerOpen}>
        <List disablePadding>
          <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
            <img
              src={logo}
              alt="Company Logo"
              style={{ height: '40px', width: 'auto', marginLeft: '10px', marginTop: '10px' }}
            />
          </div>
          <StyledListItem
            button
            onMouseEnter={() => handleMouseEnter('Person')}
            onMouseLeave={handleMouseLeave}
          >
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary={hoveredItem === 'Person' ? 'Person' : ''} />
          </StyledListItem>
          <StyledListItem
            button
            onMouseEnter={() => handleMouseEnter('Pen')}
            onMouseLeave={handleMouseLeave}
          >
            <ListItemIcon>
              <Edit />
            </ListItemIcon>
            <ListItemText primary={hoveredItem === 'Pen' ? 'Pen' : ''} />
          </StyledListItem>
          <StyledListItem
            button
            onMouseEnter={() => handleMouseEnter('Message')}
            onMouseLeave={handleMouseLeave}
          >
            <ListItemIcon>
              <Mail />
            </ListItemIcon>
            <ListItemText primary={hoveredItem === 'Message' ? 'Message' : ''} />
          </StyledListItem>
        </List>
      </StyledDrawer>
    </div>
  );
};

export default NavBar;



