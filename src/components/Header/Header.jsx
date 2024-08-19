import "./Header.css";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import bgImg from "./bgImg.jpg";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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
      <Box
        sx={{
          backgroundImage: `url(${bgImg})`,
          backgroundSize: "cover",
          backgroundPosition: { xs: "center", md: "right" },
          width: "100vw",
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
          <Typography
            variant="h1"
            component="h1"
            sx={{ fontSize: { xs: 34, sm: 40, md: 46 }, fontWeight: "bold" }}
          >
            Discover your style with us
          </Typography>
          <Typography
            variant="body1"
            component="p"
            sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }}
          >
            Where style meets comfort and quality. We design for those who <br />
            value both fashion and functionality. From everyday essentials <br />
            to statement pieces. Elevate your wardrobe with Feyse and <br />
            discover the perfect balance of trend and timelessness.
          </Typography>
        </div>
      </Box>
    </ThemeProvider>
  );
}
