import { useState } from "react";
import PropTypes from "prop-types";
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
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import { MuiTelInput } from "mui-tel-input";
import isValidPhoneNumber from 'libphonenumber-js'; // Import phone number validation library

const Signup = ({ onClose }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

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

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    setPasswordError(
      !value
        ? "Password is required."
        : value.length < 6
        ? "Password must be at least 6 characters long."
        : !passwordPattern.test(value)
        ? "Password must contain an uppercase letter, a lowercase letter, a number, and a special character."
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

  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
    if (value && !isValidPhoneNumber(value)) {
      setPhoneNumberError("Phone number is invalid.");
    } else {
      setPhoneNumberError("");
    }
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
    setPasswordError(
      password
        ? password.length < 6
          ? "Password must be at least 6 characters long."
          : ""
        : "Password is required."
    );
    setConfirmPasswordError(
      confirmPassword
        ? confirmPassword !== password
          ? "Passwords do not match."
          : ""
        : "Confirm password is required."
    );
    setPhoneNumberError(
      phoneNumber
        ? isValidPhoneNumber(phoneNumber)
          ? ""
          : "Phone number is invalid."
        : "Phone number is required."
    );

    if (
      name &&
      email &&
      password &&
      confirmPassword &&
      phoneNumber &&
      !emailError &&
      !passwordError &&
      !confirmPasswordError &&
      !phoneNumberError
    ) {
      setLoading(true);
      setSnackbarMessage("");
      setSnackbarSeverity("success");
      try {
        await axios.post(
          "http://localhost:4040/api/signup",
          { name, email, password, phoneNumber },
          { withCredentials: true }
        );
        setSnackbarMessage("Signup successful! Redirecting...");
        setOpenSnackbar(true);

        // Reset form fields
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setPhoneNumber("");
        setNameError("");
        setEmailError("");
        setPasswordError("");
        setConfirmPasswordError("");
        setPhoneNumberError("");

        // Redirect after 2 seconds to allow Snackbar to show
        setTimeout(() => {
          navigate("/");
          if (onClose) onClose();
        }, 2000);
      } catch (error) {
        console.error(
          "Error during signup:",
          error.response ? error.response.data : error.message
        );
        setSnackbarMessage("Error during signup. Please try again.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  return (
    <Box
      component="form"
      sx={{ "& .MuiTextField-root": { m: 1, width: "35ch" } }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Typography variant="h4" sx={{ textAlign: "center", mb: 2 }}>
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

      <MuiTelInput
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        error={!!phoneNumberError}
        helperText={phoneNumberError}
        placeholder="Enter your phone number"
      />

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
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          error={!!confirmPasswordError}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowConfirmPassword}
                onMouseDown={(event) => event.preventDefault()}
                edge="end"
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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

      <Button
        variant="contained"
        type="submit"
        sx={{
          width: "41ch",
          mt: 2,
          backgroundColor: "black",
          "&:hover": {
            backgroundColor: "#252525"
          }
        }}
        disabled={loading}
      >
        {loading ? "Signing up..." : "Sign up"}
      </Button>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

// Define prop types for the component
Signup.propTypes = {
  onClose: PropTypes.func // PropTypes for the onClose prop
};

export default Signup;
