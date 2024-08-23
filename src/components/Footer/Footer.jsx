import { Box, Container, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { IoIosArrowUp } from "react-icons/io";

const StyledFooter = styled("footer")(({ theme }) => ({
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

const Footer = () => {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <StyledFooter>
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
