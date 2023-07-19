import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Checkbox, Collapse, FormControlLabel, FormGroup } from "@mui/material";
import { FaHtml5 } from 'react-icons/fa'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import './user.css'
import Grid from '@mui/material/Grid';
import Item from '@mui/material/Grid';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const User = ({ toggleDrawer }) => {
  const [open, setOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [completedItems, setCompletedItems] = useState([]);

  const [value, setValue] = React.useState(0);

  const handleEventChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const icon = {
    color: "#c55c16",
    fontSize: '30px'
  }

  const Htmltopics = ['Htmlelemet', 'htmltag', 'iframetag', 'blockelemnt'];

  const handleChange = (index) => {
    setCheckedItems((prevCheckedItems) => {
      const updatedCheckedItems = [...prevCheckedItems];
      updatedCheckedItems[index] = !updatedCheckedItems[index];
      return updatedCheckedItems;
    });
    setCompletedItems((prevCompletedItems) => {
      if (checkedItems[index]) {
        return prevCompletedItems.filter((_, i) => i !== index);
      } else {
        return [...prevCompletedItems, Htmltopics[index]];
      }
    });

  };


  return (
    <Box sx={{ flexGrow: 1 }}>
    {/* <Grid c>ontainer spacing ={4}> */}
    
    <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography ><FaHtml5 style={icon} />HTML</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{paddingBottom:'90px'}}>
        <Grid item xs ={2} md={2}>
     <Item>
    <Box sx={{ borderRadius: "5px", boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', width:'250px', color: 'black',marginLeft: 1,paddingBottom: 0, marginBottom: -10 }} flex={3} >
      <List>
        <Box sx={{ boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', borderRadius: '5px', marginTop: -1 }}>
          <ListItem onClick={handleClick}>
         
            <ListItemText sx={{ marginLeft: 3 }} primary="BASIC" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
        </Box>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box sx={{ marginBottom: -1, boxShadow: 0 }}>
            <List component="div" disablePadding>
              <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={value} onChange={handleEventChange} aria-label="basic tabs example">
                    <Tab label="INPROGRESS" {...a11yProps(0)} />
                    <Tab label="COMPLETED" {...a11yProps(1)} />
                  </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                  <FormGroup>
                    {Htmltopics.map((item, index) => (
                      <FormControlLabel
                        key={index}
                        control={
                          <Checkbox
                            checked={checkedItems[index] || false}
                            onChange={() => handleChange(index)}
                          />
                        }
                        label={item}
                      />
                    ))}
                  </FormGroup>
                  {/* <button onClick={handleCompleted}>Mark Completed</button> */}
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                  {completedItems.length > 0 ? (
                   <FormGroup>
                      {
                        completedItems.map((item, index) => (
                            <FormControlLabel
                               key={index}
                               required control={<Checkbox defaultChecked />} label={item}/>
                        ))
                      }
                   </FormGroup>
                  ) : (
                    <p>No items completed yet.</p>
                  )}
                </CustomTabPanel>
              </Box>
            </List>
          </Box>
        </Collapse>
      </List>
    </Box>
    </Item>
   </Grid>
        </AccordionDetails>
      </Accordion>
     
   {/* <Grid item xs ={2} md={2}>
     <Item>
     <Box sx={{ boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', borderRadius: '5px' }}>
          <ListItem >
            <FaHtml5 style={icon} />
            <ListItemText sx={{ marginLeft: 3 }} primary="HTML" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
        </Box>
      </Item>
     </Grid>
     <Grid item xs ={2} md={2}>
     <Item>
     <Box sx={{ boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', borderRadius: '5px' }}>
          <ListItem >
            <FaHtml5 style={icon} />
            <ListItemText sx={{ marginLeft: 3 }} primary="HTML" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
        </Box>
      </Item>
     </Grid>
     <Grid item xs ={2} md={2}>
     <Item>
     <Box sx={{ boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', borderRadius: '5px' }}>
          <ListItem >
            <FaHtml5 style={icon} />
            <ListItemText sx={{ marginLeft: 3 }} primary="HTML" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
        </Box>
      </Item>
     </Grid> */}
    {/* // </Grid> */}
    </Box>

  )
}

export default User;