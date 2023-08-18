
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
import { useTheme } from '@mui/material/styles';
import Chip from '@mui/material/Chip';


const useStyles = makeStyles((theme) => ({
  borderedBox: {
    border: '1px solid black',
    padding: theme.spacing(2),
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




  const [getadminusername, setadminusername] = useState([]);
  const [getadminpassword, setAdminPassword] = useState([]);

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
    const {
      target: { value },
    } = event;
     setDomainname(
       // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
     )
  }
console.log("use")
  const handleUserChange = (event) => {
    setusername(event.target.value)
    // setadminusername(event.target.value)
  }

  const handlePassChange = (e) => {
    setpassword(e.target.value)
    // setAdminPassword(e.target.value)

  }

  const handleRegister = (e) => {
    console.log('Register111111111');
    e.preventDefault();
    console.log('Register');
    const data =
    {
      "firstName": getfirstname,
      "lastName": getlastname,
      "email": getemail,
      "password": getsignupassword,
      "role": getrole,
      "domainName": getdomainname

    }
    console.log("data inserted");

    axios.post('http://localhost:3007/insertusers', data)
      .then(response => {
        console.log('res', response.data);
        setLoginApi(response.data);

      })
      .catch(err => console.log("insert err", err))
  }
  useEffect(() => {
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


  const handleSignup = () => {
    console.log('successfully');
    dialogSetOpen(true)
  }

  const handleClose = () => {
    dialogSetOpen(false)
  }




  return (


   
    <FormControl sx={{width:'40vw',border:'1px',marginLeft  :'317px'}}>
     <TextField
        color="warning"
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
        color="warning"
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
        color="warning"
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
        color="warning"
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
        color="warning"
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
      <Select
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        multiple
        value={getdomainname}
        onChange={onchangeDomain}
        // input={<OutlinedInput id="select-multiple-chip" label="DOMAIN" />}
        variant="filled"
        disableUnderline={false}
        fullWidth
        margin="normal"
        required
        inputProps={{ maxLength: 10 }}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
       
      >
        {console.log('getitem', getsignupapi)}
        {getsignupapi.map((item, index) => (
          //  console.log('getsignup',getsignupapi)
          <MenuItem key={index} value={item.domain_name} style={getStyles(item.domain_name, getdomainname, theme)}>
            {item.domain_name}
          </MenuItem>
        ))}
      </Select>

      <Button onClick={handleRegister}>Register</Button>


    </FormControl>
    
  )
}

export default Userdata


