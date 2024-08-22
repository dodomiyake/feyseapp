import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { images } from "../../assets/assets";

// Define a styled container with padding
const Container = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4), // Add padding around the section
}));

// Define a styled item to ensure equal height for the text and image
const EqualHeightItem = styled(Grid)({
  display: 'flex',
  alignItems: 'stretch',
});

export default function About() {
  return (
    <>
      <Typography
        variant="h3"
        color="initial"
        sx={{
          color: "black",
          textAlign: "center",
          fontFamily: "Georgia",
          paddingTop: "30px",
          fontSize: { xs: 24, sm: 35, md: 40 }
        }}
      >
        About
      </Typography>
      <Container>
        <Grid container spacing={2} columns={12}>
          <EqualHeightItem item xs={12} sm={12} md={4}>
            <img
              src={images.f37}
              alt={images.title}
              style={{
                width: "100%", // Make the image take the full width of the grid item
                height: "100%", // Make the image take the full height of the grid item
                objectFit: "cover",
                borderRadius: "50px"
              }}
            />
          </EqualHeightItem>
          <EqualHeightItem item xs={12} md={8}>
            <Typography variant="body2" color="initial" sx={{ flex: 1, lineHeight: 2.5, marginTop: 3, paddingLeft: "10px"}}>
              Quisque venenatis augue metus, at elementum ligula dignissim ac.
              Maecenas quam turpis, placerat at ligula id, viverra aliquam nisl.
              Donec sagittis nisi vitae nibh tincidunt bibendum. Cras a aliquam
              orci. Sed nisi turpis, molestie sit amet volutpat sed, dignissim
              in ex. Donec ac sollicitudin nisl, eget suscipit sem. Pellentesque
              tristique, felis in tristique tempor, sem ligula auctor massa, a
              volutpat turpis lacus quis tortor. Class aptent taciti sociosqu ad
              litora torquent per conubia nostra, per inceptos himenaeos. Donec
              eget pulvinar ante. Nunc a dapibus libero, ut volutpat odio.
              Phasellus porta ultricies sem, imperdiet placerat nibh lacinia id.
              Duis quis fermentum urna, vel sodales ligula.
              Quisque venenatis augue metus, at elementum ligula dignissim ac.
              Maecenas quam turpis, placerat at ligula id, viverra aliquam nisl.
              Donec sagittis nisi vitae nibh tincidunt bibendum. Cras a aliquam
              orci. Sed nisi turpis, molestie sit amet volutpat sed, dignissim
              in ex. Donec ac sollicitudin nisl, eget suscipit sem. Pellentesque
              tristique, felis in tristique tempor, sem ligula auctor massa, a
              volutpat turpis lacus quis tortor. Class aptent taciti sociosqu ad
              litora torquent per conubia nostra, per inceptos himenaeos. Donec
              eget pulvinar ante. Nunc a dapibus libero, ut volutpat odio.
              Phasellus porta ultricies sem, imperdiet placerat nibh lacinia id.
              Duis quis fermentum urna, vel sodales ligula.
            </Typography>
           
          </EqualHeightItem>
        </Grid>
      </Container>
    </>
  );
}
