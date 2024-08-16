import "./Header.css";
import { Box } from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import "@fontsource/inter";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from '@mui/material/Typography';
import Stack from "@mui/joy/Stack";

// Styled Paper component
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0),
  color: theme.palette.text.secondary,
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "left",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat"
}));

// Create theme with custom typography
const theme = createTheme();

theme.typography.h1 = {
  fontSize: "3rem",  
    lineHeight: '60px',
  "@media (min-width:600px)": {
    fontSize: "3rem"
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "3.2rem",
    lineHeight: '60px'
  }
};

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1, height: "100vh", width: "100%" }}>
      {" "}
      {/* Full viewport height */}
      <Grid
        container
        spacing={0} // Remove spacing to make items fill the space
        columns={{ xs: 2, sm: 8, md: 12 }}
        sx={{ height: "100%", width: "100%" }} // Ensure Grid container takes full height
      >
        <Grid
          xs={2}
          sm={8}
          md={6}
          sx={{ height: "100%", width: "100%", textAlign: "left" }}
        >
          <Item>
            <ThemeProvider theme={theme}>
              <Stack>
                <Typography variant="h1" gutterBottom textColor="black" fontFamily="inter" color="common.black" >
                  Discover your style <br />with us
                </Typography>

                <Typography
                  level="body-md"
                  fontFamily="inter"
                  fontSize='15px'
                  variant="subtitle1" 
                  color="common.black"
                  gutterBottom
                >
                  Where style meets comfort and quality. We design for those who
                  value <br /> both fashion and functionality. From everyday essentials
                  to statement <br />pieces. Elevate your wardrobe with Feyse and
                  discover the perfect<br /> balance of trend and timelessness.
                </Typography>
              </Stack>
            </ThemeProvider>
          </Item>
        </Grid>
        <Grid xs={2} sm={8} md={6} sx={{ height: "100%" }}>
          <Item sx={{ backgroundImage: `url('/f34.jpeg')` }}></Item>
        </Grid>
      </Grid>
    </Box>
  );
}
