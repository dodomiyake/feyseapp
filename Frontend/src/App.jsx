import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import UserProfile from "./pages/UserProfile/UserProfile"; // Import UserProfile
import { Route, Routes, Navigate } from "react-router-dom";
import { Box, Modal } from "@mui/material";
import Footer from "./components/Footer/Footer";


const App = () => {
  

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // Full viewport height
      }}
    >
      
      <Box component="main"
        sx={{ flexGrow: 1, mt: 2 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:userId" element={<UserProfile />} />{" "}
          {/* UserProfile route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Box>
      <Footer />


    </Box>
  );
};

export default App;
