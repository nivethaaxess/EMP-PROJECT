
import { Box, Button, FormControl, Select, TextField ,MenuItem} from '@mui/material'
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
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  borderedBox: {
    border: '1px solid black',
    padding: theme.spacing(2),
  },
}));


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Login = () => {

  const classes = useStyles();
  const navigate = useNavigate();

  const [getusername, setusername] = useState('');
  const [getpassword, setpassword] = useState('');
   
  const [dialogopen,dialogSetOpen] = React.useState(false);

  //signup state

  const [getfirstname, setFirstName] = useState('');
  const  [getlastname, setLastName] = useState('');
  const [getemail, setEmail] = useState('');
  const [getsignupassword, setSignupPassword] = useState('');
  const [getrole,setRole] = useState('');
  const  [getdomainname , setDomainname] = useState('');
//end

//signup api

const [getsignupapi,setSignupapi] = useState([]);
const  [getloginapi ,setLoginApi] = useState([]);




  const [getadminusername, setadminusername] = useState([]);
  const [getadminpassword, setAdminPassword] = useState([]);
  
   const onchangeFirstname = (e)=>
   {
       setFirstName(e.target.value);
   }

   const onchangeLastname = (e)=>
   {
       setLastName(e.target.value);
   }

   const onchangeEmail = (e)=>
   {
      setEmail(e.target.value);
   }

   const onchangePassword = (e)=>
   {
       setSignupPassword(e.target.value)
   }
   const onchangeRole = (e)=>
   {
       setRole(e.target.value);
   }

   const onchangeDomain = (e)=>
   {
       setDomainname(e.target.value);
   }

  const handleUserChange = (event) => {
    setusername(event.target.value)
    // setadminusername(event.target.value)
  }

  const handlePassChange = (e) => {
    setpassword(e.target.value)
    // setAdminPassword(e.target.value)

  }

   const handleRegister = (e) =>
   {
       e.preventDefault();
      console.log('Register');
       const data = 
       {
          "firstName" : getfirstname,
          "lastName" :  getlastname,
          "email" : getemail,
          "password" : getsignupassword,
          "role" : getrole,
          "domainName": getdomainname

      }  
       console.log("data inserted");

      axios.post('http://localhost:3007/insertusers',data)
       .then(response=>{
           console.log('res',response.data);
           setLoginApi(response.data);
        
            })
            .catch(err =>console.log("insert err",err))
  }
  useEffect(()=>{
    axios.get('http://localhost:3007/api/domain')
    .then(response=>{
       console.log('domain', response.data);
        setSignupapi(response.data);
        
    }) 
    .catch(err=>
      {
         console.log('error', err);
      }
      )

  },[getloginapi])
  

  const handleSignup = () => {
     console.log('successfully');
    dialogSetOpen(true)
  }

  const handleClose = () => {
    dialogSetOpen(false)
  }

  useEffect(()=>{

    if(localStorage.getItem('auth')) 
    {
       navigate('/user')
    }
    else if(localStorage.getItem('admin'))
    {
       navigate('/sidebar')
    }
 },)


  const handleLogin = (a) => {
    console.log('login console');   
   axios.post(`http://localhost:3007/api/logindata`,{Email:getusername,Password:getpassword})
    .then(response=>{
        console.log('res',response.data);

        
        const{role,User_Id} = response.data.data;
          console.log('role',role);
            
          if(role ===  'user')
          {
           
            localStorage.setItem('auth',true);
            localStorage.setItem("userId",User_Id)
            navigate('/user');
          }
          else if(role === 'admin')
          { 
            
            localStorage.setItem('admin',true)   
            navigate('/sidebar'); 
          }
          else
          {
             alert("No role specified");
          }
         
        

        
    })  
}


  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh',backgroundImage:"linear-gradient(to right,#885aa5 ,#2876b9 )"}}>
      <Box sx={{ maxWidth: 400,display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center',backgroundImage:"linear-gradient(to right,#88caee ,#3499bd )",height:"500px",borderRadius: "150px 0 0 0" }} >
            <div>
              <div>
                <h1 style={{color:"white"}}>Login</h1>
        <FormControl>
          <TextField value ={getusername} onChange={(event) => handleUserChange(event)} sx={{ mt: 3 }} size="small" id="outlined-basic" label="USERNAME" variant="outlined" />
        </FormControl>
        <FormControl>
          <TextField value = {getpassword} onChange={handlePassChange} sx={{ mt: 3 ,borderWidth:"3px",borderColor:"black",borderRadius:"50%"}} size="small" id="outlined-basic" label="Password" variant="outlined" />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ mt: 3 }}>
              <Button onClick={() => handleLogin('login successfully',)} variant="contained">LOGIN</Button>
            </Box>
            <Box sx={{ mt: 3 }}>
              <Button onClick={handleSignup} variant="contained">SignUp</Button>

            </Box>
          </Box>
          <Dialog
            open={dialogopen}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          > 
            <form onSubmit={handleRegister} >
             <Box sx={{display:'flex',justifyContent:'space-between'}}>
            
            <DialogTitle>Signup Form</DialogTitle>
            <DialogActions>
              <Button onClick={handleClose}> <FontAwesomeIcon icon={['fas', 'circle-xmark']} /></Button>
            </DialogActions>
            </Box>
          
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                               
                  <TextField
                    color="warning"
                    label="First Name"
                    type='text'
                     value = {getfirstname}
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
                    value = {getlastname}
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
                    value = {getemail}
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
                    value ={getsignupassword}
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
                     value = {getrole}
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
                    value={getdomainname}
                    onChange={onchangeDomain}
                    variant="filled"
                    disableUnderline={false}
                    fullWidth
                    margin="normal"
                    required
                    inputProps={{ maxLength: 10 }}

                  > 
                     {console.log('getitem',getsignupapi)}
                    {getsignupapi.map((item, index) => (
                      
                      //  console.log('getsignup',getsignupapi)
                      <MenuItem key={index} value={item.domain_name}>
                        {item.domain_name}
                      </MenuItem>
                    
                    ))}
                  </Select>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button  type='submit'>Register</Button>
            </DialogActions>
            </form>
          </Dialog>

        </FormControl>
        </div>
        </div>
      </Box>
    </Box>
  )
}

export default Login


