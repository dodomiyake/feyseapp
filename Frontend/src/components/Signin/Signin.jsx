import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError(!event.target.value ? "Email is required." : "");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError(!event.target.value ? "Password is required." : "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Reset errors before validation
    setEmailError("");
    setPasswordError("");
    setServerError("");
  
    // Client-side validation
    if (!email) {
      setEmailError("Email is required.");
      return;
    }
    if (!password) {
      setPasswordError("Password is required.");
      return;
    }
  
    try {
      const response = await axios.post(
        "http://localhost:4040/api/signin",
        { email, password },
        { withCredentials: true }  // Send cookies if needed
      );
      console.log(response.data);
  
      if (response.data.success) {
        // Navigate to user profile or any redirect URL provided by the server
        const redirectUrl = response.data?.redirectUrl || "/userprofile";
        navigate(redirectUrl);
      } else {
        // Handle any case where login wasn't successful but no error was thrown
        setServerError(response.data?.message || "Login failed. Please try again.");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred. Please try again.";
      setServerError(errorMessage);
    }
  };
  

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Box component="form" sx={{ "& .MuiTextField-root": { m: 1, width: "35ch" } }} noValidate autoComplete="off" onSubmit={handleSubmit}>
      <Typography variant="h4" sx={{ textAlign: "center", mb: 2 }}>Sign in</Typography>
      
      <TextField
        required
        label="Email"
        value={email}
        onChange={handleEmailChange}
        error={!!emailError}
        helperText={emailError}
      />
      
      <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={handlePasswordChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={(event) => event.preventDefault()}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
        {passwordError && <Box component="p" sx={{ color: "red", mt: 1, ml: 1, fontSize: "1.3ch" }}>{passwordError}</Box>}
      </FormControl>

      {serverError && <Box component="p" sx={{ color: "red", mt: 1, ml: 1, fontSize: "1.3ch" }}>{serverError}</Box>}

      <Button
        variant="contained"
        type="submit"
        sx={{ width: "41ch", mt: 2, backgroundColor: "black", "&:hover": { backgroundColor: "#252525" } }}
      >
        Sign in
      </Button>
    </Box>
  );
};

export default Signin;
