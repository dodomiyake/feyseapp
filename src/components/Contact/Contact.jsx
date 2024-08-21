import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "transparent", // Remove background color
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "left",
  color: "#fff", // Set text color to white
  border: `1px solid ${theme.palette.divider}`, // Optional: add a border for visibility
  boxShadow: "none" // Remove default Paper shadow
}));

export default function Contact() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        width: "100%",
        minHeight: "300px",
        padding: "20px",
        backgroundColor: "#13100f", // Dark color for contrast
        display: "flex",
        flexDirection: "column", // Stack elements vertically
        alignItems: "center", // Center items horizontally
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
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
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
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
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
            <Box sx={{ paddingLeft: 5, marginBottom: 2 }}>
              <FacebookIcon sx={{ marginRight: 3, color: "#fff" }} />
              <TwitterIcon sx={{ marginRight: 3, color: "#fff" }} />
              <InstagramIcon sx={{ marginRight: 3, color: "#fff" }} />
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
        </Grid>
      </Grid>
    </Box>
  );
}
