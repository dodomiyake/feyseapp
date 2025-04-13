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
  Hidden,
  Paper,
  Collapse
} from "@mui/material";
import { PhotoCamera, Logout, Menu, Delete, Reply, ExpandLess, ExpandMore } from "@mui/icons-material";
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
  const [dressImages, setDressImages] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedComments, setExpandedComments] = useState({});

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

  // Handle dress images upload
  const handleDressImagesUpload = (e) => {
    const files = Array.from(e.target.files);

    // Log the name of each uploaded image
    files.forEach((file) => console.log("Uploaded Image:", file.name));

    const newImages = files.map((file) => {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onloadend = () => {
          resolve({ src: reader.result, comments: [] });
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(newImages).then((images) => {
      setDressImages([...dressImages, ...images]);
    });
  };

  // Handle adding a comment to a specific image
  const handleAddComment = (index, commentText) => {
    if (commentText) {
      const updatedImages = [...dressImages];
      updatedImages[index].comments.push({ text: commentText, user: "User", replies: [] });
      setDressImages(updatedImages);

      // Log the user and the comment content
      console.log("User:", "User");
      console.log("Comment Content:", commentText);
    }
  };

  // Handle adding a reply to a specific comment
  const handleAddReply = (imageIndex, commentIndex, replyText) => {
    if (replyText) {
      const updatedImages = [...dressImages];
      updatedImages[imageIndex].comments[commentIndex].replies.push({ text: replyText, user: "User" });
      setDressImages(updatedImages);

      // Log the user and the reply content
      console.log("User:", "User");
      console.log("Reply Content:", replyText);
    }
  };

  // Handle deleting a comment from a specific image
  const handleDeleteComment = (imageIndex, commentIndex) => {
    const updatedImages = [...dressImages];
    updatedImages[imageIndex].comments.splice(commentIndex, 1);
    setDressImages(updatedImages);
  };

  // Handle expanding and collapsing replies
  const toggleReplies = (imageIndex, commentIndex) => {
    setExpandedComments(prevState => ({
      ...prevState,
      [`${imageIndex}-${commentIndex}`]: !prevState[`${imageIndex}-${commentIndex}`]
    }));
  };

  // Mock sign out function
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4040/api";

  const handleSignOut = async () => {
    try {
      const response = await fetch(`${API_URL}/signout`, {
        method: "POST", // Make sure backend route is POST
        credentials: "include",
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
                  {Object.keys(measurements).map((key) => (
                    <Grid item xs={6} key={key}>
                      <TextField
                        label={key.replace(/([A-Z])/g, ' $1')}
                        name={key}
                        value={measurements[key]}
                        onChange={handleMeasurementChange}
                        fullWidth
                        inputProps={{
                          inputMode: 'numeric',
                          pattern: '[0-9]*',
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleFormSubmit}
                  size="medium"
                  sx={{ mt: 2, display: "block", backgroundColor: "#1b1b1b", color: "white", '&:hover': { backgroundColor: '#555' } }}
                >
                  Submit Measurements
                </Button>
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
                  sx={{ backgroundColor: "#1b1b1b", color: "white", '&:hover': { backgroundColor: '#555' } }}
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
                <Grid container spacing={2} sx={{ mt: 2, justifyContent: 'center' }}>
                  {dressImages.map((image, index) => (
                    <Grid item xs={12} md={12} lg={12} key={index}>
                      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <img
                          src={image.src}
                          alt={`Dress ${index + 1}`}
                          style={{
                            width: "80%",
                            height: "auto",
                            borderRadius: 8
                          }}
                        />
                      </Box>
                      {/* Comment Section for Each Image */}
                      <Box sx={{ mt: 2, width: "80%", marginLeft: "auto", marginRight: "auto" }}>
                        <Typography variant="subtitle1">Comments:</Typography>
                        <List>
                          {image.comments.map((comment, commentIndex) => (
                            <React.Fragment key={commentIndex}>
                              <ListItem secondaryAction={
                                <>
                                  <IconButton edge="end" aria-label="reply" onClick={() => document.getElementById(`reply-input-${index}-${commentIndex}`).focus()}>
                                    <Reply />
                                  </IconButton>
                                  <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteComment(index, commentIndex)}>
                                    <Delete />
                                  </IconButton>
                                </>
                              }>
                                <ListItemText primary={`${comment.user}: ${comment.text}`} />
                                <IconButton onClick={() => toggleReplies(index, commentIndex)}>
                                  {expandedComments[`${index}-${commentIndex}`] ? <ExpandLess /> : <ExpandMore />}
                                </IconButton>
                              </ListItem>
                              <Collapse in={expandedComments[`${index}-${commentIndex}`]} timeout="auto" unmountOnExit>
                                <Box component={Paper} elevation={3} sx={{ mt: 1, pl: 2, pb: 1, pt: 1, borderRadius: 2 }}>
                                  <List>
                                    {comment.replies.map((reply, replyIndex) => (
                                      <ListItem key={replyIndex}>
                                        <ListItemText primary={`${reply.user}: ${reply.text}`} />
                                      </ListItem>
                                    ))}
                                  </List>
                                  <TextField
                                    id={`reply-input-${index}-${commentIndex}`}
                                    label="Add a Reply"
                                    fullWidth
                                    multiline
                                    rows={1}
                                    sx={{ mt: 1 }}
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleAddReply(index, commentIndex, e.target.value);
                                        e.target.value = '';
                                      }
                                    }}
                                  />
                                </Box>
                              </Collapse>
                            </React.Fragment>
                          ))}
                        </List>
                        <TextField
                          label="Add a Comment"
                          fullWidth
                          multiline
                          rows={2}
                          sx={{ mt: 2 }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleAddComment(index, e.target.value);
                              e.target.value = '';
                            }
                          }}
                        />
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ProfilePage;