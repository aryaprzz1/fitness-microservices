
import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { addActivity } from '../services/api';

const ActivityForm = ({ onActivityAdded }) => {

  const [activity, setActivity] = useState({
    type: "RUNNING", duration: '', caloriesBurned: '',
    additionalMetrics: {}
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addActivity(activity);
      onActivityAdded();
      setActivity({
    type: "RUNNING", duration: '', caloriesBurned: '',
    additionalMetrics: {}
  });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Paper elevation={0} className="panel-card">
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <Typography variant="h5" className="section-title">
            Add New Activity
          </Typography>
          <Typography variant="body2" className="section-subtitle">
            Capture your session and keep your progress history up to date.
          </Typography>
          <FormControl fullWidth>
            <InputLabel>Activity Type</InputLabel>
            <Select
              label="Activity Type"
              value={activity.type}
              onChange={(e) => setActivity({...activity, type: e.target.value})}
            >
              <MenuItem value="RUNNING">Running</MenuItem>
              <MenuItem value="WALKING">Walking</MenuItem>
              <MenuItem value="CYCLING">Cycling</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Duration (Minutes)"
            type='number'
            value={activity.duration}
            onChange={(e) => setActivity({...activity, duration: e.target.value})}
          />
          <TextField
            fullWidth
            label="Calories Burned"
            type='number'
            value={activity.caloriesBurned}
            onChange={(e) => setActivity({...activity, caloriesBurned: e.target.value})}
          />
          <Box>
            <Button type='submit' variant='contained' className="btn-primary">
              Add Activity
            </Button>
          </Box>
        </Stack>
      </Box>
    </Paper>
  )
}

export default ActivityForm
