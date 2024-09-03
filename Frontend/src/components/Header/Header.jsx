import React, { useEffect, useState } from 'react';
import "./Header.css";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import bgImg from "./bgImg.jpg";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { motion, useAnimation } from "framer-motion";

// Define custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

// Motion variants for animations
const textVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const textTransition = {
  duration: 1,
  ease: "easeOut",
};

// Header component
export default function Header() {
  const controls = useAnimation();
  const [inView, setInView] = useState(false);

  // Handle scroll-based animation
  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = window.innerHeight / 1.5; // Adjust as needed
      const scrollY = window.scrollY;
      const headerTop = document.querySelector('.header').offsetTop;

      if (scrollY + window.innerHeight > headerTop + headerHeight) {
        setInView(true);
      } else {
        setInView(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger the scroll check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [inView, controls]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          backgroundImage: `url(${bgImg})`,
          backgroundSize: "cover",
          backgroundPosition: { xs: "center", md: "right" },
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          paddingLeft: { xs: "20px", md: "35px" },
          textAlign: "left",
          objectFit: "cover",
          [theme.breakpoints.down("xs")]: {
            backgroundImage: "none",
          },
        }}
        className="header"
      >
        <motion.div
          animate={controls}
          initial="hidden"
          variants={textVariants}
          transition={textTransition}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: 34, sm: 40, md: 46 },
              fontWeight: "bold",
              marginBottom: '8px'
            }}
          >
            Discover your style with us
          </Typography>
          <Typography
            variant="body1"
            component="p"
            sx={{
              fontSize: { xs: 10, sm: 12, md: 14 },
              fontFamily: 'Georgia',
              lineHeight: 1.8,
            }}
          >
            Where style meets comfort and quality. We design for those who
            value both fashion<br /> and functionality. From everyday essentials
            to statement pieces. Elevate your <br />wardrobe with Feyse and
            discover the perfect balance of trend and timelessness.
          </Typography>
        </motion.div>
      </Box>
    </ThemeProvider>
  );
}
