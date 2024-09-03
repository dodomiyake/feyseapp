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

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
    setNameError(value ? "" : "Name is required.");
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    setEmailError(
      !value
        ? "Email is required."
        : !/\S+@\S+\.\S+/.test(value)
        ? "Email is invalid."
        : ""
    );
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
    setPasswordError(
      !value
        ? "Password is required."
        : value.length < 6
        ? "Password must be at least 6 characters long."
        : ""
    );
  };

  const handleConfirmPasswordChange = (event) => {
    const value = event.target.value;
    setConfirmPassword(value);
    setConfirmPasswordError(
      value !== password ? "Passwords do not match." : ""
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setNameError(name ? "" : "Name is required.");
    setEmailError(
      email
        ? !/\S+@\S+\.\S+/.test(email)
          ? "Email is invalid."
          : ""
        : "Email is required."
    );
    setPasswordError(password ? (password.length < 6 ? "Password must be at least 6 characters long." : "") : "Password is required.");
    setConfirmPasswordError(confirmPassword ? (confirmPassword !== password ? "Passwords do not match." : "") : "Confirm password is required.");

    if (
      name &&
      email &&
      password &&
      confirmPassword &&
      !emailError &&
      !passwordError &&
      !confirmPasswordError
    ) {
      setLoading(true);
      setServerError("");
      try {
        const response = await axios.post('http://localhost:5000/api/users/signup', { name, email, password });
        console.log('Response:', response.data);
        navigate('/');
      } catch (error) {
        console.error('Error during signup:', error);
        setServerError('Error during signup. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Box
      component="form"
      sx={{ "& .MuiTextField-root": { m: 1, width: "35ch" } }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Typography
        variant="h4"
        color="initial"
        sx={{ textAlign: "center", mb: 2 }}
      >
        Sign up
      </Typography>
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

      <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-confirm-password">
          Confirm Password
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-confirm-password"
          type={showPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          error={!!confirmPasswordError}
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
          label="Confirm Password"
        />
        {confirmPasswordError && (
          <Box
            component="p"
            sx={{ color: "red", mt: 1, ml: 1, fontSize: "1.3ch" }}
          >
            {confirmPasswordError}
          </Box>
        )}
      </FormControl>

      {serverError && (
        <Box
          component="p"
          sx={{ color: "red", mt: 2, textAlign: "center" }}
        >
          {serverError}
        </Box>
      )}

      <Button
        variant="contained"
        type="submit"
        sx={{
          width: "41ch",
          mt: 2,
          backgroundColor: "black",
          "&:hover": {
            backgroundColor: "#252525" // Dark grey color on hover
          }
        }}
        disabled={loading} // Disable button while loading
      >
        {loading ? 'Signing up...' : 'Sign up'}
      </Button>
    </Box>
  );
};

export default Signup;
