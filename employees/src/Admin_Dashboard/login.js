import {
  Box,
  Button,
  FormControl,
  Select,
  TextField,
  MenuItem,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  borderedBox: {
    border: "1px solid black",
    padding: theme.spacing(2),
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Login = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [getusername, setusername] = useState("");
  const [getpassword, setpassword] = useState("");

  const [dialogopen, dialogSetOpen] = React.useState(false);
  const [loginDialog, setLoginDialog] = useState(false)


  //signup state

  const [getfirstname, setFirstName] = useState("");
  const [getlastname, setLastName] = useState("");
  const [getemail, setEmail] = useState("");
  const [getsignupassword, setSignupPassword] = useState("");
  const [getrole, setRole] = useState("");
  const [getdomainname, setDomainname] = useState("");
  //end

  //signup api

  const [getsignupapi, setSignupapi] = useState([]);
  const [getloginapi, setLoginApi] = useState([]);

  const [getadminusername, setadminusername] = useState([]);
  const [getadminpassword, setAdminPassword] = useState([]);

  const onchangeFirstname = (e) => {
    setFirstName(e.target.value);
  };

  const onchangeLastname = (e) => {
    setLastName(e.target.value);
  };

  const onchangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onchangePassword = (e) => {
    setSignupPassword(e.target.value);
  };
  const onchangeRole = (e) => {
    setRole(e.target.value);
  };

  const onchangeDomain = (e) => {
    setDomainname(e.target.value);
  };

  const handleUserChange = (event) => {
    setLoginDialog(false)
    setusername(event.target.value);
    // setadminusername(event.target.value)
  };

  const handlePassChange = (e) => {
    setpassword(e.target.value);
    setLoginDialog(false)
    // setAdminPassword(e.target.value)
  };

  const handleRegister = (e) => {
    console.log("Register");
    e.preventDefault();

    const data = {
      firstName: getfirstname,
      lastName: getlastname,
      email: getemail,
      password: getsignupassword,
      role: getrole,
      domainName: getdomainname,
    };
    console.log("data inserted");

    axios
      .post("http://localhost:3007/insertusers", data)
      .then((response) => {
        console.log("res", response.data);
        setLoginApi(response.data);
      })
      .catch((err) => console.log("insert err", err));
  };
  useEffect(() => {
    axios
      .get("http://localhost:3007/api/domain")
      .then((response) => {
        console.log("domain", response.data);
        setSignupapi(response.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, [getloginapi]);

  const handleSignup = () => {
    console.log("successfully");
    dialogSetOpen(true);
  };

  const handleClose = () => {
    dialogSetOpen(false);
  };

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      navigate("/user");
    } else if (localStorage.getItem("admin")) {
      navigate("/sidebar");
    }
  });

  const handleLogin = async () => {
    console.log("login console");
    console.log("login console2");
  
    try {
      const response = await axios.post(`http://localhost:3007/api/logindata`, {
        Email: getusername,
        Password: getpassword,
      });
  
      console.log('response234====>', response.data);
  
      const items = response.data // Assuming your response has a "results" array
  
      console.log('items', items); // Print the items array to debug
  
      items.map((item) => {

        if (item.role === "user") {
           console.log('role', item.role);
          localStorage.setItem("auth", true);
          localStorage.setItem("userId", item.User_Id);
          navigate("/user");
        } else if (item.role === "admin") {
          localStorage.setItem("admin", true);
          navigate("/sidebar");
        }
        return null;
      })

    } 
    catch (err) {
      console.log("login err", err);
      setpassword("");
      setLoginDialog(true);
    }
  };

  console.log("setLoginDialog", loginDialog)
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundImage: "linear-gradient(to right,#885aa5 ,#2876b9 )",
      }}
    >
      <Box
        sx={{
          maxWidth: 400,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          backgroundImage: "linear-gradient(to right,#88caee ,#3499bd )",
          height: "500px",
          borderRadius: "150px 0 0 0",
        }}
      >
        <div>

          <div>
            <h1 style={{ color: "white" }}>Login</h1>

            <FormControl>
              <TextField
                value={getusername}
                onChange={(event) => handleUserChange(event)}
                sx={{ mt: 3 }}
                size="small"
                id="outlined-basic"
                label="USERNAME"
              // variant="outlined"
              />
            </FormControl>
            <FormControl>
              <TextField
                value={getpassword}
                onChange={handlePassChange}
                sx={{
                  mt: 3,
                  // borderWidth: "3px",
                  // borderColor: "black",
                  //  borderRadius: "50%",
                }}
                size="small"
                id="outlined-basic"
                label="PASSWORD"
                variant="outlined"
              />
            </FormControl>
            <Box sx={{ display: "flex", justifyContent: "center" }}>

              <Box sx={{ mt: 3 }}>
                {loginDialog && <p style={{ color: "red", fontSize: "12px", textAlign: "center", marginBottom: "5px" }}>Enter correct email and password</p>}
                <Button
                  onClick={() => handleLogin("login successfully")}
                  variant="contained"
                >
                  LOGIN
                </Button>

              </Box>
            </Box>
          </div>
        </div>

      </Box>

    </Box>
  );
};

export default Login;
