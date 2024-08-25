import React, { useEffect, useState } from 'react';
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { IconButton } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';

// Styled components
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "transparent",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "left",
  color: "#fff",
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: "none"
}));

const SocialButton = styled(IconButton)({
  color: '#fff',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const transition = {
  duration: 0.6,
  ease: "easeOut",
};

export default function Contact() {
  const controls = useAnimation();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const contactTop = document.querySelector('.contact-container').offsetTop;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;

      if (scrollY + windowHeight > contactTop) {
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

  return (
    <motion.div
      className="contact-container"
      animate={controls}
      initial="hidden"
      variants={containerVariants}
      transition={transition}
    >
      <Box
        sx={{
          flexGrow: 1,
          width: "100%",
          minHeight: "300px",
          padding: "20px",
          backgroundColor: "#13100f",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center"
        }}
      >
        <Typography
          variant="h3"
          color="initial"
          sx={{
            color: "#fff",
            textAlign: "center",
            fontFamily: "Georgia",
            marginBottom: '20px',
            fontSize: { xs: 24, sm: 35, md: 40 }
          }}
        >
          Contact
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={12} lg={4}>
            <motion.div variants={itemVariants} transition={transition}>
              <Item>
                <Typography variant="h6">
                  Lorem ipsum dolor sit amet
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'Georgia', lineHeight: 1.8 }}>
                  Suspendisse aliquam tellus ante, porttitor mattis diam eleifend
                  quis. Pellentesque pulvinar commodo eros sit amet finibus. Aenean
                  et ornare erat.
                </Typography>
              </Item>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <motion.div variants={itemVariants} transition={transition}>
              <Item>
                <Box
                  sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}
                >
                  <LocationOnIcon sx={{ marginRight: 2, color: "#fff" }} />
                  <Typography variant="h5">
                    Address
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{ paddingLeft: 5, marginBottom: 2 }}
                >
                  1652 Cordia Cir Newton, North Carolina(NC), 28658
                </Typography>
                <Box
                  sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}
                >
                  <EmailIcon sx={{ marginRight: 2, color: "#fff" }} />
                  <Typography variant="h5">
                    Email
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ paddingLeft: 5 }}>
                  hello@mui.dev
                </Typography>
              </Item>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <motion.div variants={itemVariants} transition={transition}>
              <Item>
                <Box
                  sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}
                >
                  <ConnectWithoutContactIcon
                    sx={{ marginRight: 2, color: "#fff" }}
                  />
                  <Typography variant="h5">
                    Social Media
                  </Typography>
                </Box>
                <Box mb={2} pl={3}>
                  <SocialButton aria-label="facebook">
                    <FaFacebookF />
                  </SocialButton>
                  <SocialButton aria-label="twitter">
                    <FaTwitter />
                  </SocialButton>
                  <SocialButton aria-label="instagram">
                    <FaInstagram />
                  </SocialButton>
                  <SocialButton aria-label="linkedin">
                    <FaLinkedinIn />
                  </SocialButton>
                </Box>
                <Box
                  sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}
                >
                  <LocalPhoneIcon sx={{ marginRight: 2, color: "#fff" }} />
                  <Typography variant="h5">
                    Phone
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ paddingLeft: 5 }}>
                  (318) 285-9856
                </Typography>
              </Item>
            </motion.div>
          </Grid>
        </Grid>
      </Box>
    </motion.div>
  );
}
