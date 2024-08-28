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
import Typography from '@mui/material/Typography'

const Signin = () => {
  // State hooks for input values and validation errors
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Handle input changes and validation for Name
  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
    if (!value) {
      setNameError("Name is required.");
    } else {
      setNameError("");
    }
  };

  // Handle input changes and validation for Email
  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    if (!value) {
      setEmailError("Email is required.");
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      setEmailError("Email is invalid.");
    } else {
      setEmailError("");
    }
  };

  // Handle input changes and validation for Password
  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
    if (!value) {
      setPasswordError("Password is required.");
    } else if (value.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
    } else {
      setPasswordError("");
    }
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Check for errors before submitting
    if (!name) setNameError("Name is required.");
    if (!email) setEmailError("Email is required.");
    if (!password) setPasswordError("Password is required.");
    if (name && email && password && !emailError && !passwordError) {
      // Proceed with form submission or other actions
      console.log("Form submitted:", { name, email, password });

      // Reset form fields after successful submission
      setName("");
      setEmail("");
      setPassword("");
      // Clear errors after resetting the form
      setNameError("");
      setEmailError("");
      setPasswordError("");
    }
  };

  // Toggle password visibility
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Box
      component="form"
      sx={{ "& .MuiTextField-root": { m: 1, width: "35ch" } }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Typography variant="h4" color="initial" sx={{ textAlign: "center", mb:2 }}>Sign in</Typography>
      <div>
        <TextField
          required
          id="outlined-required-name"
          label="Name"
          value={name}
          onChange={handleNameChange}
          error={!!nameError}
          helperText={nameError}
        />
      </div>
      <div>
        <TextField
          required
          id="outlined-required-email"
          label="Email"
          value={email}
          onChange={handleEmailChange}
          error={!!emailError}
          helperText={emailError}
        />
      </div>

      <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={handlePasswordChange}
          error={!!passwordError}
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
        {passwordError && (
          <Box
            component="p"
            sx={{ color: "red", mt: 1, ml: 1, fontSize: "1.3ch" }}
          >
            {passwordError}
          </Box>
        )}
      </FormControl>

      <Button variant="contained" type="submit" sx={{ width: "41ch", mt: 2 }}>
        Sign in
      </Button>
    </Box>
  );
};

export default Signin;
