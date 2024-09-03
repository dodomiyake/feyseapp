import { useState } from "react";
import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import { Box, Modal, Typography } from "@mui/material";
import Footer from "./components/Footer/Footer";
import Signin from "./components/Signin/Signin";
import Signup from "./components/Signup/Signup";


const App = () => {
  const [showSignin, setShowSignin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  // Style for the modal
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="app">
      <Navbar setShowSignin={setShowSignin} setShowSignup={setShowSignup} />
      <Box sx={{ mt: "85px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Box>
      <Footer />

      {/* Modal for Signin */}
      <Modal
        open={showSignin}
        onClose={() => setShowSignin(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
         
          <Signin />
        </Box>
      </Modal>

      {/* Modal for SignUp */}
      <Modal
        open={showSignup}
        onClose={() => setShowSignup(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
         
          <Signup />
        </Box>
      </Modal>
    </div>
  );
};

export default App;
