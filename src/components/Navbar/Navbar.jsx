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

const drawerWidth = 240;
const navItems = ["About", "Feature", "Contact"];

function Navbar(props) {
  const { window } = props;
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
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
        {/* Add Sign In and Sign Up in the drawer for mobile */}
        <ListItem key="Sign In" disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText primary="Sign In" />
          </ListItemButton>
        </ListItem>
        <ListItem key="Sign Up" disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText primary="Sign Up" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{
          backgroundColor: 'black',
          minHeight: '80px',
          zIndex: 1200, // Make sure the AppBar is below the header
          position: 'fixed', // Ensure it's fixed at the top
          width: '100%', // Ensure it takes full width
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center', mt: 1, p: 2 }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box component="div" sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <img src={assets.feyse} alt="Logo" style={{ height: 60, marginRight: 16 }} />
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff', mx: 4, ':hover': { borderBottom: '1px solid white' } }}>
                {item}
              </Button>
            ))}
            {/* Add the Sign In / Sign Up buttons */}
            <Button variant="text" sx={{ color: '#fff', mx: 1, ':hover': { borderBottom: '1px solid white' } }}>Sign In</Button>
            <Typography color="#fff">/</Typography>
            <Button sx={{ color: '#fff', mx: 1, ':hover': { borderBottom: '1px solid white' } }}>Sign Up</Button>
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
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
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
};

export default Navbar;
