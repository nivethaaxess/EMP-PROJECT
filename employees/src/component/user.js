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
import { FaBook } from 'react-icons/fa';


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

function a11yProps(index, topic_name, level) {
  return {
    id: `simple-tab-${topic_name}-${level}-${index}`,
    "aria-controls": `simple-tabpanel-${topic_name}-${level}-${index}`,
  };
}

  const User = () => {
  const [userId, setUserID] = useState(1);
  const [openStates, setOpenStates] = useState({});
  const [courseList, setCourseList] = useState([]);
  const [statusList, setStatusList] = useState({});
  const [accordionStates, setAccordionStates] = useState([]);
  const [tabValues, setTabValues] = useState({});
  const [courseCount, setCourseCount] = useState({});

  const courseCountRender = Object.keys(courseCount).length > 0;



  console.log("accordionStates",accordionStates)
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
  }, []);

  console.log("help")
  useEffect(() => {
    // Initialize tabValues when courseList changes
    if (courseList.length > 0) {
      const initialTabValues = {};
      courseList.forEach((course) => {
        initialTabValues[course.topic_name] = {
          basic: 0,
          intermediate: 0,
          advance: 0,
        };
      });
      setTabValues((prevTabValues) => ({
        ...prevTabValues,
        ...initialTabValues,
      }));
    }
  }, [courseList]);

  const handleUpdate = async (course, subtopic_name, level, status) => {
    await axios
      .post("http://localhost:3007/updatestatus", {
        subtopic_name,
        status,
        userId,
      })
      .then((response) => {})
      .catch((err) => {
        console.log("Error updating subtopic status to COMPLETED:", err);
      });

    getStatus(course, level);
    updateCount(course);
  };

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
    }else{

      setOpenStates((prevOpenStates) => ({
        ...prevOpenStates,
        [course]: prevOpenStates[course]
          ? Object.keys(prevOpenStates[course]).reduce((acc, key) => {
              acc[key] = false;
              return acc;
            }, {})
          : {}, // Set an empty object if prevOpenStates[course] is undefined or null
      }));
      
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
    setTabValues((prevTabValues) => ({
      ...prevTabValues,
      [course]: { ...prevTabValues[course], [level]: newValue },
    }));

    getStatus(course, level);
  };

  const getStatus = async (course, level) => {
    await axios
      .get(
        `http://localhost:3007/api/getdata/?userId=${userId}&course=${course}&level=${level}`
      )
      .then((response) => {
        setStatusList((prevOpenStates) => {
          return {
            ...prevOpenStates,
            [course]: {
              ...prevOpenStates[course],
              [level]: response.data,
            },
          };
        });
      })
      .catch((err) => {
        console.log("errr==>", err);
      });
  };

  const handleOpenstatus = (course, level) => {

    getStatus(course, level);
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

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
           width: "95%",
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
                  style={{backgroundColor:"#dfdfdf"}}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    style={{}}

                  >
                    <Typography
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <FaBook style={{color: "#3d7ef0",marginRight:"5px"}}/>
                      {/* <FaHtml5 style={icon} className="FaHtml5" /> */}
                      {/* <FontAwesomeIcon icon="fa-solid fa-book-open" style={{color: "#af8d12",}} /> */}
                      {/* <FontAwesomeIcon icon="fa-duotone fa-book-open" style={{"--fa-primary-color": "#10449e", "--fa-secondary-color": "#3d7ef0",}} /> */}
                      <p style={{margin:0,fontWeight:600,fontStyle:"italic"}}>{course.topic_name.toUpperCase()}</p>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-around"
                    >
                      {JSON.parse(course.LEVEL).map((levelname,levelKey) => {
                        let level = levelname.toLowerCase();
                          return (
                            <Grid item xs={2} key={levelKey}>
                              <Item>
                                <Box
                                  sx={{
                                    boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.5)",
                                    borderRadius: "4px",
                                    // minHeight:"150px"
                                  }}
                                >
                                  <List>
                                    <Box
                                      sx={{
                                        //   boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                                        borderRadius: "5px",
                                        marginTop: -1,
                                        padding: 0,
                                        // marginBottom: "5px",
                                        borderBottom: "0.5px solid lightgray",
                                      }}
                                    >
                                      <ListItem
                                        onClick={() =>
                                          handleOpenstatus(
                                            course.topic_name,
                                            level
                                          )
                                        }
                                        sx={{
                                          padding: 0,
                                          display: "flex",
                                          alignItems: "center",
                                          backgroundColor:"#c2e7ff"
                                        }}
                                      >
                                        <ListItemText
                                          sx={{
                                            margin: 0.5,
                                            fontSize: "10px",
                                            // backgroundColor: "lightskyblue",
                                            borderRadius: "5px",
                                          }}
                                        >
                                          <Typography sx={{fontSize:"14px",textAlign:"center",fontWeight: 500 }}>
                                            {level.toUpperCase()}
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
                                            courseCount[course.topic_name][
                                              level
                                            ] &&
                                            courseCount[course.topic_name][
                                              level
                                            ].completed +
                                              "/" +
                                              courseCount[course.topic_name][
                                                level
                                              ].total}
                                        </Typography>
                                        {openStates[course.topic_name]?.[
                                          level
                                        ] ? (
                                          <ExpandLess />
                                        ) : (
                                          <ExpandMore />
                                        )}
                                      </ListItem>
                                    </Box>
                                    <Collapse
                                      in={
                                        openStates[course.topic_name]?.[level]
                                      }
                                      timeout="auto"
                                      unmountOnExit
                                      
                                      sx={{ backgroundColor:"white"}}
                                      // sx={{ backgroundColor: "#f7f9fb" }}
                                    >
                                      <Box sx={{}}>
                                        <List component="div" disablePadding>
                                          {level == "others" ?(
                                             
                                              <p style={{textAlign:"center"}}>Others</p>
                                            ):level == "project"? (<p style={{textAlign:"center"}}>Project</p>):(<Box sx={{ width: "100%" }}>
                                            <Box
                                              sx={{
                                                borderBottom: 1,
                                                borderColor: "divider",
                                               
                                              }}
                                            >
                                              <Tabs
                                                value={
                                                  tabValues[
                                                    course.topic_name
                                                  ]?.[level] || 0
                                                }
                                                onChange={(e, value) =>
                                                  handleEventChange(
                                                    e,
                                                    value,
                                                    level,
                                                    course.topic_name
                                                  )
                                                }
                                                aria-label="basic tabs example"
                                              >
                                                <Tab
                                                  label="INPROGRESS"
                                                  {...a11yProps(
                                                    0,
                                                    course.topic_name,
                                                    level
                                                  )}
                                                  sx={{
                                                    padding: "2px",
                                                    fontSize: "10px",
                                                    flexGrow:1,
                                                    fontWeight:"bold"
                                                  }}
                                                />
                                                <Tab
                                                  label="COMPLETED"
                                                  {...a11yProps(
                                                    1,
                                                    course.topic_name,
                                                    level
                                                  )}
                                                  sx={{
                                                    padding: "2px",
                                                    fontSize: "10px",
                                                    flexGrow:1,
                                                    fontWeight:"bold"
                                                  }}
                                                />
                                              </Tabs>
                                            </Box>

                                            <CustomTabPanel
                                              value={
                                                tabValues[course.topic_name]?.[
                                                  level
                                                ]
                                              }
                                              index={0}
                                            >
                                              <Box
                                                className="status_box"
                                                sx={{
                                                  maxHeight: "250px", 
                                                  // minHeight:"100px",
                                                  overflow: "auto",
                                                  width: "100%",
                                                  
                                                }}
                                              >
                                                <FormGroup sx={{}}>
                                                  {statusList?.[
                                                    course.topic_name
                                                  ]?.[level]?.["inprogress"]
                                                    ?.length > 0 ? (
                                                    statusList[
                                                      course.topic_name
                                                    ][level]["inprogress"].map(
                                                      (item, index) => (
                                                        <div  className = "form-inprogress" style={{display:"flex",alignItems:"center",}}>
                                                        <FormControlLabel
                                                          key={index}
                                                          control={
                                                            <Checkbox
                                                              color="secondary"
                                                              size="small"
                                                              icon={
                                                                <RadioButtonUncheckedIcon />
                                                              }
                                                              checkedIcon={
                                                                <CheckCircleIcon />
                                                              }
                                                              label={<FaEye />}
                                                              checked={false} // Since status is 'Notcompleted', we set checked to false
                                                              onChange={() =>
                                                                handleUpdate(
                                                                  course.topic_name,
                                                                  item.subTopic_name,
                                                                  level,
                                                                  "completed"
                                                                )
                                                              }
                                                            />
                                                          }
                                                          label={
                                                            item.subTopic_name
                                                              .charAt(0)
                                                              .toUpperCase() +
                                                            item.subTopic_name.slice(
                                                              1
                                                            )
                                                          }
                                                        />
                                                        <a href={item.LINK} style={{textDecoration:"none",textAlign:"right",flexGrow:1}} target="_blank"><i class="ri-eye-fill"
                                                      style={{
                                                        fontSize: "14px",
                                                        color: "#099be2",
                                                        paddingRight: "10px",
                                                      }}
                                                    ></i></a>
                                                        </div>
                                                      )
                                                    )
                                                  ) : (
                                                    <p style={{textAlign:"center"}}>No items in progress.</p>
                                                  )}
                                                </FormGroup>
                                              </Box>
                                            </CustomTabPanel>
                                            <CustomTabPanel
                                              value={
                                                tabValues[course.topic_name]?.[
                                                  level
                                                ]
                                              }
                                              index={1}
                                            >
                                              <Box
                                                sx={{
                                                  maxHeight: "250px", 
                                                  // minHeight:"100px",
                                                  overflowY: "auto",
                                                }}
                                              >
                                                <FormGroup>
                                                  {statusList?.[
                                                    course.topic_name
                                                  ]?.[level]?.["completed"]
                                                    ?.length > 0 ? (
                                                    statusList[
                                                      course.topic_name
                                                    ][level]["completed"].map(
                                                      (item, index) => (
                                                        <div 
                                                        className = "form-completed" 
                                                        style={{display:"flex",alignItems:"center",}}>
                                                        <FormControlLabel
                                                          key={index}
                                                          control={
                                                            <Checkbox
                                                              color="secondary"
                                                              size="small"
                                                              icon={
                                                                <RadioButtonUncheckedIcon />
                                                              }
                                                              checkedIcon={
                                                                <CheckCircleIcon />
                                                              }
                                                              label={<FaEye />}
                                                              checked={true} // Since status is 'completed', we set checked to true
                                                              onChange={() =>
                                                                handleUpdate(
                                                                  course.topic_name,
                                                                  item.subTopic_name,
                                                                  level,
                                                                  "inprogress"
                                                                )
                                                              }
                                                            />
                                                            
                                                          }
                                                          label={
                                                            item.subTopic_name
                                                              .charAt(0)
                                                              .toUpperCase() +
                                                            item.subTopic_name.slice(
                                                              1
                                                            )
                                                          }
                                                        
                                                        />
                                                        <a href={item.LINK} style={{textDecoration:"none",textAlign:"right",flexGrow:1}} target="_blank"><i class="ri-eye-fill"
                                                      style={{
                                                        fontSize: "14px",
                                                        color: "#099be2",
                                                        paddingRight: "10px",
                                                      }}
                                                    ></i></a>
                                                        </div>
                                                      )
                                                    )
                                                  ) : (
                                                    <p style={{textAlign:"center"}}>No items in completed.</p>
                                                  )}
                                                  
                                                </FormGroup>
                                              </Box>
                                            </CustomTabPanel>
                                          </Box>)
                                         }
                                          
                                        </List>
                                      </Box>
                                    </Collapse>
                                  </List>
                                </Box>
                              </Item>
                            </Grid>
                          );                        
                      })}
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
