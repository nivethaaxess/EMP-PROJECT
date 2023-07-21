import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Checkbox, Collapse, FormControlLabel, FormGroup } from "@mui/material";
import { FaHtml5 } from "react-icons/fa";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import "./user.css";
import Grid from "@mui/material/Grid";
import Item from "@mui/material/Grid";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { padding } from "@mui/system";




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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}



const User = ({}) => {
  const [open, setOpen] = useState(Array(5).fill(false));
  const [Htmltopics, setHtmltopics] = useState([
    { topic: "Htmlelement", status: false },
    { topic: "inline", status: false },
    { topic: "block", status: false },
    { topic: "Htmlelement", status: false },
    { topic: "inline", status: false },
    { topic: "block", status: false },
  ]);

  const [value, setValue] = React.useState(0);


  const handleEventChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = (index) => {
    setOpen((prevOpenStates) => {
      const newOpenStates = [...prevOpenStates];
      newOpenStates[index] = !newOpenStates[index];
      return newOpenStates;
    });
  };

  const icon = {
    color: "#c55c16",
    fontSize: "30px",
  };

  const handleChange = (index) => {
    setHtmltopics((prevCheckedItems) => {
      console.log(prevCheckedItems, "prevCheckedItems");
      const updatedCheckedItems = [...prevCheckedItems];
       console.log(updatedCheckedItems, "updatedCheckedItems2");
      updatedCheckedItems[index].status = !updatedCheckedItems[index].status;
      console.log(updatedCheckedItems, "updatedCheckedItems");
      return updatedCheckedItems;
    });
  };

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          width: "90%",
          margin: "0 auto",
          backgroundColor: "#eaf1fb",
        }}
      >
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography style={{ display: "flex", alignItems: "center" }}>
              <FaHtml5 style={icon} className="FaHtml5" />
              <span>HTML</span>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid
              container
              direction="row"
              justifyContent="space-around"
            //   spacing={5}
            >
              <Grid item xs={2} md={2}>
                <Item>
                  <Box
                    sx={{
                      boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.5)",
                      borderRadius: "4px",
                    }}
                  //   flex={3}
                  >
                    <List>
                      <Box
                        sx={{
                          //   boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                          borderRadius: "5px",
                          marginTop: -1,
                          padding: 0,
                          marginBottom: "5px",
                          borderBottom: "0.5px solid lightgray",
                        }}
                      >
                        <ListItem onClick={() => handleClick(0)} sx={{ padding: 0, display: 'flex', alignItems: 'center' }}>
                          <ListItemText sx={{ marginLeft: 1, marginRight:7 ,backgroundColor:'lightskyblue',borderRadius:'5px' }}> 
                            <Typography sx={{paddingLeft:1}}>Basic</Typography>
                          </ListItemText>
                          <Typography sx={{ marginLeft: 'auto' ,backgroundColor:"rgba(0,0,0,0.12)",padding:"0 4px",borderRadius:"5px"}}>
                             {Htmltopics.filter(a=>a.status).length} / {Htmltopics.length} 
                          </Typography>
                          {open[0] ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>

                      </Box>
                      <Collapse
                        in={open[0]}
                        timeout="auto"
                        unmountOnExit
                        sx={{ backgroundColor: "#f7f9fb" }}
                      >
                        <Box sx={{ marginBottom: -1, boxShadow: 0 }}>
                          <List component="div" disablePadding>
                            <Box sx={{ width: "100%" }}>
                              <Box
                                sx={{ borderBottom: 1, borderColor: "divider" }}
                              >
                                <Tabs
                                  value={value}
                                  onChange={handleEventChange}
                                  aria-label="basic tabs example"
                                >
                                  <Tab
                                    label="INPROGRESS"
                                    {...a11yProps(0)}
                                    sx={{ padding: "2px", fontSize: "10px" }}
                                  />
                                  <Tab
                                    label="COMPLETED"
                                    {...a11yProps(1)}
                                    sx={{ padding: "2px", fontSize: "10px" }}
                                  />
                                </Tabs>
                              </Box>
                             
                              <CustomTabPanel  value={value} index={0}>
                                <Box sx={{
                                     maxHeight: '150px', // Optional: Set a specific height for the container
                                     overflowY: 'auto',
                                  
                                }}>
                                <FormGroup sx={{}}>
                                 
  
                                  {Htmltopics.map((item, index) => {
                                    return (
                                      item.status === false &&  (
                                        <FormControlLabel sx={{}}
                                          key={index}
                                          control={
                                            <Checkbox color="secondary" size="small"
                                            icon={<RadioButtonUncheckedIcon />}
                                            checkedIcon={<CheckCircleIcon />}
                                              checked={item.status}
                                              onChange={() =>
                                                handleChange(index)
                                              }
                                      
                                            />
                                          }
                                          label={item.topic}
                                        />
                                      )
                                    );
                                  })}
                                 
                                </FormGroup>
                                </Box>
                              </CustomTabPanel>
                            

                              <CustomTabPanel value={value} index={1}>
                                <Box sx={{
                                     maxHeight: '150px', // Optional: Set a specific height for the container
                                     overflowY: 'auto'}} >
                                {/* {completedItems.length > 0 ? ( */}
                                 
                                <FormGroup>
                                  {Htmltopics.map((item, index) => {
                                     
                                    return (
                                      item.status === true && (
                                        <FormControlLabel
                                          key={index}
                                          control={
                                            <Checkbox  color="secondary" size="small"
                                            icon={<RadioButtonUncheckedIcon />}
                                            checkedIcon={<CheckCircleIcon />}
                                              defaultChecked={item.status}
                                              onChange={() =>
                                                handleChange(index)
                                              }
                                             
                                            />
                                          }
                                          label={item.topic}
                                        />
                                      

                                        
                                      )
                                     
                                    );
                            
                                  })}
                                </FormGroup>
                                </Box>

                                
                              </CustomTabPanel>
                            </Box>
                          </List>
                        </Box>
                      </Collapse>
                    </List>
                  </Box>
                </Item>
              </Grid>
              <Grid item xs={2}>
                <Item>
                  <Box

                  //   flex={3}
                  >
                    <List>
                      <Box
                        sx={{
                          boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                          borderRadius: "5px",
                          marginTop: -1,
                          padding: 0,
                          marginBottom: "5px",
                        }}
                      >
                        <ListItem
                          onClick={() => handleClick(1)}
                          sx={{ padding: 0 }}
                        >
                          <ListItemText sx={{marginLeft: 1, marginRight:6 ,backgroundColor:'lightskyblue',borderRadius:'5px' }}>
                          <Typography sx={{paddingLeft:1}}>Intermediate</Typography>
                          </ListItemText>
                          {open[1] ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                      </Box>
                      <Collapse
                        in={open[1]}
                        timeout="auto"
                        unmountOnExit
                        sx={{ backgroundColor: "#f7f9fb" }}
                      >
                        <Box sx={{ marginBottom: -1, boxShadow: 0 }}>
                          <List component="div" disablePadding>
                            <Box sx={{ width: "100%" }}>
                              <Box
                                sx={{ borderBottom: 1, borderColor: "divider" }}
                              >
                                <Tabs
                                  value={value}
                                  onChange={handleEventChange}
                                  aria-label="basic tabs example"
                                >
                                  <Tab
                                    label="INPROGRESS"
                                    {...a11yProps(0)}
                                    sx={{ padding: "2px", fontSize: "10px" }}
                                  />
                                  <Tab
                                    label="COMPLETED"
                                    {...a11yProps(1)}
                                    sx={{ padding: "2px", fontSize: "10px" }}
                                  />
                                </Tabs>
                              </Box>
                              <CustomTabPanel value={value} index={0}>
                                {/* <FormGroup>
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
                                      sx={{ padding: "2px", fontSize: "8px" }}
                                    />
                                  ))}
                                </FormGroup> */}
                                {/* <button onClick={handleCompleted}>Mark Completed</button> */}
                              </CustomTabPanel>
                              <CustomTabPanel value={value} index={1}>
                                {/* {completedItems.length > 0 ? (
                                  <FormGroup>
                                    {completedItems.map((item, index) => (
                                      <FormControlLabel
                                        key={index}
                                        required
                                        control={<Checkbox defaultChecked />}
                                        label={item}
                                      />
                                    ))}
                                  </FormGroup>
                                ) : (
                                  <p>No items completed yet.</p>
                                )} */}
                              </CustomTabPanel>
                            </Box>
                          </List>
                        </Box>
                      </Collapse>
                    </List>
                  </Box>
                </Item>
              </Grid>
              <Grid item xs={2}>
                <Item>
                  <Box

                  //   flex={3}
                  >
                    <List>
                      <Box
                        sx={{
                          boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                          borderRadius: "5px",
                          marginTop: -1,
                          padding: 0,
                          marginBottom: "5px",
                        }}
                      >
                        <ListItem
                          onClick={() => handleClick(2)}
                          sx={{ padding: 0 }}
                        >
                          <ListItemText sx={{marginLeft: 1, marginRight:7 ,backgroundColor:'lightskyblue',borderRadius:'5px' }}>
                          <Typography sx={{paddingLeft:2}}>Advanced</Typography>
                          </ListItemText>
                          {open[2] ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                      </Box>
                      <Collapse
                        in={open[2]}
                        timeout="auto"
                        unmountOnExit
                        sx={{ backgroundColor: "#f7f9fb" }}
                      >
                        <Box sx={{ marginBottom: -1, boxShadow: 0 }}>
                          <List component="div" disablePadding>
                            <Box sx={{ width: "100%" }}>
                              <Box
                                sx={{ borderBottom: 1, borderColor: "divider" }}
                              >
                                <Tabs
                                  value={value}
                                  onChange={handleEventChange}
                                  aria-label="basic tabs example"
                                >
                                  <Tab
                                    label="INPROGRESS"
                                    {...a11yProps(0)}
                                    sx={{ padding: "2px", fontSize: "10px" }}
                                  />
                                  <Tab
                                    label="COMPLETED"
                                    {...a11yProps(1)}
                                    sx={{ padding: "2px", fontSize: "10px" }}
                                  />
                                </Tabs>
                              </Box>
                              <CustomTabPanel value={value} index={0}>
                                {/* <FormGroup>
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
                                      sx={{ padding: "2px", fontSize: "8px" }}
                                    />
                                  ))}
                                </FormGroup> */}
                                {/* <button onClick={handleCompleted}>Mark Completed</button> */}
                              </CustomTabPanel>
                              <CustomTabPanel value={value} index={1}>
                                {/* {completedItems.length > 0 ? (
                                  <FormGroup>
                                    {completedItems.map((item, index) => (
                                      <FormControlLabel
                                        key={index}
                                        required
                                        control={<Checkbox defaultChecked />}
                                        label={item}
                                      />
                                    ))}
                                  </FormGroup>
                                ) : (
                                  <p>No items completed yet.</p>
                                )} */}
                              </CustomTabPanel>
                            </Box>
                          </List>
                        </Box>
                      </Collapse>
                    </List>
                  </Box>
                </Item>
              </Grid>

              <Grid item xs={2}>
                <Item>
                  <Box>
                    <List>
                      <Box
                        sx={{
                          boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                          borderRadius: "5px",
                          marginTop: -1,
                          padding: 0,
                          marginBottom: "5px",
                        }}
                      >
                        <ListItem
                          onClick={() => handleClick(3)}
                          sx={{ padding: 0 }}
                        >
                          <ListItemText sx={{marginLeft: 1, marginRight:9 ,backgroundColor:'lightskyblue',borderRadius:'5px'}}>
                          <Typography sx={{paddingLeft:2}}>Project</Typography>
                          </ListItemText>
                          {open[3] ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                      </Box>
                      <Collapse
                        in={open[3]}
                        timeout="auto"
                        unmountOnExit
                        sx={{ backgroundColor: "#f7f9fb" }}
                      >
                        <Box sx={{ marginBottom: -1, boxShadow: 0 }}>
                          <List component="div" disablePadding>
                            <Box sx={{ width: "100%" }}>
                              <Box
                                sx={{ borderBottom: 1, borderColor: "divider" }}
                              >
                                <Tabs
                                  value={value}
                                  onChange={handleEventChange}
                                  aria-label="basic tabs example"
                                >
                                  <Tab
                                    label="INPROGRESS"
                                    {...a11yProps(0)}
                                    sx={{ padding: "2px", fontSize: "10px" }}
                                  />
                                  <Tab
                                    label="COMPLETED"
                                    {...a11yProps(1)}
                                    sx={{ padding: "2px", fontSize: "10px" }}
                                  />
                                </Tabs>
                              </Box>
                              <CustomTabPanel value={value} index={0}>
                                {/* <FormGroup>
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
                                      sx={{ padding: "2px", fontSize: "8px" }}
                                    />
                                  ))}
                                </FormGroup> */}
                                {/* <button onClick={handleCompleted}>Mark Completed</button> */}
                              </CustomTabPanel>
                              <CustomTabPanel value={value} index={1}>
                                {/* {completedItems.length > 0 ? (
                                  <FormGroup>
                                    {completedItems.map((item, index) => (
                                      <FormControlLabel
                                        key={index}
                                        required
                                        control={<Checkbox defaultChecked />}
                                        label={item}
                                      />
                                    ))}
                                  </FormGroup>
                                ) : (
                                  <p>No items completed yet.</p>
                                )} */}
                              </CustomTabPanel>
                            </Box>
                          </List>
                        </Box>
                      </Collapse>
                    </List>
                  </Box>
                </Item>
              </Grid>

              <Grid item xs={2}>
                <Item>
                  <Box

                  //   flex={3}
                  >
                    <List>
                      <Box
                        sx={{
                          boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                          borderRadius: "5px",
                          marginTop: -1,
                          padding: 0,
                          marginBottom: "5px",
                        }}
                      >
                        <ListItem
                          onClick={() => handleClick(4)}
                          sx={{ padding: 0 }}
                        >
                          <ListItemText sx={{ marginLeft: 1, marginRight:9 ,backgroundColor:'lightskyblue',borderRadius:'5px'}}>
                          <Typography sx={{paddingLeft:2}}>Basic</Typography>
                          </ListItemText>
                          {open[4] ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                      </Box>
                      <Collapse
                        in={open[4]}
                        timeout="auto"
                        unmountOnExit
                        sx={{ backgroundColor: "#f7f9fb" }}
                      >
                        <Box sx={{ marginBottom: -1, boxShadow: 0 }}>
                          <List component="div" disablePadding>
                            <Box sx={{ width: "100%" }}>
                              <Box
                                sx={{ borderBottom: 1, borderColor: "divider" }}
                              >
                                <Tabs
                                  value={value}
                                  onChange={handleEventChange}
                                  aria-label="basic tabs example"
                                >
                                  <Tab
                                    label="INPROGRESS"
                                    {...a11yProps(0)}
                                    sx={{ padding: "2px", fontSize: "10px" }}
                                  />
                                  <Tab
                                    label="COMPLETED"
                                    {...a11yProps(1)}
                                    sx={{ padding: "2px", fontSize: "10px" }}
                                  />
                                </Tabs>
                              </Box>
                              <CustomTabPanel value={value} index={0}>
                                {/* <FormGroup>
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
                                      sx={{ padding: "2px", fontSize: "8px" }}
                                    />
                                  ))}
                                </FormGroup> */}
                                {/* <button onClick={handleCompleted}>Mark Completed</button> */}
                              </CustomTabPanel>
                              <CustomTabPanel value={value} index={1}>
                                {/* {completedItems.length > 0 ? (
                                  <FormGroup>
                                    {completedItems.map((item, index) => (
                                      <FormControlLabel
                                        key={index}
                                        required
                                        control={<Checkbox defaultChecked />}
                                        label={item}
                                      />
                                    ))}
                                  </FormGroup>
                                ) : (
                                  <p>No items completed yet.</p>
                                )} */}
                              </CustomTabPanel>
                            </Box>
                          </List>
                        </Box>
                      </Collapse>
                    </List>
                  </Box>
                </Item>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
};

export default User;

