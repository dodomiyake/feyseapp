import { Box } from "@mui/material";
import Header from "../../components/Header/Header";
import "./Home.css";
import Gallery from "../../components/Gallery/Gallery";
import Testimonials from "../../components/Testimonials/Testimonials";
import Contact from "../../components/Contact/Contact";
import About from "../../components/About/About";

export default function Home() {
  return (
    <>
      <Header />
      <About />
      <Gallery />
      <Testimonials />
      <Contact />
    </>
  );
}
