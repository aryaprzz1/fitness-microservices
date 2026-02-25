import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { Box, Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import { getActivities } from '../services/api';

const ActivityList = () => {

  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  const fetchActivities = async () => {
    try {
      const response = await getActivities();
      setActivities(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchActivities();
  }, []);

  if (!activities.length) {
    return (
      <Card elevation={0} className="panel-card">
        <CardContent>
          <Typography variant='h6' className="section-title">No activities yet</Typography>
          <Typography variant='body2' className="section-subtitle">
            Add your first activity above to start getting AI recommendations.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Stack spacing={2}>
      <Typography variant='h5' className="section-title">Your Activities</Typography>
      <Box className="activity-grid">
      {activities.map((activity) => (
          <Card key={activity.id} elevation={0} className="activity-card"
            onClick={() => navigate( `/activities/${activity.id}`)}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
                <Typography variant='h6'>{activity.type}</Typography>
                <Chip size="small" label={`${activity.duration} min`} />
              </Stack>
              <Typography className="metric-line">Calories Burned: {activity.caloriesBurned}</Typography>
              <Typography className="metric-hint">Tap to view detailed analysis</Typography>
            </CardContent>
          </Card>
      ))}
      </Box>
    </Stack>
  )
}

export default ActivityList
