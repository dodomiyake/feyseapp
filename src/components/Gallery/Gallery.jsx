import * as React from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { images } from "../../assets/assets";
import Typography from "@mui/material/Typography";

export default function Gallery() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        padding: "20px",
        backgroundColor: "#13100f"
      }}
    >
      <Typography
        variant="h3"
        color="initial"
        sx={{
          color: "white",
          textAlign: "center",
          fontFamily: "Georgia",
          marginBottom: '20px',
          fontSize: { xs: 24, sm: 35, md: 40 }
        }}
      >
        Features
      </Typography>
      <ImageList variant="masonry" cols={3} gap={20}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=248&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
              style={{ borderRadius: '35px' }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

const itemData = [
  {
    img: images.f1,
    title: "f1"
  },
  {
    img: images.f2,
    title: "f2"
  },
  {
    img: images.f3,
    title: "f3"
  },
  {
    img: images.f4,
    title: "f4"
  },
  {
    img: images.f5,
    title: "f5"
  },
  {
    img: images.f6,
    title: "f6"
  },
  {
    img: images.f7,
    title: "f7"
  },
  {
    img: images.f8,
    title: "f8"
  },
  {
    img: images.f9,
    title: "f9"
  },
  {
    img: images.f10,
    title: "f10"
  },
  {
    img: images.f11,
    title: "f11"
  },
  {
    img: images.f12,
    title: "f12"
  }
];
