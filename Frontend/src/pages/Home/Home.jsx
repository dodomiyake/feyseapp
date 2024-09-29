import { useState } from "react"; // Make sure to import useState
import { Box, Modal } from "@mui/material";
import Header from "../../components/Header/Header";
import Gallery from "../../components/Gallery/Gallery";
import Testimonials from "../../components/Testimonials/Testimonials";
import Contact from "../../components/Contact/Contact";
import About from "../../components/About/About";
import Navbar from "../../components/Navbar/Navbar";
import Signin from "../../components/Signin/Signin";
import Signup from "../../components/Signup/Signup";
import "./Home.css";

export default function Home() {
  const [showSignin, setShowSignin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  // Style for the modal
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4
  };

  return (
    <>
      <Navbar setShowSignin={setShowSignin} setShowSignup={setShowSignup} />
      <Header />
      <About />
      <Gallery />
      <Testimonials />
      <Contact />

      {/* Conditionally render the Signin Modal */}
      {showSignin && (
        <Modal
          open={showSignin}
          onClose={() => setShowSignin(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Signin onClose={() => setShowSignin(false)} />
          </Box>
        </Modal>
      )}

      {/* Conditionally render the Signup Modal */}
      {showSignup && (
        <Modal
          open={showSignup}
          onClose={() => setShowSignup(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Signup onClose={() => setShowSignup(false)} />
          </Box>
        </Modal>
      )}
    </>
  );
}
