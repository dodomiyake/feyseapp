import "./Navbar.css";
import { assets } from "../../assets/assets";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Link } from "react-scroll";

const drawerWidth = 240;
const navItems = ["About", "Feature", "Contact"];

function Navbar({ window, setShowSignin, setShowSignup }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Feyse
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <Link
              to={item.toLowerCase()}
              spy={true}
              smooth={true}
              duration={500}
            >
              <ListItemButton
                sx={{
                  textAlign: "center",
                  width: "100%",
                  justifyContent: "center",
                  padding: "10px 97px",
                }}
              >
                <ListItemText primary={item} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
        <ListItem key="Sign In" disablePadding>
          <ListItemButton
            sx={{ textAlign: "center" }}
            onClick={() => setShowSignin(true)} // Open the Signin modal
          >
            <ListItemText primary="Sign In" />
          </ListItemButton>
        </ListItem>
        <ListItem key="Sign Up" disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}
          onClick={() => setShowSignup(true)} // Open the Signup modal
          >
            <ListItemText primary="Sign Up" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{
          backgroundColor: "black",
          minHeight: "80px",
          zIndex: 1200,
          position: "fixed",
          width: "100%",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            mt: 1,
            p: 2,
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            component="div"
            sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}
          >
            <img
              src={assets.feyse}
              alt="Logo"
              style={{ height: 60, marginRight: 16 }}
            />
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
            {navItems.map((item) => (
              <Link
                key={item}
                to={item.toLowerCase()}
                smooth={true}
                duration={500}
                style={{ textDecoration: "none" }}
              >
                <Button
                  sx={{
                    color: "#fff",
                    mx: 4,
                    ":hover": { borderBottom: "1px solid white" },
                  }}
                >
                  {item}
                </Button>
              </Link>
            ))}
            <Button
              variant="text"
              sx={{
                color: "#fff",
                mx: 1,
                ":hover": { borderBottom: "1px solid white" },
              }}
              onClick={() => setShowSignin(true)}
            >
              Sign In
            </Button>
            <Typography color="#fff">/</Typography>
            <Button
              sx={{
                color: "#fff",
                mx: 1,
                ":hover": { borderBottom: "1px solid white" },
              }}
              onClick={() => setShowSignup(true)}
            >
              Sign Up
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

Navbar.propTypes = {
  window: PropTypes.func,
  setShowLogin: PropTypes.func.isRequired, // Ensure this prop is marked as required
};

export default Navbar;
