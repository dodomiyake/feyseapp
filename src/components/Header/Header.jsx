import "./Header.css";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import bgImg from "./bgImg.jpg";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import styled, { keyframes } from 'styled-components';
import { bounce } from 'react-animations';



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

const bounceAnimation = keyframes`${bounce}`;

const BouncyDiv = styled.div`
  animation: 1s ${bounceAnimation};
`;

// Item component
function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#101010" : "#fff",
        color: (theme) =>
          theme.palette.mode === "dark" ? "grey.300" : "grey.800",
        border: "1px solid",
        borderColor: (theme) =>
          theme.palette.mode === "dark" ? "grey.800" : "grey.300",
        p: 1,
        m: 1,
        borderRadius: 2,
        fontSize: "0.875rem",
        fontWeight: "700",
        ...sx,
      }}
      {...other}
    />
  );
}

Item.propTypes = {
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

// Header component
export default function Header() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          backgroundImage: `url(${bgImg})`,
          backgroundSize: "cover",
          backgroundPosition: { xs: "center", md: "right" },
          width: "100%",
          height: "87vh",
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
        <div>
          <BouncyDiv>
          <Typography
            variant="h1"
            component="h1"
            sx={{ fontSize: { xs: 34, sm: 40, md: 46 }, fontWeight: "bold", marginBottom: '8px' }}
          >
            Discover your style with us
          </Typography>
          <Typography
            variant="body1"
            component="p"
            sx={{ fontSize: { xs: 10, sm: 12, md: 14 }, fontFamily: 'Georgia', lineHeight: 1.8,}}
          >
            Where style meets comfort and quality. We design for those who
            value both fashion<br /> and functionality. From everyday essentials
            to statement pieces. Elevate your <br />wardrobe with Feyse and 
            discover the perfect balance of trend and timelessness.
          </Typography>
          </BouncyDiv>
        </div>
      </Box>
    </ThemeProvider>
  );
}