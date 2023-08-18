import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl } from '@mui/material';
import axios from 'axios';

const Userchange = () => {

      const [getchangeapi,setChangeApi] = useState([]) 
      const [getfirstname,setLastName] =useState('');
      const  [getemail,setEmail] = useState('');
      const [open, setOpen] = React.useState(false);
      const [getchangepassword,setChangePassword] = useState('');
      const [getconfirmpassword,setConfirmPassword] = useState('');
      const [getuserid,setuserid] = useState('')


        
      const handleClose = () => {
        setOpen(false);
      };
    

       const handleNameChange = (event)=>
       {
          setLastName(event.target.value)
       }

       const handleEmailChange =(event)=>
       {
         setEmail(event.target.value);
       }

       const handleChangePassword =(event)=>
       {
           setChangePassword(event.target.value)
       }

       const handleConfirmPassword=(event)=>
       {
           setConfirmPassword(event.target.value)
       }

      const handlerChange = ()=>    
      {  
        
         const data = 
         {
            "First_name" : getfirstname,
            "Email" :  getemail
         }

         axios.post('http://localhost:3007/api/userchange',data)
          .then(response=>{
              console.log('user====>',response.data)

               
              const {First_name,Email,User_Id} = response.data.data
               console.log('First===>',First_name)
               console.log('Email====>',Email)
                console.log('userid==>',User_Id)
                setuserid(User_Id)
                
             
               if(First_name === getfirstname && Email === getemail)  
               { 
                setOpen(true); 
               }
          })
          .catch(err => {
            console.log('error', err);
             alert('not matching')
          })
      }
            
      const handleSubmit = ()=>
      {
         const user =
         {    
             "User_Id" :getuserid,
            "Password":getchangepassword

         } 
         axios.put(`http://localhost:3007/updateuser/:${getuserid}`, user)
           .then(response=>{
              console.log('userupdate',response.data)
               alert('Updated successfully')
                 
           })
          
      }
      const isSubmitDisabled = getchangepassword === '' || getconfirmpassword === '' || getchangepassword !== getconfirmpassword;

    return (
        <FormControl sx={{ width: '20vw', border: '1px', marginLeft: '317px' }}>
            <TextField
                color="warning"
                label="First Name"
                type='text'
                value = {getfirstname}
                onChange={handleNameChange}
                variant="filled"
                fullWidth
                margin="normal"
                required
            />
            <TextField
                color="warning"
                label="Email"
                type="Email"
                variant="filled"
                 value = {getemail}
                 onChange={handleEmailChange}
                fullWidth
                margin="normal"
                required
            />
            <Box sx={{ textAlign:"end"}}>
                <Button onClick={handlerChange} sx={{ boxShadow: 3,width:"100px", color: 'blue',backgroundColor:'whitesmoke'}}>CLICK</Button>
            </Box>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
            
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                  <TextField
                color="warning"
                label="ChangePassword"
                value={getchangepassword}
                onChange={handleChangePassword}
                type='password'
                variant="filled"
                fullWidth
                margin="normal"
                required
            />
                <TextField
                color="warning"
                label="Confirm Password"
                type='password'
                value={getconfirmpassword}
                onChange={handleConfirmPassword}
                variant="filled"
                fullWidth
                margin="normal"
                required
            />
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button sx={{backgroundColor:'white',color:'blue'}} onClick={handleClose} autoFocus>
                    close
                  </Button>
                   <Button onClick={()=>handleSubmit()} disabled={isSubmitDisabled}>Submit</Button>
                </DialogActions>
              </Dialog>
        </FormControl>
    )
}

export default Userchange