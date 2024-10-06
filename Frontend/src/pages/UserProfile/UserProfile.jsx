import React, { useState } from "react";
import {
  Avatar,
  Button,
  Container,
  Typography,
  TextField,
  Grid,
  Card,
  CardContent,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Drawer,
  AppBar,
  Toolbar,
  IconButton as MuiIconButton,
  Hidden
} from "@mui/material";
import { PhotoCamera, Logout, Menu } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240; // Define the width of the drawer

const ProfilePage = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [measurements, setMeasurements] = useState({
    // Blouse/Dress Measurements
    bust: "",
    waist: "",
    hip: "",
    underBustLength: "",
    underBustCircumference: "",
    upperBustLength: "",
    upperBustCircumference: "",
    napeWaist: "",
    xb: "",
    chestWidth: "",
    gownLength: "",
    kneeLength: "",
    kneeCircumference: "",
    blouseLength: "",
    topArm: "",
    shoulder: "",
    // Trouser Measurements
    trouserWaist: "",
    trouserHip: "",
    thighCircumference: "",
    crotch: "",
    waistAnkle: "",
    ankleCircumference: "",
    trouserKneeLength: "",
    trouserKneeCircumference: "",
    trouserLength: "",
    // Sleeve Measurements
    sleeveLength: "",
    sleeveTopArm: "",
    armElbow: "",
    armWrist: "",
    wristCircumference: ""
  });
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [dressImages, setDressImages] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Handle profile picture upload
  const handleProfilePicUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePic(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Handle measurement changes
  const handleMeasurementChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = value === '' ? '' : parseFloat(value); // Parse input to float or allow clearing
    if (!isNaN(parsedValue)) {
      setMeasurements({
        ...measurements,
        [name]: parsedValue
      });
    }
  };
  

  // Function to handle form submission
  // Function to handle form submission
// Function to handle form submission and reset fields
const handleFormSubmit = () => {
  // Filter out empty fields
  const filledMeasurements = Object.entries(measurements).reduce((acc, [key, value]) => {
    if (value !== "" && value !== null && value !== undefined) {
      acc[key] = value;
    }
    return acc;
  }, {});

  console.log("Submitted Measurements:", filledMeasurements);

  // Reset the form fields
  setMeasurements({
    bust: "",
    waist: "",
    hip: "",
    underBustLength: "",
    underBustCircumference: "",
    upperBustLength: "",
    upperBustCircumference: "",
    napeWaist: "",
    xb: "",
    chestWidth: "",
    gownLength: "",
    kneeLength: "",
    kneeCircumference: "",
    blouseLength: "",
    topArm: "",
    shoulder: "",
    trouserWaist: "",
    trouserHip: "",
    thighCircumference: "",
    crotch: "",
    waistAnkle: "",
    ankleCircumference: "",
    trouserKneeLength: "",
    trouserKneeCircumference: "",
    trouserLength: "",
    sleeveLength: "",
    sleeveTopArm: "",
    armElbow: "",
    armWrist: "",
    wristCircumference: ""
  });
};


  // Handle new comments
  const handleCommentSubmit = () => {
    if (commentText) {
      setComments([...comments, commentText]);
      setCommentText("");
    }
  };

  // Mock sign out function
  const handleSignOut = async () => {
    try {
      const response = await fetch("/signout", {
        method: "GET",
        credentials: "include", // Ensure cookies are sent with the request
      });
  
      if (response.ok) {
        console.log("Sign out successful. Redirecting to homepage...");
        // Sign out successful, now redirect to the homepage
        window.location.href = "/";
      } else {
        // Log any error returned by the server
        const errorMessage = await response.text(); // Get the error message from the response body
        console.error("Error during sign out:", response.statusText, errorMessage);
      }
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };
  

  const renderMeasurementField = (label, name) => (
    <Grid item xs={6}>
      <TextField
        label={label}
        name={name}
        value={measurements[name]}
        onChange={handleMeasurementChange}
        fullWidth
        inputProps={{
          inputMode: 'numeric',
          pattern: '[0-9]*',
        }}
      />
    </Grid>
  );

  // Handle dress images upload
  const handleDressImagesUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(newImages).then((images) => {
      setDressImages([...dressImages, ...images]);
    });
  };

  // Toggle for mobile drawer
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <Box sx={{ textAlign: "center", p: 2 }}>
      {/* Profile Picture and User Details */}
      <Avatar
        alt="Profile Picture"
        src={profilePic}
        sx={{ width: 150, height: 150, margin: "0 auto" }}
      />
      <IconButton color="primary" component="label">
        <input
          hidden
          accept="image/*"
          type="file"
          onChange={handleProfilePicUpload}
        />
        <PhotoCamera />
      </IconButton>
      <Typography variant="body2" color="white" sx={{ mb: 2 }}>
        Upload Profile Picture
      </Typography>

      {/* Sign Out Button */}
      <Button
        variant="outlined"
        color="primary"
        startIcon={<Logout />}
        onClick={handleSignOut}
        sx={{ mt: 2 }}
      >
        Sign Out
      </Button>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      {/* AppBar for mobile view */}
      <AppBar
        position="fixed"
        sx={{ display: { md: "none" }, bgcolor: "black" }}
      >
        <Toolbar>
          <MuiIconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <Menu />
          </MuiIconButton>
          <Typography variant="h6" noWrap component="div">
            User Profile
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar for desktop and drawer for mobile */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        {/* Drawer for mobile view */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              bgcolor: "black",
              color: "white"
            }
          }}
        >
          {drawerContent}
        </Drawer>

        {/* Permanent sidebar for desktop view */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              bgcolor: "black",
              color: "white"
            }
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* Main content area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: { xs: 8, sm: 8, md: 0 }
        }}
      >
        <Grid container spacing={3}>
          {/* Measurement Section */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Measurements for Blouse/Dress
                </Typography>
                <Grid container spacing={2}>
                {renderMeasurementField("Bust", "bust")}
                  {renderMeasurementField("Waist", "waist")}
                  {renderMeasurementField("Hip", "hip")}
                  {renderMeasurementField("Under Bust Length", "underBustLength")}
                  {renderMeasurementField("Under Bust Circumference", "underBustCircumference")}
                  {renderMeasurementField("Upper Bust Length", "upperBustLength")}
                  {renderMeasurementField("Upper Bust Circumference", "upperBustCircumference")}
                  {renderMeasurementField("Nape-Waist", "napeWaist")}
                  {renderMeasurementField("XB", "xb")}
                  {renderMeasurementField("Chest Width", "chestWidth")}
                  {renderMeasurementField("Gown Length", "gownLength")}
                  {renderMeasurementField("Knee Length", "kneeLength")}
                  {renderMeasurementField("Knee Circumference", "kneeCircumference")}
                  {renderMeasurementField("Blouse Length", "blouseLength")}
                  {renderMeasurementField("Top Arm", "topArm")}
                  {renderMeasurementField("Shoulder", "shoulder")}
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Sleeve Measurements */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Measurements for Sleeve
                </Typography>
                <Grid container spacing={2}>
                {renderMeasurementField("Sleeve Length", "sleeveLength")}
                {renderMeasurementField("Top Arm", "sleeveTopArm")}
                {renderMeasurementField("Arm Elbow", "armElbow")}
                {renderMeasurementField("Arm Wrist", "armWrist")}
                {renderMeasurementField("Wrist Circumference", "wristCircumference")}
          
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Trouser Measurements */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Measurements for Trouser
                </Typography>
                <Grid container spacing={2}>
                {renderMeasurementField("Waist", "trouserWaist")}
                {renderMeasurementField("Hip", "trouserHip")}
                {renderMeasurementField("Thigh Circumference", "thighCircumference")}
                {renderMeasurementField("Crotch", "crotch")}
                {renderMeasurementField("Waist Ankle", "waistAnkle")}
                {renderMeasurementField("Ankle Circumference", "ankleCircumference")}
                {renderMeasurementField("Knee Length", "trouserKneeLength")}
                {renderMeasurementField("Knee Circumference", "trouserKneeCircumference")}
                {renderMeasurementField("Trouser Length", "trouserLength")}
                  
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleFormSubmit}
              size="medium" // or "small" to make the button smaller
              sx={{ mt: 2, display: "block" }} // center the button
            >
              Submit Measurements
            </Button>
          </Grid>

          {/* Dress Upload Section */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Upload Dress Images
                </Typography>
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<PhotoCamera />}
                >
                  Upload Images
                  <input
                    hidden
                    accept="image/*"
                    multiple
                    type="file"
                    onChange={handleDressImagesUpload}
                  />
                </Button>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  {dressImages.map((image, index) => (
                    <Grid item xs={4} key={index}>
                      <img
                        src={image}
                        alt={`Dress ${index + 1}`}
                        style={{
                          width: "100%",
                          height: "auto",
                          borderRadius: 8
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Comment Section */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Comments
                </Typography>
                <List>
                  {comments.map((comment, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={comment} />
                    </ListItem>
                  ))}
                </List>
                <TextField
                  label="Add a Comment"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  fullWidth
                  multiline
                  rows={2}
                  sx={{ mt: 2 }}
                />
                <Button
                  variant="contained"
                  sx={{ mt: 2 }}
                  onClick={handleCommentSubmit}
                >
                  Add Comment
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ProfilePage;
