
import { Box, Button, FormControl, Select, TextField, MenuItem, Typography } from '@mui/material'
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import OutlinedInput from '@mui/material/OutlinedInput';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import { useTheme } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';




const useStyles = makeStyles((theme) => ({
  borderedBox: {
    border: '1px solid black',
    padding: theme.spacing(2),
  },

  button: {
    borderRadius: '3px',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    transition: 'background-color 0.3s',
},

filledButton: {
  backgroundColor: 'blue',
  marginLeft:'11vw',
  color: 'white',
  '&:hover': {
      backgroundColor: 'darkblue',
  },
},

outlinedButton: {
  border: `2px solid ${theme.palette.primary.main}`,
  color: theme.palette.primary.main,
  '&:hover': {
      border: `2px solid ${theme.palette.primary.dark}`,
      backgroundColor: theme.palette.primary.dark,
      color: 'whitesmoke',
  },
},
disabledButton: {
  backgroundColor: theme.palette.grey[300],
  color: theme.palette.text.disabled,
  marginLeft:'11vw',
  cursor: 'not-allowed',
},

}));
    
 
 
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(domain, getdomainname, theme) {
  return {
    fontWeight:
      getdomainname.indexOf(domain) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Userdata = () => {

  const classes = useStyles();
  const navigate = useNavigate();

  const [getusername, setusername] = useState('');
  const [getpassword, setpassword] = useState('');

  const [dialogopen, dialogSetOpen] = React.useState(false);

  //signup state
  const theme = useTheme();
  const [getfirstname, setFirstName] = useState('');
  const [getlastname, setLastName] = useState('');
  const [getemail, setEmail] = useState('');
  const [getsignupassword, setSignupPassword] = useState('');
  const [getrole, setRole] = useState('');

  const [getdomainname, setDomainname] = useState([]);
  //end

  //signup api

  const [getsignupapi, setSignupapi] = useState([]);
  const [getloginapi, setLoginApi] = useState([]);




  // const [getadminusername, setadminusername] = useState([]);
  // const [getadminpassword, setAdminPassword] = useState([]);

  const onchangeFirstname = (e) => {
    setFirstName(e.target.value);
  }

  const onchangeLastname = (e) => {
    setLastName(e.target.value);
  }

  const onchangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const onchangePassword = (e) => {
    setSignupPassword(e.target.value)
  }
  const onchangeRole = (e) => {
    setRole(e.target.value);
  }

  const onchangeDomain = (event) => {
     setDomainname(event.target.value)
  }
console.log("use")
  // const handleUserChange = (event) => {
  //   setusername(event.target.value)
  //   // setadminusername(event.target.value)
  // }

  // const handlePassChange = (e) => {
  //   setpassword(e.target.value)
  //   // setAdminPassword(e.target.value)

  // }

  const handleRegister = () => {
   
    console.log('register');
    const data = {
      "firstName": getfirstname,
      "lastName": getlastname,
      "email": getemail,
      "password": getsignupassword,
      "role": getrole,
      "domainName": getdomainname
    };
  
    axios.post('http://localhost:3007/insertusers', data)
      .then(response => {
        console.log("help")
        if(response.status === 200){
          console.log('response====>', response.data);
           setLoginApi(response.data);
           toast.success('Register Successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
          
           
        }
        else{
          console.log("err",response)
        }
      
      })
      .catch(err => {
        toast.warn('already email exist!', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
        console.log("insert err", err);
      });
  };
  


  useEffect(() => {
    console.log("http://localhost:3007/api/domain")
    axios.get('http://localhost:3007/api/domain')
      .then(response => {
        console.log('domain', response.data);
        setSignupapi(response.data);
      })
      .catch(err => {
        console.log('error', err);
      }
      )
      
  }, [getloginapi])


  // const handleSignup = () => {
  //   console.log('successfully');
  //   dialogSetOpen(true)
  // }

  // const handleClose = () => {
  //   dialogSetOpen(false)
  // }

   const isRegisterDisabled = (
    getfirstname === '' ||
    getlastname === '' ||
    getemail === '' ||
    getsignupassword === '' ||
    getrole === '' ||
    getdomainname.length === 0
  );




  return (


   
    <FormControl sx={{width:'40vw',border:'2px',marginLeft  :'317px'}}>
     <TextField 
        sx={{backgroundColor:'lightgrey'}}
        color="primary"
        label="First Name"
        type='text'
        value={getfirstname}
        onChange={onchangeFirstname}

        variant="filled"
        fullWidth
        margin="normal"
        required
      />
      <TextField
        sx={{backgroundColor:'lightgrey'}}
        color="primary"
        label="Last Name"
        type="text"
        value={getlastname}
        onChange={onchangeLastname}
        variant="filled"
        fullWidth
        margin="normal"
        required
      />
      <TextField
        sx={{backgroundColor:'lightgrey'}}
        color="primary"
        label="Email"
        type="Email"
        value={getemail}
        onChange={onchangeEmail}
        variant="filled"
        disableUnderline={false}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        sx={{backgroundColor:'lightgrey'}}
        color="primary"
        label="password"
        type="password"
        value={getsignupassword}
        onChange={onchangePassword}
        variant="filled"
        disableUnderline={false}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        sx={{backgroundColor:'lightgrey'}}
        color="primary"
        label="Role"
        type="text"
        value={getrole}
        onChange={onchangeRole}
        variant="filled"
        disableUnderline={false}
        fullWidth
        margin="normal"
        required
        inputProps={{ maxLength: 10 }}
      />
      {/* <TextField
                    color="warning"
                    label="domainName"
                    type="text"
                     value = {getdomainname}
                     onChange={onchangeDomain}
                    variant="filled"
                    disableUnderline={false}
                    fullWidth
                    margin="normal"
                    required
                    inputProps={{ maxLength: 10 }}
                  /> */}
            <FormControl variant="filled" fullWidth margin="normal" required  sx={{backgroundColor:'lightgrey'}}
          color="primary">
      <InputLabel id="demo-simple-select-filled-label">Domain</InputLabel> 
       
      <Select
         
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
         
          label="Domain"
        value={getdomainname}
        onChange={onchangeDomain}
        variant="filled"
        disableUnderline={false}
        fullWidth
        margin="normal"
        required
       
      >
        {console.log('getitem', getsignupapi)}
        {getsignupapi.map((item, index) => (
          //  console.log('getsignup',getsignupapi)
          <MenuItem key={index} value={item.domain_name}>
            {item.domain_name}
          </MenuItem>
        ))}
      </Select>
<<<<<<< HEAD
      </FormControl>
      <Box className={`${classes.button} ${isRegisterDisabled ? classes.disabledButton : (getfirstname && getlastname && getemail && getsignupassword && getrole && getdomainname.length > 0) ? classes.filledButton : classes.outlinedButton}`}>
            <Button style={{color:'whitesmoke'}} onClick={handleRegister} disabled={isRegisterDisabled}>
                Register
            </Button>
        </Box>
     </FormControl>
=======

      <Button onClick={handleRegister}>Register</Button>


    </FormControl>
>>>>>>> 53bef5dd2cc1cbdb693ca00d7b78f4cf5da843b4
    
  )   
}

export default Userdata


