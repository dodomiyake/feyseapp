import { Box } from "@mui/material";
import Header from "../../components/Header/Header";
import "./Home.css";
import Gallery from "../../components/Gallery/Gallery";
import Testimonials from "../../components/Testimonials/Testimonials";
import Contact from "../../components/Contact/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <Gallery />
      <Testimonials />
      <Contact />
    </>
  );
}
