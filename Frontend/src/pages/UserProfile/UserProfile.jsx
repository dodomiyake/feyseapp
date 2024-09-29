import { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Avatar, Grid, CircularProgress, Container } from '@mui/material';
import { useParams } from 'react-router-dom'; // Import useParams to access the userId from the URL

const UserProfile = () => {
  const { userId } = useParams(); // Get userId from the URL parameters
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch user data
  const fetchUserData = async () => {
    try {
      // Update this to your backend endpoint
      const response = await fetch(`http://localhost:4040/api/users/${userId}`);
      console.log(response);
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await response.json(); // Parse the JSON response
      setUser(data); // Store user data in state
    } catch (err) {
      setError(err.message); // Set error state
    } finally {
      setLoading(false); // Stop the loading spinner
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserData(); // Fetch data when userId changes
    }
  }, [userId]); // Re-fetch data when userId changes

  // Return loading state, error, or profile
  if (loading) {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
        <CircularProgress />
      </Grid>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!user) {
    return <Typography>No user data available</Typography>;
  }

  return (
    <Container maxWidth="sm">
      <Card sx={{ mt: 5, textAlign: 'center', padding: '2rem' }}>
        <Avatar
          src={`https://i.pravatar.cc/150?u=${user._id}`} // Replace with user image if available
          alt="Profile Picture"
          sx={{ width: 100, height: 100, margin: '0 auto', mb: 2 }}
        />
        <CardContent>
          <Typography variant="h5" component="div">
            {user.name}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Email: {user.email}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Username: {user.username}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Phone: {user.phone}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Website: {user.website}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default UserProfile;
