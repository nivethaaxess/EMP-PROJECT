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

const User = ({ toggleDrawer }) => {
  const [openStates, setOpenStates] = useState({});
  const [courseList, setCourseList] = useState([]);
  // const [expanded, setExpanded] = useState({});
  const [Htmltopics, setHtmltopics] = useState([
    { topic: "Htmlelement", status: false },
    { topic: "inline", status: false },
    { topic: "block", status: false },
    { topic: "element", status: false },
    { topic: "test", status: false },
    { topic: "psuedo", status: false },
    { topic: "color", status: false },
    { topic: "forms", status: false },
    { topic: "responsive", status: false },
  ]);

  const [tabValues, setTabValues] = useState({});

  // const handleAccordionChange = (course) => (event, isExpanded) => {
  //   console.log(course,"acc change",event,isExpanded)
  //   console.log("expanded",expanded)
  //   setExpanded((prevExpanded) => ({ ...prevExpanded, [course]: isExpanded }));
  // };
  console.log("openStates", openStates);
  console.log("tabValues", tabValues);

  const handleEventChange = (event, newValue, type, course) => {
    console.log(tabValues, "tabvalues", newValue, type, course);
    setTabValues((prevTabValues) => ({
      ...prevTabValues,
      [course]: { ...prevTabValues[course], [type]: newValue },
    }));
  };

  const handleOpenstatus = (course, index) => {
    setOpenStates((prevOpenStates) => ({
      ...prevOpenStates,
      [course]: {
        ...prevOpenStates[course],
        [index]: !prevOpenStates[course]?.[index],
      },
    }));
  };

  const icon = {
    color: "#c55c16",
    fontSize: "30px",
  };

  const handleChange = (index) => {
    setHtmltopics((prevCheckedItems) => {
      const updatedCheckedItems = [...prevCheckedItems];
      updatedCheckedItems[index].status = !updatedCheckedItems[index].status;
      console.log(updatedCheckedItems, "updatedCheckedItems");
      return updatedCheckedItems;
    });
  };

  useEffect(() => {
    setCourseList(["HTML", "CSS", "Javascript", "Bootstrap", "React"]);
  }, []);
  useEffect(() => {
    // Initialize tabValues when courseList changes
    if (courseList.length > 0) {
      const initialTabValues = {};
      courseList.forEach((course) => {
        initialTabValues[course] = {
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
          width: "82vw",
          margin: "0 auto",
        }}
      >
        {courseList.map((course, i) => {
          return (
            <>
              <Accordion
                //  expanded={expanded[course]}
                //  onChange={handleAccordionChange(course)}
                key={i}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography style={{ display: "flex", alignItems: "center" }}>
                    <FaHtml5 style={icon} className="FaHtml5" />
                    {course}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container direction="row" justifyContent="space-around">
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
                                onClick={() => handleOpenstatus(course, 0)}
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
                                  }}
                                >
                                  {Htmltopics.filter((a) => a.status).length} /{" "}
                                  {Htmltopics.length}
                                </Typography>
                                {openStates[course]?.[0] ? (
                                  <ExpandLess />
                                ) : (
                                  <ExpandMore />
                                )}
                              </ListItem>
                            </Box>
                            <Collapse
                              in={openStates[course]?.[0]}
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
                                        value={tabValues[course]?.basic || 0}
                                        onChange={(e, value) =>
                                          handleEventChange(
                                            e,
                                            value,
                                            "basic",
                                            course
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
                                        sx={{
                                          maxHeight: "150px", // Optional: Set a specific height for the container
                                          overflowY: "auto",
                                        }}
                                      >
                                        <FormGroup sx={{}}>
                                          {Htmltopics.map((item, index) => {
                                            return (
                                              item.status === false && (
                                                <FormControlLabel
                                                  sx={{}}
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
                                                      checked={item.status}
                                                      onChange={() =>
                                                        handleChange(index)
                                                      }
                                                      s
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
                                          {Htmltopics.map((item, index) => {
                                            return (
                                              item.status === true && (
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
                                                      checked={item.status}
                                                      onChange={() =>
                                                        handleChange(index)
                                                      }
                                                      s
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
                                onClick={() => handleOpenstatus(course, 1)}
                                sx={{ padding: 0 }}
                              >
                                <ListItemText sx={{ marginLeft: 3 }}>
                                  Intermediate
                                </ListItemText>
                                {openStates[course]?.[1] ? (
                                  <ExpandLess />
                                ) : (
                                  <ExpandMore />
                                )}
                              </ListItem>
                            </Box>
                            <Collapse
                              in={openStates[course]?.[1]}
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
                                          tabValues[course]?.intermediate || 0
                                        }
                                        onChange={(e, value) =>
                                          handleEventChange(
                                            e,
                                            value,
                                            "intermediate",
                                            course
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
                                onClick={() => handleOpenstatus(course, 2)}
                                sx={{ padding: 0 }}
                              >
                                <ListItemText sx={{ marginLeft: 3 }}>
                                  Advanced
                                </ListItemText>
                                {openStates[course]?.[2] ? (
                                  <ExpandLess />
                                ) : (
                                  <ExpandMore />
                                )}
                              </ListItem>
                            </Box>
                            <Collapse
                              in={openStates[course]?.[2]}
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
                                        value={tabValues[course]?.advanced || 0}
                                        onChange={(e, value) =>
                                          handleEventChange(
                                            e,
                                            value,
                                            "advanced",
                                            course
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
                                onClick={() => handleOpenstatus(course, 3)}
                                sx={{ padding: 0 }}
                              >
                                <ListItemText sx={{ marginLeft: 3 }}>
                                  Project
                                </ListItemText>
                                {openStates[course]?.[3] ? (
                                  <ExpandLess />
                                ) : (
                                  <ExpandMore />
                                )}
                              </ListItem>
                            </Box>
                            <Collapse
                              in={openStates[course]?.[3]}
                              timeout="auto"
                              unmountOnExit
                              sx={{ backgroundColor: "#f7f9fb" }}
                            >
                              <Box sx={{ marginBottom: -1, boxShadow: 0 }}>
                                <List component="div" disablePadding>
                                  <Box
                                    sx={{ width: "100%", textAlign: "center" }}
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
                                onClick={() => handleOpenstatus(course, 4)}
                                sx={{ padding: 0 }}
                              >
                                <ListItemText
                                  sx={{ marginLeft: 3, fontSize: "8px" }}
                                >
                                  Other
                                </ListItemText>
                                {openStates[course]?.[4] ? (
                                  <ExpandLess />
                                ) : (
                                  <ExpandMore />
                                )}
                              </ListItem>
                            </Box>
                            <Collapse
                              in={openStates[course]?.[4]}
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
