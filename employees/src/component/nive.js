import React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Checkbox, Collapse, FormControlLabel, FormGroup } from "@mui/material";
import { FaHtml5, FaEye } from "react-icons/fa";
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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import axios from "axios";

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

const User = () => {
  const [userId, setUserID] = useState(1);
  const [openStates, setOpenStates] = useState({});
  const [courseList, setCourseList] = useState([]);


const [statusList,setStatusList] = useState({})



const handleUpdate = (subtopic_name,status) => {
  axios.post('http://localhost:3007/updatestatus', { subtopic_name,status,userId })
    .then(response => {
      console.log('Subtopic status updated to COMPLETED:', response.data);
      
    })
    .catch(err => {
      console.log('Error updating subtopic status to COMPLETED:', err);
    });
};

// sai ends----------------------

  const [accordionStates, setAccordionStates] = useState([]);
  const [tabValues, setTabValues] = useState({});
  const [courseCount, setCourseCount] = useState({});

  const courseCountRender = Object.keys(courseCount).length > 0;

  const handleAccordionChange = (course, isExpanded) => {

    setAccordionStates((prevAccordionStates) =>
      prevAccordionStates.map((accordionState) =>
        accordionState.topic_name === course
          ? { ...accordionState, isExpanded }
          : accordionState
      )
    );
    if (isExpanded) {
       updateCount(course);
    }
  };

  const updateCount = (course) => {
    axios
      .get(
        `http://localhost:3007/subTopicCount/?userId=${userId}&course=${course}`
      )
      .then((res) => {
        setCourseCount((pre) => ({ ...pre, [course]: res.data }));
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleEventChange = (event, newValue, level, course) => {

    console.log("handleEventChange called",course,level)
    setTabValues((prevTabValues) => ({
      ...prevTabValues,
      [course]: { ...prevTabValues[course], [level]: newValue },
    } ));


     getStatus(course,level)
  };


  const getStatus = async(course,level)=>{

    console.log("getsatus called",course,level)
    await axios.get(`http://localhost:3007/api/getdata/?userId=${userId}&course=${course}&level=${level}`)
    .then(response => {

      console.log("respo",response.data)
       
      
        setStatusList((prevOpenStates) => {

          return {
          ...prevOpenStates,
          [course]: {
            ...prevOpenStates[course],
            [level]: response.data,
          },
        }});

    })
    .catch(err => {
      console.log('errr==>', err);
    })

  }


  console.log("tabvalus",tabValues)


  const handleOpenstatus = (course, level) => {

    console.log("handleOpenstatus",course,level)

    getStatus(course,level)

    setOpenStates((prevOpenStates) => ({
      ...prevOpenStates,
      [course]: {
        ...prevOpenStates[course],
        [level]: !prevOpenStates[course]?.[level],
      },
    }));
  };

  const icon = {
    color: "#c55c16",
    fontSize: "30px",
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3007/courseList/${userId}`)
      .then((a) => {
        console.log("result", a.data);
        setCourseList(a.data);
        setAccordionStates(
          a.data.map((accordion) => ({
            topic_name: accordion.topic_name,
            isExpanded: false,
            data: [],
          }))
        );
      })
      .catch((err) => {
        console.log("err", err);
      });

    console.log("useeffect");
  }, []);

  useEffect(() => {
    // Initialize tabValues when courseList changes
    if (courseList.length > 0) {
      console.log("coarselist",courseList)
      console.log("len",courseList.length > 0)
      const initialTabValues = {};
      courseList.forEach((course) => {
        initialTabValues[course.topic_name] = {
          basic: 0,
          intermediate: 0,
          advanced: 0,
        };
      });
      setTabValues((prevTabValues) => ({
         ...prevTabValues,
        ...initialTabValues,
      }));
    }
  }, [courseList]);

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          width: "90%",
          margin: "0 auto",
        }}
      >
        {Array.isArray(courseList) &&
          courseList.length > 0 &&
          courseList.map((course, i) => {
            const accordionState = accordionStates.find(
              (accordionState) =>
                accordionState.topic_name === course.topic_name
            );
            return (
              <>
                <Accordion
                  injectfirst="true"
                  expanded={accordionState.isExpanded}
                  onChange={(event, isExpanded) =>
                    handleAccordionChange(course.topic_name, isExpanded)
                  }
                  key={i}
                  TransitionProps={{ unmountOnExit: true }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <FaHtml5 style={icon} className="FaHtml5" />
                      {course.topic_name}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-around"
                    >
                      <Grid item xs={2}>
                        <Item>
                          <Box
                            sx={{
                              boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.5)",
                              borderRadius: "4px",
                            }}
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
                                <ListItem
                                  onClick={() => handleOpenstatus(course.topic_name,"basic")}
                                  sx={{
                                    padding: 0,
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <ListItemText
                                    sx={{
                                      marginLeft: 1,
                                      marginRight: 7,
                                      backgroundColor: "lightskyblue",
                                      borderRadius: "5px",
                                    }}
                                  >
                                    <Typography sx={{ paddingLeft: 1 }}>
                                      Basic
                                    </Typography>
                                  </ListItemText>
                                  <Typography
                                    sx={{
                                      marginLeft: "auto",
                                      backgroundColor: "rgba(0,0,0,0.12)",
                                      padding: "0 4px",
                                      borderRadius: "5px",
                                      fontSize: "12px",
                                    }}
                                  >

                                    {courseCountRender &&
                                      courseCount[course.topic_name] &&
                                      courseCount[course.topic_name]["basic"] &&
                                      courseCount[course.topic_name]["basic"]
                                        .completed + "/" +
                                        courseCount[course.topic_name]["basic"]
                                          .total}
                                  </Typography>
                                  {openStates[course.topic_name]?.["basic"] ? (
                                    <ExpandLess />
                                  ) : (
                                    <ExpandMore />
                                  )}
                                </ListItem>
                              </Box>
                              <Collapse
                                in={openStates[course.topic_name]?.["basic"]}
                                timeout="auto"
                                unmountOnExit
                                sx={{ backgroundColor: "#f7f9fb" }}
                              >
                                <Box sx={{ marginBottom: -1, boxShadow: 0 }}>
                                  <List component="div" disablePadding>
                                    <Box sx={{ width: "100%" }}>
                                      <Box
                                        sx={{
                                          borderBottom: 1,
                                          borderColor: "divider",
                                        }}
                                      >
                                        <Tabs
                                          value={tabValues[course.topic_name]?.basic || 0}
                                          onChange={(e, value) =>
                                            handleEventChange(
                                              e,
                                              value,
                                              "basic",
                                              course.topic_name
                                            )
                                          }
                                          aria-label="basic tabs example"
                                        >
                                          <Tab
                                            label="INPROGRESS"
                                            {...a11yProps(0)}
                                            sx={{
                                              padding: "2px",
                                              fontSize: "10px",
                                            }}
                                          />
                                          <Tab
                                            label="COMPLETED"
                                            {...a11yProps(1)}
                                            sx={{
                                              padding: "2px",
                                              fontSize: "10px",
                                            }}
                                          />
                                        </Tabs>
                                      </Box>

                                      <CustomTabPanel
                                        value={tabValues[course]?.basic}
                                        index={0}
                                      >
                                        <Box
                                          className="status_box"
                                          sx={{
                                            maxHeight: "250px", // Optional: Set a specific height for the container
                                            overflow: "auto",
                                            width: "100%",
                                          }}
                                        >
                                           <FormGroup sx={{}}>
                                            {/* {console.log(statusList,course.topic_name )} */}
                                            {console.log(statusList?.[course.topic_name]?.["basic"]?.["inprogress"])}
                                            {/* {console.log(statusList, course.topic_name, basic)} */}
                                            {  statusList?.[course.topic_name]?.["basic"]?.["inprogress"]?.map((item, index) => {

                                                console.log("ssslist",item.subTopic_name)
                                                  return <>
                                            <FormControlLabel
                                              key={index}
                                              control={
                                                <Checkbox
                                                  color="secondary"
                                                  size="small"
                                                  icon={<RadioButtonUncheckedIcon />}
                                                  checkedIcon={<CheckCircleIcon />}
                                                  label={<FaEye />}
                                                  checked={false} // Since status is 'Notcompleted', we set checked to false
                                                  onChange={() => handleUpdate(item.subtopic_name,"completed")}
                                                />
                                              }
                                              label={item.subTopic_name}
                                            />
                                            </>
                                            })}
                                          </FormGroup>
                                        </Box>
                                      </CustomTabPanel>
                                      <CustomTabPanel
                                        value={tabValues[course]?.basic}
                                        index={1}
                                      >
                                        <Box
                                          sx={{
                                            maxHeight: "150px", // Optional: Set a specific height for the container
                                            overflowY: "auto",
                                          }}
                                        >
                                          <FormGroup>
                                          
                                            {statusList?.course?.topic_name?.basic?.completed?.map((item, index) => (<>
                                          <FormControlLabel
                                            key={index}
                                            control={
                                              <Checkbox
                                                color="secondary"
                                                size="small"
                                                icon={<RadioButtonUncheckedIcon />}
                                                checkedIcon={<CheckCircleIcon />}
                                                label={<FaEye />}
                                                checked={true} // Since status is 'completed', we set checked to true
                                                // onChange={() => handleChangeNotCompleted(item.subtopic_name,item.subTopic_id)}
                                                onChange={() => handleUpdate(item.subtopic_name,"inprogress")}
                                              />
                                            }
                                            label={item.subtopic_name}
                                          />
                                          </>
                                        ))}
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
                                  onClick={() => handleOpenstatus(course.topic_name, "intermediate")}
                                  sx={{ padding: 0 }}
                                >
                                  <ListItemText sx={{ marginLeft: 3 }}>
                                    Intermediate
                                  </ListItemText>
                                  <Typography
                                    sx={{
                                      marginLeft: "auto",
                                      backgroundColor: "rgba(0,0,0,0.12)",
                                      padding: "0 4px",
                                      borderRadius: "5px",
                                      fontSize: "12px",
                                    }}
                                  >

                                    {courseCountRender &&
                                      courseCount[course.topic_name] &&
                                      courseCount[course.topic_name]["intermediate"] &&
                                      courseCount[course.topic_name]["intermediate"]
                                        .completed + "/" +
                                        courseCount[course.topic_name]["intermediate"]
                                          .total}
                                  </Typography>
                                  {openStates[course.topic_name]?.["intermediate"] ? (
                                    <ExpandLess />
                                  ) : (
                                    <ExpandMore />
                                  )}
                                </ListItem>
                              </Box>
                              <Collapse
                                in={openStates[course.topic_name]?.["intermediate"]}
                                timeout="auto"
                                unmountOnExit
                                sx={{ backgroundColor: "#f7f9fb" }}
                              >
                                <Box sx={{ marginBottom: -1, boxShadow: 0 }}>
                                  <List component="div" disablePadding>
                                    <Box sx={{ width: "100%" }}>
                                      <Box
                                        sx={{
                                          borderBottom: 1,
                                          borderColor: "divider",
                                        }}
                                      >
                                        <Tabs
                                          value={
                                            tabValues[course.topic_name]?.intermediate || 0
                                          }
                                          onChange={(e, value) =>
                                            handleEventChange(
                                              e,
                                              value,
                                              "intermediate",
                                              course.topic_name
                                            )
                                          }
                                          aria-label="basic tabs example"
                                        >
                                          <Tab
                                            label="INPROGRESS"
                                            {...a11yProps(0)}
                                            sx={{
                                              padding: "2px",
                                              fontSize: "10px",
                                            }}
                                          />
                                          <Tab
                                            label="COMPLETED"
                                            {...a11yProps(1)}
                                            sx={{
                                              padding: "2px",
                                              fontSize: "10px",
                                            }}
                                          />
                                        </Tabs>
                                      </Box>
                                      <CustomTabPanel
                                        value={tabValues[course]?.intermediate}
                                        index={0}
                                      >
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
                                      <CustomTabPanel
                                        value={tabValues[course]?.intermediate}
                                        index={1}
                                      >
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
                                  onClick={() => handleOpenstatus(course.topic_name, "advance")}
                                  sx={{ padding: 0 }}
                                >
                                  <ListItemText sx={{ marginLeft: 3 }}>
                                    Advanced
                                  </ListItemText>
                                  <Typography
                                    sx={{
                                      marginLeft: "auto",
                                      backgroundColor: "rgba(0,0,0,0.12)",
                                      padding: "0 4px",
                                      borderRadius: "5px",
                                      fontSize: "12px",
                                    }}
                                  >
                                    {courseCountRender &&
                                      courseCount[course.topic_name] &&
                                      courseCount[course.topic_name]["advance"] &&
                                      courseCount[course.topic_name]["advance"]
                                        .completed + "/" +
                                        courseCount[course.topic_name]["advance"]
                                          .total}
                                  </Typography>
                                  {openStates[course.topic_name]?.["advance"] ? (
                                    <ExpandLess />
                                  ) : (
                                    <ExpandMore />
                                  )}
                                </ListItem>
                              </Box>
                              <Collapse
                                in={openStates[course.topic_name]?.["advance"]}
                                timeout="auto"
                                unmountOnExit
                                sx={{ backgroundColor: "#f7f9fb" }}
                              >
                                <Box sx={{ marginBottom: -1, boxShadow: 0 }}>
                                  <List component="div" disablePadding>
                                    <Box sx={{ width: "100%" }}>
                                      <Box
                                        sx={{
                                          borderBottom: 1,
                                          borderColor: "divider",
                                        }}
                                      >
                                        <Tabs
                                          value={
                                            tabValues[course.topic_name]?.advanced || 0
                                          }
                                          onChange={(e, value) =>
                                            handleEventChange(
                                              e,
                                              value,
                                              "advanced",
                                              course.topic_name
                                            )
                                          }
                                          aria-label="basic tabs example"
                                        >
                                          <Tab
                                            label="INPROGRESS"
                                            {...a11yProps(0)}
                                            sx={{
                                              padding: "2px",
                                              fontSize: "10px",
                                            }}
                                          />
                                          <Tab
                                            label="COMPLETED"
                                            {...a11yProps(1)}
                                            sx={{
                                              padding: "2px",
                                              fontSize: "10px",
                                            }}
                                          />
                                        </Tabs>
                                      </Box>
                                      <CustomTabPanel
                                        value={tabValues[course]?.advanced}
                                        index={0}
                                      >
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
                                      <CustomTabPanel
                                        value={tabValues[course]?.advanced}
                                        index={1}
                                      >
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
                                  onClick={() => handleOpenstatus(course.topic_name, "project")}
                                  sx={{ padding: 0 }}
                                >
                                  <ListItemText sx={{ marginLeft: 3 }}>
                                    Project
                                  </ListItemText>
                                  {openStates[course.topic_name]?.["project"] ? (
                                    <ExpandLess />
                                  ) : (
                                    <ExpandMore />
                                  )}
                                </ListItem>
                              </Box>
                              <Collapse
                                in={openStates[course.topic_name]?.["project"]}
                                timeout="auto"
                                unmountOnExit
                                sx={{ backgroundColor: "#f7f9fb" }}
                              >
                                <Box sx={{ marginBottom: -1, boxShadow: 0 }}>
                                  <List component="div" disablePadding>
                                    <Box
                                      sx={{
                                        width: "100%",
                                        textAlign: "center",
                                      }}
                                    >
                                      <h4>Title </h4>
                                      <p>Describtion</p>
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
                                  onClick={() => handleOpenstatus(course.topic_name, "other")}
                                  sx={{ padding: 0 }}
                                >
                                  <ListItemText
                                    sx={{ marginLeft: 3, fontSize: "8px" }}
                                  >
                                    Other
                                  </ListItemText>
                                  {openStates[course.topic_name]?.["other"] ? (
                                    <ExpandLess />
                                  ) : (
                                    <ExpandMore />
                                  )}
                                </ListItem>
                              </Box>
                              <Collapse
                                in={openStates[course.topic_name]?.["other"]}
                                timeout="auto"
                                unmountOnExit
                                sx={{ backgroundColor: "#f7f9fb" }}
                              >
                                <Box sx={{ marginBottom: -1, boxShadow: 0 }}>
                                  <List component="div" disablePadding>
                                    <Box sx={{ width: "100%" }}>
                                      <p>Other</p>
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
              </>
            );
          })}
      </Box>
    </>
  );
};

export default User;
