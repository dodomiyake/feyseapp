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
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin = ({ onClose }) => {
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
        { email, password }, // Pass the credentials
        { withCredentials: true } // Ensure cookies/sessions are sent
      );

      if (response.status === 200) {
        const { userId } = response.data; // Assuming response contains userId

        // If login is successful, redirect to UserProfile with dynamic userId
        navigate(`/profile/${userId}`);
      }
    } catch (error) {
      setServerError(error.response?.data?.message || "Failed to sign in. Please try again.");
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
      <Typography variant="h4" sx={{ textAlign: "center", mb: 2 }}>
        Sign in
      </Typography>

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
        {passwordError && (
          <Box
            component="p"
            sx={{ color: "red", mt: 1, ml: 1, fontSize: "1.3ch" }}
          >
            {passwordError}
          </Box>
        )}
      </FormControl>

      {serverError && (
        <Box
          component="p"
          sx={{ color: "red", mt: 1, ml: 1, fontSize: "1.3ch" }}
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
          "&:hover": { backgroundColor: "#252525" },
        }}
      >
        Sign in
      </Button>
      <Box sx={{ textAlign: "center", mt: 2 }}>
        Don’t have an account?{" "}
        <span onClick={onClose} style={{ color: "blue", cursor: "pointer" }}>
          Sign Up
        </span>
      </Box>
    </Box>
  );
};

export default Signin;
