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
    sleeveLength: '',
    sleeveTopArm: '',
    armElbow: '',
    armWrist: '',
    wristCircumference: '',
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
    setMeasurements({
      ...measurements,
      [e.target.name]: e.target.value
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
  const handleSignOut = () => {
    console.log("Signed out");
  };

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
      <AppBar position="fixed" sx={{ display: { md: "none"}, bgcolor: "black" }}>
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
                  <Grid item xs={6}>
                    <TextField
                      label="Bust"
                      name="bust"
                      value={measurements.bust}
                      onChange={handleMeasurementChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Waist"
                      name="waist"
                      value={measurements.waist}
                      onChange={handleMeasurementChange}
                      fullWidth
                    />
                  </Grid>
                  {/* Add the remaining fields for Blouse/Dress */}
                  <Grid item xs={6}>
                    <TextField
                      label="Hip"
                      name="hip"
                      value={measurements.hip}
                      onChange={handleMeasurementChange}
                      fullWidth
                    />
                  </Grid>
                  {/* Add other fields as needed */}
                  <Grid item xs={6}>
                    <TextField
                      label="Under Bust Length"
                      name="underBustLength"
                      value={measurements.underBustLength}
                      onChange={handleMeasurementChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Under Bust Circumference"
                      name="underBustCircumference"
                      value={measurements.underBustCircumference}
                      onChange={handleMeasurementChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Upper Bust Length"
                      name="upperBustLength"
                      value={measurements.upperBustLength}
                      onChange={handleMeasurementChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Upper Bust Circumference"
                      name="upperBustCircumference"
                      value={measurements.upperBustCircumference}
                      onChange={handleMeasurementChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Nape-Waist"
                      name="napeWaist"
                      value={measurements.napeWaist}
                      onChange={handleMeasurementChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="XB"
                      name="xb"
                      value={measurements.xb}
                      onChange={handleMeasurementChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Chest Width"
                      name="chestWidth"
                      value={measurements.chestWidth}
                      onChange={handleMeasurementChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Gown Length"
                      name="gownLength"
                      value={measurements.gownLength}
                      onChange={handleMeasurementChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Knee Length"
                      name="kneeLength"
                      value={measurements.kneeLength}
                      onChange={handleMeasurementChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Knee Circumference"
                      name="kneeCircumference"
                      value={measurements.kneeCircumference}
                      onChange={handleMeasurementChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Blouse Length"
                      name="blouseLength"
                      value={measurements.blouseLength}
                      onChange={handleMeasurementChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Top Arm"
                      name="topArm"
                      value={measurements.topArm}
                      onChange={handleMeasurementChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Shoulder"
                      name="shoulder"
                      value={measurements.shoulder}
                      onChange={handleMeasurementChange}
                      fullWidth
                    />
                  </Grid>
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
                  <Grid item xs={6}>
                    <TextField
                      label="Sleeve Length"
                      name="sleeveLength"
                      value={measurements.sleeveLength}
                      onChange={handleMeasurementChange}
                      fullWidth
                    />
                  </Grid>
                  {/* Add the remaining fields for Trouser */}
                  <Grid item xs={6}>
                    <TextField
                      label="Top Arm"
                      name="sleeveTopArm"
                      value={measurements.sleeveTopArm}
                      onChange={handleMeasurementChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Arm Elbow"
                      name="armElbow"
                      value={measurements.armElbow}
                      onChange={handleMeasurementChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Arm Wrist"
                      name="armWrist"
                      value={measurements.armWrist}
                      onChange={handleMeasurementChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Wrist Circumference"
                      name="wristCircumference"
                      value={measurements.wristCircumference}
                      onChange={handleMeasurementChange}
                      fullWidth
                    />
                  </Grid>
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
                  <Grid item xs={6}>
                    <TextField
                      label="Waist"
                      name="trouserWaist"
                      value={measurements.trouserWaist}
                      onChange={handleMeasurementChange}
                      fullWidth
                    />
                  </Grid>
                  {/* Add the remaining fields for Trouser */}
                  <Grid item xs={6}>
                    <TextField
                      label="Thigh Circumference"
                      name="thighCircumference"
                      value={measurements.thighCircumference}
                      onChange={handleMeasurementChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Crotch"
                      name="crotch"
                      value={measurements.crotch}
                      onChange={handleMeasurementChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Waist-Ankle"
                      name="waistAnkle"
                      value={measurements.waistAnkle}
                      onChange={handleMeasurementChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Ankle Circumference"
                      name="ankleCircumference"
                      value={measurements.ankleCircumference}
                      onChange={handleMeasurementChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Knee Length"
                      name="trouserKneeLength"
                      value={measurements.trouserKneeLength}
                      onChange={handleMeasurementChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Knee Circumference"
                      name="trouserKneeCircumference"
                      value={measurements.trouserKneeCircumference}
                      onChange={handleMeasurementChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Trouser Length"
                      name="trouserLength"
                      value={measurements.trouserLength}
                      onChange={handleMeasurementChange}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
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
