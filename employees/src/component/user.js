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
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';


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
  const [userId, setUserID] = useState(localStorage.getItem("userId"));
  const [openStates, setOpenStates] = useState({});
  const [courseList, setCourseList] = useState([]);
  const [statusList, setStatusList] = useState({});
  const [accordionStates, setAccordionStates] = useState([]);
  const [tabValues, setTabValues] = useState({});
  const [courseCount, setCourseCount] = useState({});

  const courseCountRender = Object.keys(courseCount).length > 0;
  const[getProject,setProject] = useState({});
  const [editedIndex, setEditedIndex] = useState(-1);
  const [EditOPened,setEditOpened]=useState(false);
      const [editChangeData, setEditChangeData] = useState({
        project_id: '',
       project_name: '',
       description: '', 
       add_link: '',
       topic_id: '', });
       const [editOpen,setEditOpen]= useState(false)

 const[subCourse_edited,setSubCourse_edited]= useState();
 const[getSubTopics,setSubTopics]= useState();
console.log("userId",userId)


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
console.log("courseLi",courseList)
console.log("tab valyes",tabValues)

  useEffect(() => {
    // Initialize tabValues when courseList changes
    if (courseList.length > 0) {
      const initialTabValues = {};
      courseList.forEach((course) => {
        initialTabValues[course.topic_name] =  JSON.parse(course.LEVEL).reduce((acc, key) => {
          acc[key] = 0;
          return acc;
        }, {})
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


  const handleClosesEdit = () => {
    setEditOpen(false);
  };

  const handleClose3Edit = () => {
    setEditOpened(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditChangeData({ ...editChangeData, [name]: value }); 
  }; 

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    console.log("editChangeData", editChangeData) ;
    try {
      const response = await axios.post(
        "http://localhost:3007/api/update/projectnew",
        editChangeData
        
      );
    
      // Check the HTTP status code to determine the response type
      if (response.status === 200) {
        // Success response (status code 200)
        setEditOpen(false)
        console.log("Success: Project updated successfully");
        console.log("Response data:", response.data);
      } else {
        // Handle other status codes (e.g., 404 for not found)
        console.error(`Error: Unexpected status code - ${response.status}`);
      }
    } catch (error) {
      // Handle network errors or exceptions
      console.error("Error:", error.message);
    }
    

     // Send a POST request with formData to update the project 
        /* onEdit(editChangeData);  */
      };

      const handleEditProject =(project_id)=>{
        setEditOpen(true)
        const projectIdToFind = project_id; // Replace with the project_id you want to find

const foundProject = getProject.find((project) => project.project_id === projectIdToFind);

if (foundProject) {
// The project with the specified project_id was found
console.log(foundProject);
setEditChangeData({ project_id: foundProject.project_id,
project_name: foundProject.project_name,
description: foundProject.description, 
add_link: foundProject.add_link,
topic_id: foundProject.topic_id, });} else {
// No project with the specified project_id was found
console.log('Project not found');
}
}

const onDelete = async (id) => {
  try {
    console.log("id===>>>>", id);
    const dataToDelete = { project_id: id }; 
    // Make a DELETE request to your API endpoint
    const response = await axios.post(
      "http://localhost:3007/api/delete/project",
      dataToDelete
    );

    // Handle success (e.g., update UI or state)
    console.log("Item deleted:", response.data);

    // Clear the dataToDelete state
    // setDataToDelete(null);

    // You can also update any other relevant state here
  } catch (error) {
    // Handle errors (e.g., show an error message)
    console.error("Error deleting item:", error);
  }
}; 

// const handleInputChange1 = (event) => {
//   console.log("event.target.value===>>", event.target.value);
//   setsubCourse_edited(event.target.value);
// };

// const handleSaveClick1 = (value, index, level) => {
//   const updatedSubTopics = [...getSubTopics];
//   updatedSubTopics[index] = subCourse_edited;
//   setgetSubTopics(updatedSubTopics);
//   setEditedIndex(-1);
//   console.log("subCourse_edited===>>>>", subCourse_edited);
//   console.log("value===>>>>", value);
//   console.log("level===>>>>", level);
//   const data = {
//     SubTopic: subCourse_edited,
//     Id: value,
//   };
//   axios
//     .post("http://localhost:3007/api/subTopics/edit", data)
//     .then((val) => {
//       console.log("VAL===>>>", val);
//       openStates(level);
//     })
//     .catch((err) => console.log("err===>>>", err));
//   setsubCourse_edited("");
// };


// const handleEditClick1 = (index, value) => {
//   setEditedIndex(index);
//   // setsubCourse_edited(value);
// };

useEffect(() => {
  console.log("Form data submitted");
  axios
    .get("http://localhost:3007/api/projectnew/edits")
    .then((response) => {
      console.log("Responsedata===>", response.data);
      setProject(response.data);
      // Update the state with the data received from the API
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}, []);
  

const ProjectCard = ({ title1, description1 }) => {
  const projects = [
    {
      title1: 'Project 1',
      description1: 'Description of Project 1',
    },
    {
      title1: 'Project 2',
      description1: 'Description of Project 2',
    },
    // Add more projects as needed
  ];

}
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
           width: "95%",
           margin: "0 auto"
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
                      sx={{paddingBottom:"20px"}}
                    >
                      {JSON.parse(course.LEVEL).map((level,levelKey) => {
                        // let level = levelname.toLowerCase();
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
                                          {console.log("hello",level)}
                                          {level == "OTHERS" ?(
                                             
                                              <p style={{textAlign:"center"}}>Others</p>
                                            ):level == "PROJECT"? (<>
                                             {getProject.map((item, index) => (
                                  <CardContent key={index}>
                                    <Card sx={{ minWidth: 100 }}>
                                      <CardContent
                                        elevation={6}
                                        variant="outlined"
                                      >
                                        <Typography
                                          sx={{ fontSize: "15px" }}
                                          color="text.secondary"
                                          gutterBottom
                                        >
                                          {/*    <Form onSubmit={handleEditSubmit}>
          <TextField
            label="Project Name"
            variant="outlined"
            name="project_name"
            value={editChangeData.project_name}
            onChange={handleEditChange}
            fullWidth
            margin="normal"
          />   
          </Form> */}
                                          <Dialog
                                            open={editOpen}
                                            onClose={handleClosesEdit}
                                          >
                                            <DialogTitle>PROJECT</DialogTitle>
                                            <DialogContent>
                                              <DialogContentText>
                                                {/* <Button variant="outlined" color="primary" onClick={handleClickOpen3}>
           OPEN FORM
      </Button> */}
                                                {/* <Dialog open={opened} onClose={handleClose3}> */}
                                                <Dialog
                                                  open={editOpen}
                                                  onClose={handleClose3Edit}
                                                >
                                                  <DialogTitle>
                                                    Form
                                                  </DialogTitle>
                                                  <DialogContent>
                                                    <DialogContentText>
                                                      Please fill in the form
                                                      below:
                                                    </DialogContentText>
                                                    <TextField
                                                      autoFocus
                                                      margin="dense"
                                                      name="project_name"
                                                      label=" "
                                                      value={
                                                        editChangeData.project_name
                                                      }
                                                      type="text"
                                                      fullWidth
                                                      onChange={
                                                        handleEditChange
                                                      }
                                                    />
                                                    <TextField
                                                      margin="dense"
                                                      name="description"
                                                      label=" "
                                                      value={
                                                        editChangeData.description
                                                      }
                                                      type="text"
                                                      fullWidth
                                                      onChange={
                                                        handleEditChange
                                                      }
                                                    />
                                                    <TextField
                                                      margin="dense"
                                                      name="add_link"
                                                      label=""
                                                      value={
                                                        editChangeData.add_link
                                                      }
                                                      type="text"
                                                      fullWidth
                                                      onChange={
                                                        handleEditChange
                                                      }
                                                    />
                                                  </DialogContent>
                                                  <DialogActions>
                                                    <Button
                                                      onClick={handleEditSubmit}
                                                      color="primary"
                                                    > 
                                                      Edit
                                                    </Button>
                                                    <Button
                                                      onClick={handleEditSubmit}
                                                      color="primary"
                                                      enabled="true"
                                                    >
                                                      {/* {isSubmitting ? 'Submit' : 'Submit'} */}
                                                      SUBMIT
                                                    </Button>
                                                  </DialogActions>
                                                </Dialog>
                                              </DialogContentText>
                                            </DialogContent>
                                            {/* <DialogActions>
          <Button onClick={handleClose3} color="primary">
            Close
          </Button>
        </DialogActions> */}
                                          </Dialog>

                                          <IconButton
                                            color="secondary"
                                            aria-label="Edit"
                                            onClick={() =>
                                              handleEditProject(item.project_id)
                                            }
                                          >
                                            <i class="ri-pencil-fill"></i>
                                          </IconButton>
                                          <IconButton
                                            color="secondary"
                                            aria-label="Delete"
                                            onClick={(id) =>
                                              onDelete(item.project_id)
                                            }
                                          >
                                            <i class="ri-delete-bin-fill"></i>{" "}
                                          </IconButton>

                                          <p>{item.project_name}</p>
                                          <p>{item.description}</p>
                                          <p>{item.add_link}</p>
                                        </Typography>
                                        <Typography
                                          variant="h5"
                                          component="div"
                                        ></Typography>
                                        <Typography
                                          sx={{}}
                                          color="text.secondary"
                                        ></Typography>
                                        <Typography variant="body2"></Typography>
                                      </CardContent>
                                      <CardActions>
                                        <Button size="small"></Button>
                                      </CardActions>
                                    </Card>
                                  </CardContent>
                                ))}</>):(<Box sx={{ width: "100%" }}>
                                            
                                            
                                            
                                            
                                            
                                            
                                            
                                            
                                            
                                            
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
