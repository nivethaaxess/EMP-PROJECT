
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
import Brightness1Icon from '@mui/icons-material/Brightness1';
import { ListItemIcon } from '@mui/material';

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
import DialogContentText from '@mui/material/DialogContentText';

import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import DoneIcon from '@mui/icons-material/Done';

import EditIcon from '@mui/icons-material/Edit';
import { width } from "@mui/system";
import AddCircleIcon from '@mui/icons-material/AddCircle';





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
  const [checkBox_val1, setCheckBox_Val1] = useState(['BASIC', 'ADVANCE', 'INTERMEDIATE', 'PROJECT', 'OTHERS'])
  const [domainAndCourse, setdomainAndCourse] = useState([]);

  const [editedItem, setEditedItem] = useState(null);

  const [course_Change, setcourse_Change] = useState('');

  const [courseUpdate_check, setcourseUpdate_check] = useState('')

  const [stored_domain_course, setstored_domain_course] = useState('');

  const [insertCheck, setInsertCheck] = useState('');

  const [getSubTopics, setgetSubTopics] = useState([]);

  const [courseLevel, setCourseLevel] = useState([]);

  const [selectLevel, setSelectLevel] = useState('')
  const [selectcourse, setSelectcourse] = useState('')


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

  const [tabCheck, setTabCheck] = useState('');


  const [expanded, setExpanded] = useState(null);

  const [subTopicexpanded, setsubTopicexpanded] = useState(null);


  const [popOpen, setpopOpen] = useState(false);
  const [addSubTopic, setAddSubTopic] = useState('');

  const [addLink, setAddLink] = useState('');

  const [reloadStatus, setReloadSatus] = useState('');

  const [editedIndex, setEditedIndex] = useState(-1);
  const [editedValue, setEditedValue] = useState('');
  const [subCourse_edited, setsubCourse_edited] = useState('');

  const handleEditClick1 = (index, value) => {
    setEditedIndex(index);
    // setsubCourse_edited(value);
  };

  const handleSaveClick1 = (value, index, level) => {
    const updatedSubTopics = [...getSubTopics];
    updatedSubTopics[index] = subCourse_edited;
    setgetSubTopics(updatedSubTopics);
    setEditedIndex(-1);
    console.log('subCourse_edited===>>>>', subCourse_edited);
    console.log('value===>>>>', value);
    console.log('level===>>>>', level);
    const data = {
      SubTopic: subCourse_edited,
      Id: value
    }
    axios.post('http://localhost:3007/api/subTopics/edit', data)
      .then(val => {
        console.log('VAL===>>>', val)
        openStates(level)
      })
      .catch(err => console.log('err===>>>', err));
    setsubCourse_edited('')
  };

  const handleCancelClick = () => {
    setEditedIndex(-1);
  };

  const handleInputChange1 = (event) => {
    console.log('event.target.value===>>', event.target.value);
    setsubCourse_edited(event.target.value);
  };



  const subTopicsAdd = () => {
    console.log('addSubTopic+>>>>>>>>>>>>>', addSubTopic);
    console.log('addLink+>>>>>>>>>>>>>', addLink);
    console.log('selectcourse+>>>>>>>>>>>>>', selectcourse)
    console.log('selectLevel+>>>>>>>>>>>>>', selectLevel)

    const data = {
      addSubTopic,
      addLink,
      selectcourse,
      selectLevel
    }

    axios.post('http://localhost:3007/api/subTopics/add', data)
      .then(val => {
        console.log('val===>>>>', val)
        const data = val.data;
        console.log('data33333333333===>>>>', data)
        setReloadSatus(data)
        openStatus(selectLevel)
        setAddSubTopic('');
        setAddLink('');
      })
      .catch(err => console.log('err===>>>', err));




  }


  // useEffect(()=>{
  //   openStatus()
  //   console.log('DINESH');
  // },[reloadStatus])

  const handleDialogOpen = (val) => {
    console.log('val+>>>>>>>>>>>>>', val);
    console.log('selectcourse+>>>>>>>>>>>>>', selectcourse)
    console.log('selectLevel+>>>>>>>>>>>>>', selectLevel)
    setpopOpen(true);
  };

  const handleDialogClose = () => {
    setpopOpen(false);
  };

  // const addSubCourse = (event) => {
  //   setInputValue(event.target.value);
  // };




  const handleTabChange = (event, newValue) => {
    console.log('newValue===>>>', newValue)
    setActiveTab(newValue);

    if (newValue == 1) {
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

  useEffect(() => {
    axios.get('http://localhost:3007/api/domain')
      .then(val => {
        const getData = val.data
        console.log('getData==>>>', getData);
        setAutoFil(getData);
        setData(getData)
      })
      .catch(err => console.log('err===>>>', err));


  }, []);




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
    console.log('checkBox_val1==========>>>>>>>>', checkBox_val1);

    const data = {
      course_chooseDomain1,
      addCourse1,
      checkBox_val1
    }

    axios.post('http://localhost:3007/api/course/add', { data })
      .then(val => {
        console.log('val=>>>>>>>>>>>', val)
      })
      .catch(err => console.log('err=>>>>>>>>>>>', err))

    setcourse_chooseDomain('')
    setAddCourse('')
    setstored_domain_course('update')
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

  useEffect(() => {

    console.log('DONE');

    axios.get('http://localhost:3007/api/domai/course')
      .then(val => {
        const data = val.data;
        setdomainAndCourse(data)
        console.log('val===>>>', val);
        console.log('DINESH===>>>>>')
      })
      .catch(err => console.log('err', err))

  }, [stored_domain_course])

  const handleEdit = (index) => {
    setEditedItem(index);
  };

  const handleSave = (Id) => {
    console.log('ID+++>>>>', Id);
    console.log('course_Change===>>>>', course_Change)

    const response = axios.put(`http://localhost:3007/api/course/update/${Id}`, { course_name: course_Change })
      .then(val => {
        setcourseUpdate_check(val.data)
        setstored_domain_course('Upadate')
      })
      .catch(err => err)

    console.log('Updated Data:', response.data);

    setEditedItem(null);
    // You can update the data in the state or send the updated data to the server here.
  };

  useEffect(() => {
    // window.location.reload();
    console.log('DINESH')
    console.log('courseUpdate_check==>>>', courseUpdate_check)

    axios.get('http://localhost:3007/api/level/list')
      .then(val => {
        console.log('val0000===>>>>', val);
        const getData = val.data.map((val, i) => val.LEVEL)
        console.log('DATA55555==>>>', getData);
        setCheckBox_Val(getData)
      })
      .catch(err => console.log('err===>>>', err))


  }, [tabCheck])

  const changeCourse = (val) => {
    console.log('Val==>>>', val.target.value)
    setcourse_Change(val.target.value)
  }


  // const handleAccordionChange = (val) =>{

  //   console.log(val)
  //   setExpanded(val)


  // }


  const handleAccordionChange = (course) => (event, isExpanded) => {
    console.log('course==>>>>', course);
    console.log('isExpanded==>>>>', isExpanded);
    console.log('event==>>>>', event);
    setExpanded(isExpanded ? course : null);
    setsubTopicexpanded(false)

    const data = {
      course
    }

    if (isExpanded) {
      axios.post('http://localhost:3007/api/course/level', data)
        .then(val => {
          console.log('val====>>>>', val)
          const data = val.data;
          console.log('data===>>>>', data);
          setCourseLevel(data);
        })
        .catch(err => console.log('err===>>>', err))
    }
  };


  const openStatus = (level) => {

    const course = expanded;
    console.log('level==>>>>', level);
    console.log('Domain==>>>>', course);

    setSelectcourse(course)
    setSelectLevel(level)

    const data = {
      level, course
    }

    axios.post('http://localhost:3007/api/get/subTopics', data)
      .then(val => {

        const GetSubTopic = val.data;
        console.log('GetSubTopic==>>>>', GetSubTopic);
        setgetSubTopics(GetSubTopic);
      })
      .catch(err => console.log('err===>>>', err))

    setsubTopicexpanded(level)

  }

  const add_SubTopics = (e) => {
    setAddSubTopic(e.target.value)
  }

  const add_Link = (e) => {
    setAddLink(e.target.value)
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
                        endAdornment={<InputAdornment position="end"><DoneIcon  onClick={domainInsert} disabled={addDomainTab === ''} sx={{ cursor: 'pointer', color: addDomainTab == '' ? '' : '#40c463' }} /></InputAdornment>}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                          'aria-label': 'weight',
                        }}
                      />



                    </FormControl>


                    {console.log('DomainListTab=>>>>>>>>>', DomainListTab)}
                    <Box sx={{ marginLeft: '17%', marginBottom: '30px' }}>
                      {data.map((domain) => (
                        <div key={domain.domain_id}>
                          {domain.editing ? (
                            <TextField
                              sx={{ marginTop: '10px', marginLeft: '70px' }}
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
                            <DoneIcon sx={{ marginLeft: '20px', marginTop: '14px', color: '#5e1acc', cursor:'pointer',color:'#40c463' }} onClick={() => handleSaveClick(domain.domain_id)} />
                          ) : (
                            // <Button onClick={() => handleEditClick(domain.domain_id)} variant="contained" color="secondary">
                            //   Edit
                            // </Button>

                            <EditIcon sx={{ marginLeft: '20px', marginTop: '14px', color: '#5e1acc' , cursor:'pointer' }} onClick={() => handleEditClick(domain.domain_id)} />

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
                        endAdornment={<InputAdornment position="end"><DoneIcon sx={{color:'#40c463'}} onClick={InsertChoose} /></InputAdornment>}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                          'aria-label': 'weight',
                        }}
                      />

                      <Box display="flex" alignItems="center" flexWrap="wrap">


                        {checkBox_val1?.map((val, index) => (
                          // {checkBox_val.map((val, index) => (
                          <Box >
                            {/* <p>{val}</p> */}
                            <FormGroup sx={{ maxWidth: '90px', marginLeft: '55px' }}>
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
                                  <Box sx={{ marginLeft: '120px', width: '100%' }}>
                                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginLeft: '33px', marginBottom: '10px' }}>
                                        <TextField
                                          size="small"
                                          type="text"
                                          value={course_Change}
                                          onChange={changeCourse}
                                        />
                                        <DoneIcon sx={{ marginLeft: '10px', cursor: 'pointer',color:'#40c463' }} onClick={() => handleSave(item.topic_id)} />
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
                                        <EditIcon sx={{ cursor: 'pointer', color: '#5e1acc' }} onClick={() => handleEdit(index)} />
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
                <Button sx={{
                  backgroundColor: '#5e1acc',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#5e1acc', // Set the hover background color to the same as the normal background color
                  },
                }} variant="outlined" onClick={handleClickOpen}>
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

          {/* <Button onClick={handleDialogOpen}>Open Dialog</Button> */}

          <Dialog maxWidth="sm" // Set the maximum width of the dialog
            PaperProps={{ style: { width: '29%', height: '400px', display: 'flex', alignItems: 'center' } }} open={popOpen} onClose={handleDialogClose}>
            {/* <DialogTitle>SELECTED COURSE </DialogTitle> */}
            {/* <DialogTitle>{selectcourse}</DialogTitle> */}
            <DialogContent >

              {/* <DialogContentText sx={{color:'black',fontSize:'20px',display:'flex',justifyContent:'flex-end'}}>
        <CloseIcon onClick={handleDialogClose} />
          </DialogContentText> */}
              <DialogContentText sx={{ color: 'black', fontSize: '20px', display: 'flex', justifyContent: 'center' }}>
                SELECTED COURSE
              </DialogContentText>
              <DialogContentText sx={{ color: 'black', fontSize: '20px', marginTop: '5px', display: 'flex', justifyContent: 'center' }}>
                {selectcourse}
              </DialogContentText>
              <DialogContentText sx={{ color: 'black', fontSize: '20px', display: 'flex', justifyContent: 'center' }}>
                SELECTED LEVEL
              </DialogContentText>
              <DialogContentText sx={{ color: 'black', fontSize: '20px', marginTop: '5px', display: 'flex', justifyContent: 'center' }}>
                {selectLevel}
              </DialogContentText>
              <DialogContentText sx={{ color: 'black', fontSize: '20px', display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
                {/* <TextField onChange={(e) => setAddSubTopic(e.target.value)} size="small" fullWidth label="ADD SUB TOPICS" id="fullWidth" /> */}
                <TextField value={addSubTopic} onChange={add_SubTopics} size="small" fullWidth label="ADD SUB TOPICS" id="fullWidth" />
              </DialogContentText>
              <DialogContentText sx={{ color: 'black', fontSize: '20px', marginTop: '15px', display: 'flex', justifyContent: 'center' }}>
                {/* <TextField onChange={(e) => setAddLink(e.target.value)} size="small" fullWidth label="ADD LINK" id="fullWidth" /> */}
                <TextField value={addLink} onChange={add_Link} size="small" fullWidth label="ADD LINK" id="fullWidth" />
              </DialogContentText>
              <DialogContentText sx={{ color: 'black', fontSize: '20px', marginTop: '15px', display: 'flex', justifyContent: 'center' }}>
                <Button onClick={subTopicsAdd} variant="contained" size="small">ADD</Button>
              </DialogContentText>
              {/* <input type="text" value={inputValue} onChange={handleInputChange} /> */}
            </DialogContent>
            {/* <DialogActions>
          <Button onClick={handleDialogClose}>Close</Button>
        </DialogActions> */}
          </Dialog>


        </AccordionDetails>
        <Box sx={{ marginTop: '30px' }}>
          {DomainList.map((course, i) => {
            return (
              <Box >
                <Accordion >
                  <Accordion

                    expanded={expanded === course}
                    onChange={handleAccordionChange(course)}
                    key={i}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className="level-check" style={{ display: "flex", alignItems: "center" }}>
                        <FaHtml5 style={icon} className="FaHtml5" />
                        {course}
                      </Typography>
                    </AccordionSummary>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        // flexWrap: 'wrap', // Wrap accordions to the next line if necessary
                        gap: '6px', // Spacing between accordions
                      }}
                    >
                      {courseLevel?.map((item, index) => (
                        <div key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Accordion
                            expanded={subTopicexpanded === item}
                            sx={{ margin: 0 }}>
                            <AccordionSummary
                              sx={{
                                border: '2px solid #c55c16',
                                borderRadius: '15px',
                                display: 'flex',
                                height: '2px'
                                // alignItems: 'center',
                                // margin: 0,
                              }}
                              expandIcon={<ExpandMoreIcon sx={{ marginLeft: '10px' }} />}
                              onClick={() => openStatus(item, index)}
                            // onClick={() => handleOpenstatus(item, index)}
                            >
                              <Typography
                                sx={{
                                  // backgroundColor: '#c55c16',
                                  borderRadius: '15px',
                                  // padding:'1px',
                                  //  width:'80px'
                                  // p: 1, // Add some padding to the Typography component
                                }}
                              >
                                {item}
                              </Typography>
                              <AddCircleIcon onClick={() => handleDialogOpen(item, index)} sx={{ marginLeft: '30px' }} />
                            </AccordionSummary>

                            <AccordionDetails>
                              <List >
                                {getSubTopics.map((item1, index) => (

                                  <ListItem key={index} component="li">
                                    {editedIndex === index ? (
                                      <>
                                        <TextField
                                          value={subCourse_edited}
                                          onChange={handleInputChange1}
                                          size="small"
                                        // sx={{width:'70px'}}
                                        />

                                        <DoneIcon sx={{ marginLeft: '10px', fontSize: '15px', color: '#40c463', cursor:'pointer' }} onClick={() => handleSaveClick1(item1.subTopic_id, index, item)} />
                                        {console.log('item====>>>>>', item1)}  
                                      </>
                                    ) : (
                                      <>
                                        {/* <ListItemText
                                        sx={{ cursor: 'pointer' , backgroundColor:'red' }}
                                        primary={item.subtopic_name}
                                        onClick={() => handleEditClick1(index, item)}
                                      /> */}
                                        {/* <h5>hhhh</h5> */}
                                        <TextField
                                          // sx={{ cursor: 'pointer', fontSize: '3px', }}
                                          
                                          value={item1.subtopic_name}
                                          size="small"
                                        //  onClick={() => handleEditClick1(index, item)}
                                        />

                                        <EditIcon sx={{ fontSize: '15px', marginLeft: '10px', color: '#5e1acc', cursor:'pointer' }} onClick={() => handleEditClick1(index, item1, item)} />
                                      </>
                                    )}
                                  </ListItem>
                                ))}
                              </List>
                            </AccordionDetails>
                          </Accordion>
                        </div>
                      ))}
                    </Box>
                  </Accordion >
                </Accordion>
              </Box>
            );
          })}
        </Box>



      </Box >
    </Box >
  )
}

export default Admin_User_check