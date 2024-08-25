import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { IoIosArrowUp } from "react-icons/io";
import { motion, useAnimation } from 'framer-motion';

const StyledFooter = styled(motion.footer)(({ theme }) => ({
  backgroundColor: "#1c1c1c",
  color: "#fff",
  padding: theme.spacing(6, 0),
  position: "relative"
}));

const BackToTopButton = styled(Button)({
  position: "absolute",
  bottom: "20px",
  right: "20px",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  color: "#fff",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.2)"
  }
});

const footerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 }
};

const transition = {
  duration: 0.6,
  ease: "easeOut",
};

const Footer = () => {
  const controls = useAnimation();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const footerTop = document.querySelector('.footer-container').offsetTop;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;

      if (scrollY + windowHeight > footerTop) {
        setInView(true);
      } else {
        setInView(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger scroll check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [inView, controls]);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <StyledFooter
      className="footer-container"
      animate={controls}
      initial="hidden"
      variants={footerVariants}
      transition={transition}
    >
      <Container maxWidth="lg">
        <Box mt={1} textAlign="center">
          <Typography variant="body2">
            © {new Date().getFullYear()} Feyse Inc. All rights reserved.
          </Typography>
        </Box>
      </Container>
      <BackToTopButton onClick={handleBackToTop} aria-label="Back to top">
        <IoIosArrowUp />
      </BackToTopButton>
    </StyledFooter>
  );
};

export default Footer;
