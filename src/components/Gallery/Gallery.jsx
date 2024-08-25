import * as React from "react";
import { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Typography from "@mui/material/Typography";
import { useTheme, useMediaQuery } from "@mui/material";
import { images } from "../../assets/assets";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Gallery() {
  const theme = useTheme();
  const matchDownSm = useMediaQuery(theme.breakpoints.down('sm'));

  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <Box
      id="feature" // This should match the link target
      sx={{
        width: "100%",
        height: "100%",
        padding: "20px",
        backgroundColor: "#13100f"
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
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
      </motion.div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        ref={ref}
      >
        <ImageList
          variant="masonry"
          cols={matchDownSm ? 1 : 3}
          gap={20}
        >
          {itemData.map((item) => (
            <motion.div key={item.img} variants={itemVariants}>
              <ImageListItem>
                <img
                  srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.img}?w=248&fit=crop&auto=format`}
                  alt={item.title}
                  loading="lazy"
                  style={{ borderRadius: '35px' }}
                />
              </ImageListItem>
            </motion.div>
          ))}
        </ImageList>
      </motion.div>
    </Box>
  );
}

const itemData = [
  { img: images.f1, title: "f1" },
  { img: images.f2, title: "f2" },
  { img: images.f3, title: "f3" },
  { img: images.f4, title: "f4" },
  { img: images.f5, title: "f5" },
  { img: images.f6, title: "f6" },
  { img: images.f7, title: "f7" },
  { img: images.f8, title: "f8" },
  { img: images.f9, title: "f9" },
  { img: images.f10, title: "f10" },
  { img: images.f11, title: "f11" },
  { img: images.f12, title: "f12" },
];
