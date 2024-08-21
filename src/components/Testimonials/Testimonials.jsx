import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import StarIcon from '@mui/icons-material/Star';
import Slider from "react-slick";
import { images } from "../../assets/assets";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './Testimonials.css';  // Import the CSS file where we customize slick styles

const testimonials = [
  { id: 1, name: "Remy Sharp", image: images.f1, review: "Great service!", rating: 5 },
  { id: 2, name: "Alice Cooper", image: images.f2, review: "Very satisfied!", rating: 4 },
  { id: 3, name: "John Doe", image: images.f3, review: "Could be better.", rating: 3 },
  // Add more testimonials as needed
];

function Testimonials({ name, image, review, rating }) {
  return (
    <Card sx={{ minWidth: 275, backgroundColor: '#1b1b1b', color: 'white', margin: '10px', borderRadius: '15px' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Avatar alt={name} src={image} />
        </Box>
        
        <Typography variant="body2" sx={{ textAlign: 'center',mb: 2 }}>
          {review}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
          {[...Array(rating)].map((_, index) => (
            <StarIcon key={index} sx={{ color: 'yellow', mr: 0.5 }} />
          ))}
        </Box>
        <Typography sx={{ fontSize: 14, textAlign: 'center' }} color="white" gutterBottom>
          {name}
        </Typography>
      </CardContent>
      
    </Card>
  );
}

export default function TestimonialsCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <Box sx={{ padding: '40px', margin: '20px', backgroundColor: '#ffffff' }}>
      <Typography
        variant="h3"
        color="initial"
        sx={{
          color: "#000000",
          textAlign: "center",
          fontFamily: "Georgia",
          marginBottom: '20px',
          fontSize: { xs: 24, sm: 35, md: 40 }
        }}
      >
        Testimonials
      </Typography>

      <Slider {...settings}>
        {testimonials.map((testimonial) => (
          <Testimonials
            key={testimonial.id}
            name={testimonial.name}
            image={testimonial.image}
            review={testimonial.review}
            rating={testimonial.rating}
          />
        ))}
      </Slider>
    </Box>
  );
}
