
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
import TextField from '@mui/material/TextField';
// import "./user.css";
import './Admin_user.css'
import Grid from "@mui/material/Grid";
import Item from "@mui/material/Grid";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";

import Autocomplete from '@mui/material/Autocomplete';
import axios from "axios";

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';


import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import DoneIcon from '@mui/icons-material/Done';

import EditIcon from '@mui/icons-material/Edit';






const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 }
]

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

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

const Admin_User_check = ({ toggleDrawer }) => {
  const [openStates, setOpenStates] = useState({});
  const [DomainList, setDomainList] = useState([]);
  const [DomainListTab, setDomainListTab] = useState([])
  const [domain, setDomain] = useState('');

  const [tabDomain, setTabDomain] = useState('')
  const [addDomainTab, setAddDomainTab] = useState('')

  const [selectedOption, setSelectedOption] = useState('');

  const [data, setData] = useState([]);

  const [editDomain, setEditDomain] = useState(false);

  const [editableDomain, setEditableDomain] = useState('');

  const [course_chooseDomain1, setcourse_chooseDomain] = useState('')

  const [addCourse1, setAddCourse] = useState('');

  const [checkBox_val, setCheckBox_Val] = useState([])
  const [domainAndCourse, setdomainAndCourse] = useState([]);

  const [editedItem, setEditedItem] = useState(null);

  const [course_Change, setcourse_Change] = useState('');

  const [courseUpdate_check,setcourseUpdate_check] = useState('')

  const [stored_domain_course , setstored_domain_course] = useState('');

  const [insertCheck , setInsertCheck] = useState('')


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

  const [autoFill, setAutoFil] = useState([])

  const [tabValues, setTabValues] = useState({});

  const [open, setOpen] = useState(false);

  const [activeTab, setActiveTab] = useState(0);

  const [tabCheck,setTabCheck] = useState('')

  const handleTabChange = (event, newValue) => {
    console.log('newValue===>>>',newValue)
    setActiveTab(newValue);

    if(newValue == 1){
      setTabCheck('Update')
      setstored_domain_course('Updated')
    }


    // axios.get('http://localhost:3007/api/level/list')
    //   .then(val => {
    //     console.log('val0000===>>>>', val);
    //     const getData = val.data.map((val, i) => val.LEVEL)
    //     console.log('DATA55555==>>>', getData);
    //     setCheckBox_Val(getData)
    //   })
    //   .catch(err => console.log('err===>>>', err))
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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

  // useEffect(() => {
  //   axios.get('http://localhost:3007/api/domain')
  //     .then(val => {
  //       const getData = val.data
  //       console.log('getData==>>>', getData);
  //       setAutoFil(getData);
  //       setData(getData)
  //     })
  //     .catch(err => console.log('err===>>>', err));


  // }, []);




  useEffect(() => {
    // Initialize tabValues when courseList changes
    if (DomainList.length > 0) {
      const initialTabValues = {};
      DomainList.forEach((course) => {
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
  }, [DomainList]);



  const domainChoose = (event) => {
    setDomain(event.target.value);
    const data = {
      domain: event.target.value
    }
    console.log('data===>>>>', data);
    axios.post('http://localhost:3007/api/select/domain', data)
      .then(val => {
        const getData = val.data
        const convertedArray = getData.map((item) => item.topic_name);

        console.log(convertedArray);

        setDomainList(convertedArray)

      })
      .catch(err => console.log('err=>', err));
  };


  const addDomain = (val) => {
    setAddDomainTab(val);


    console.log('VALUE++++===>>>', val);
  }

  const domainInsert = () => {

    const data = {
      data: addDomainTab
    }

    axios.post('http://localhost:3007/api/domain/Insert', { data })
      .then(val => console.log('val===>>>', setInsertCheck(val)))
      .catch(err => console.log('err===>>>', err))
    console.log('addDomainTab==>>>', addDomainTab)
    setAddDomainTab('')
  }


  useEffect(() => {
    axios.get('http://localhost:3007/api/domain')
      .then(val => {
        const getData = val.data
        console.log('getData==>>>', getData);
        setAutoFil(getData);
        setData(getData)
      })
      .catch(err => console.log('err===>>>', err));


  }, [insertCheck]);

  // useEffect(()=>{

  // },[])

  const course_chooseDomain = (val) => {

    setcourse_chooseDomain(val)
    console.log('val===>>>>', val);

  }

  const addCourse = (e) => {

    const getCourse = e.target.value
    setAddCourse(getCourse)

    console.log('getCourse==>>>', getCourse);
  }


  const InsertChoose = () => {

    console.log('course_chooseDomain1===>>>>>', course_chooseDomain1);
    console.log('addCourse1===>>>>>', addCourse1)
    console.log('checkBox_val', checkBox_val);

    const data = {
      course_chooseDomain1,
      addCourse1,
      checkBox_val
    }

    axios.post('http://localhost:3007/api/course/add', { data })
      .then(val => {
        console.log('val=>>>>>>>>>>>', val)
      })
      .catch(err => console.log('err=>>>>>>>>>>>', err))

      setcourse_chooseDomain('')
      setAddCourse('')
      setstored_domain_course('')
  }

  const GetDomain_Course = () => {

  }

  const levelSelect = (event) => {
    console.log('event.checked===>>>>>', event.target.checked)
    console.log('event.target.value===>>>>>', event.target.value)

  }




  const handleEditClick = (domainId) => {
    // Find the domain by domain_id and enable editing
    setData((prevData) =>
      prevData.map((domain) =>
        domain.domain_id === domainId ? { ...domain, editing: true } : domain
      )
    );

    setEditDomain(true)
  };

  const handleSaveClick = (domainId) => {

    try {

      console.log('domainId=>>>>>', domainId);

      console.log('editDoamin=>>>>>', editableDomain);

      setData((prevData) =>
        prevData.map((domain) =>
          domain.domain_id === domainId ? { ...domain, editing: false } : domain
        )


      );

      // Here, you can send the updated data to the backend or perform further actions
      // For simplicity, we are just printing the updated data to the console
      setEditDomain(false)
      const updatedDomain = data.find((domain) => domain.domain_id === domainId);
      console.log('Updated Domain:', updatedDomain);

      const domain_id = updatedDomain.domain_id;

      console.log('domain_id:', domain_id);

      const domain_name = updatedDomain.domain_name

      console.log('domain_name:', domain_name);

      const response = axios.put(`http://localhost:3007/api/domai/update/${domain_id}`, { domain_name: domain_name });

      console.log('Updated Data:', response.data);

    }

    catch (err) {
      console.log('ERROR++>>>', err)

    }
    // Find the domain by domain_id and save the updated value




  };

  const handleInputChange = (event, domainId) => {
    // Update the edited value in the state

    console.log('event.target.value=====>>>>>>>>>.', event.target.value);

    const editDomain = event.target.value

    setEditableDomain(editDomain)

    setData((prevData) =>
      prevData.map((domain) =>
        domain.domain_id === domainId ? { ...domain, domain_name: event.target.value } : domain
      )
    );
  };


  const domain_course = () => {

    // axios.get('http://localhost:3007/api/domai/course')
    //   .then(val => {
    //     const data = val.data;
    //     setdomainAndCourse(data)
    //     console.log('val===>>>', val)
    //   })
    //   .catch(err => console.log('err', err))

  }

  useEffect(()=>{

    console.log('DONE');

    axios.get('http://localhost:3007/api/domai/course')
    .then(val => {
      const data = val.data;
      setdomainAndCourse(data)
      console.log('val===>>>', val)
    })
    .catch(err => console.log('err', err))
  
  },[stored_domain_course])

  const handleEdit = (index) => {
    setEditedItem(index);
  };

  const handleSave = (Id) => {
    console.log('ID+++>>>>',Id);
    console.log('course_Change===>>>>',course_Change)

    const response = axios.put(`http://localhost:3007/api/course/update/${Id}`, { course_name: course_Change })
        .then(val=>{
          setcourseUpdate_check(val.data)
          
        })
        .catch(err=>err)

      console.log('Updated Data:', response.data);

    setEditedItem(null);
    // You can update the data in the state or send the updated data to the server here.
  };

  useEffect(()=>{
    // window.location.reload();
       console.log('DINESH')
       console.log('courseUpdate_check==>>>',courseUpdate_check)

       axios.get('http://localhost:3007/api/level/list')
       .then(val => {
         console.log('val0000===>>>>', val);
         const getData = val.data.map((val, i) => val.LEVEL)
         console.log('DATA55555==>>>', getData);
         setCheckBox_Val(getData)
       })
       .catch(err => console.log('err===>>>', err))


  },[tabCheck])

  const changeCourse = (val) => {
    console.log('Val==>>>', val.target.value)
    setcourse_Change(val.target.value)
  }


  return (
    <Box sx={{
      flexGrow: 1,
      width: "83vw",
      margin: "0 auto",
    }}>
      <Box>


        <AccordionDetails>



          <Box >


            <BootstrapDialog
              onClose={handleClose}
              aria-labelledby="customized-dialog-title"
              open={open}

            >
              {/* <BootstrapDialogTitle sx={{padding:'30px'}} id="customized-dialog-title" onClose={handleClose}>
          FORM
        </BootstrapDialogTitle> */}
              <Tabs value={activeTab} onChange={handleTabChange} centered>
                <Tab label="DOMAIN" />
                <Tab label="COURSE" />

              </Tabs>
              <Box>
                {/* Content for each tab */}
                {activeTab === 0 &&

                  <Box>
                    <FormControl sx={{ m: 4, width: '60ch' }} variant="outlined">
                      <OutlinedInput
                        onChange={(e) => { addDomain(e.target.value) }}
                        size="small"
                        id="outlined-adornment-weight"
                        placeholder="ADD DOMAIN"
                        value={addDomainTab}
                        endAdornment={<InputAdornment position="end"><DoneIcon onClick={domainInsert} disabled={addDomainTab === ''} sx={{ cursor: 'pointer', color: addDomainTab == '' ? '' : 'green' }} /></InputAdornment>}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                          'aria-label': 'weight',
                        }}
                      />



                    </FormControl>


                    {console.log('DomainListTab=>>>>>>>>>', DomainListTab)}
                    <Box sx={{marginLeft:'17%', marginBottom:'30px'}}>
                      {data.map((domain) => (
                        <div key={domain.domain_id}>
                          {domain.editing ? (
                            <TextField
                              sx={{  marginTop: '10px' }}
                              value={domain.domain_name}
                              onChange={(event) => handleInputChange(event, domain.domain_id)}
                              variant="outlined"
                              size="small"
                            />
                          ) : (
                            <TextField
                              value={domain.domain_name}
                              // onChange={(event) => handleInputChange(event, domain.domain_id)}
                              variant="outlined"
                              size="small"
                              sx={{ marginLeft: '70px', marginTop: '10px' }}
                            />
                          )}

                          {domain.editing ? (
                            // <Button onClick={() => handleSaveClick(domain.domain_id)} variant="contained" color="primary">
                            //   Save
                            // </Button>
                            <DoneIcon sx={{ marginLeft: '20px', marginTop: '14px' }} onClick={() => handleSaveClick(domain.domain_id)} />
                          ) : (
                            // <Button onClick={() => handleEditClick(domain.domain_id)} variant="contained" color="secondary">
                            //   Edit
                            // </Button>

                            <EditIcon sx={{ marginLeft: '20px', marginTop: '14px' }} onClick={() => handleEditClick(domain.domain_id)} />

                          )}
                        </div>
                      ))}
                    </Box>


                  </Box>




                }
                {activeTab === 1 && <Box>

                  <Box>
                    <FormControl sx={{ m: 4, width: '60ch' }} variant="standard" size="small">

                      <InputLabel id="demo-simple-select-standard-label">CHOOSE DOMAIN</InputLabel>
                      <Select
                        displayEmpty
                        size="small"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={course_chooseDomain1}
                        label="Age"
                        onChange={(e) => { course_chooseDomain(e.target.value) }}
                      >
                        {autoFill.map((option, index) => (
                          <MenuItem key={index} value={option.domain_name}>
                            {option.domain_name}
                          </MenuItem>
                        ))}
                      </Select>

                      <OutlinedInput
                        sx={{ marginTop: '20px', cursor: 'pointer' }}
                        size="small"
                        id="outlined-adornment-weight"
                        placeholder="ADD COURSE"
                        onChange={addCourse}
                        value={addCourse1}
                        endAdornment={<InputAdornment position="end"><DoneIcon onClick={InsertChoose} /></InputAdornment>}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                          'aria-label': 'weight',
                        }}
                      />

                      <Box display="flex" alignItems="center" flexWrap="wrap">


                        {checkBox_val.map((val, index) => (
                          <Box >
                            {/* <p>{val}</p> */}
                            <FormGroup sx={{ maxWidth: '90px', marginLeft: '10px' }}>
                              {/* <FormControlLabel control={<Checkbox defaultChecked />} label={val} /> */}
                              <FormControlLabel onChange={levelSelect} size="small" sx={{ fontSize: '12px' }} control={<Checkbox defaultChecked />} label={<span style={{ fontSize: '12px' }}>{val}</span>} />
                              {/* <FormControlLabel  onChange={levelSelect}   required control={ <Checkbox defaultChecked  value={val}/>} label={val} /> */}

                            </FormGroup>
                          </Box>




                        ))}

                      </Box>

                      {/* <Box>
                        <Button onClick={domain_course}>UPDATE</Button>
                      </Box> */}

<Box>
  <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse' }}>
    <thead>
      <tr>
        <th style={{ border: '1px solid #ccc', padding: '8px' }}>Domain Name</th>
        <th style={{ border: '1px solid #ccc', padding: '8px' }}>Topic Name</th>
        <th style={{ border: '1px solid #ccc', padding: '8px' }}>Actions</th>
      </tr>
    </thead>
    <tbody>
      {domainAndCourse.map((item, index) => (
       
        <tr key={index} sx={{ borderBottom: '1px solid #ccc' }}>
          {editedItem === index ? (
             <Box sx={{marginLeft:'120px' , width:'100%'}}>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginLeft: '33px', marginBottom: '10px' }}>
                <TextField
                  size="small"
                  type="text"
                  value={course_Change}
                  onChange={changeCourse}
                />
                <DoneIcon sx={{ marginLeft: '10px', cursor: 'pointer' }} onClick={() => handleSave(item.topic_id)} />
              </Box>
            </td>
            </Box>
          ) : (
            <>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                  <Typography>{item.domain_name}</Typography>
                </Box>
              </td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                  <Typography sx={{ marginLeft: '20px' }}>{`  ${item.topic_name}`}</Typography>
                </Box>
              </td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <EditIcon sx={{ cursor: 'pointer' }} onClick={() => handleEdit(index)} />
                </Box>
              </td>
            </>
          )}
        </tr>
      ))}
    </tbody>
  </Box>
</Box>

                      {/* <Autocomplete
                      size="small"
                      placeholder="ADD COURSE"
                        disablePortal
                        id="combo-box-demo"
                        options={top100Films}
                        sx={{ width: 350 , marginTop:'20px' }}
                        renderInput={(params) => <TextField {...params}
                         label='ADD COURSE' />}
                      /> */}

                    </FormControl>
                  </Box>
                  <Box>

                  </Box>

                </Box>

                }

              </Box>
              {/* <Button id="customized-dialog-title" onClose={handleClose}>
                SAVE
              </Button> */}
            </BootstrapDialog>


            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ marginLeft: '45%' }}>
                <Button variant="outlined" onClick={handleClickOpen}>
                  OPEN POPUP
                </Button>
              </Box>
              <FormControl variant="standard" size="small" sx={{ width: '20%', marginLeft: '20%' }}>
                <InputLabel id="demo-simple-select-standard-label">CHOOSE DOMAIN</InputLabel>
                <Select
                  displayEmpty

                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={domain}
                  label="Age"
                  onChange={domainChoose}
                >
                  {autoFill.map((option, index) => (
                    <MenuItem key={index} value={option.domain_name}>
                      {option.domain_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>


        </AccordionDetails>
        {DomainList.map((course, i) => {
          return (
            <>
              <Accordion>
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
                  {/* <AccordionDetails>
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
                                        
                                      </CustomTabPanel>
                                      <CustomTabPanel
                                        value={tabValues[course]?.intermediate}
                                        index={1}
                                      >
                                      
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
                                      
                                      </CustomTabPanel>
                                      <CustomTabPanel
                                        value={tabValues[course]?.advanced}
                                        index={1}
                                      >
                                       
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
                  </AccordionDetails> */}
                </Accordion>
              </Accordion>
            </>
          );
        })}



      </Box>
    </Box>
  )
}

export default Admin_User_check