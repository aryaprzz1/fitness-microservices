import { Box, Button, Card, CardContent, Chip, Divider, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { getActivityDetail } from '../services/api';

const ActivityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    const fetchActivityDetail = async () => {
      try {
        const response = await getActivityDetail(id);
        setActivity(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchActivityDetail();
  }, [id]);

  if (!activity) {
    return <Typography>Loading activity details...</Typography>;
  }

  const recommendationData = typeof activity.recommendation === "object" && activity.recommendation !== null
    ? activity.recommendation
    : activity;
  const analysisText = typeof activity.recommendation === "string"
    ? activity.recommendation
    : recommendationData?.analysis;
  const improvements = Array.isArray(recommendationData?.improvements) ? recommendationData.improvements : [];
  const suggestions = Array.isArray(recommendationData?.suggestions) ? recommendationData.suggestions : [];
  const safety = Array.isArray(recommendationData?.safety) ? recommendationData.safety : [];

  const renderList = (items, fallbackText) => {
    if (!items.length) {
      return <Typography className="section-subtitle">{fallbackText}</Typography>;
    }

    return items.map((item, index) => (
      <Typography key={`${item}-${index}`} paragraph className="detail-bullet">
        {"- "}{item}
      </Typography>
    ));
  };

  return (
    <Stack spacing={2}>
      <Button variant="text" onClick={() => navigate("/activities")} sx={{ width: "fit-content" }}>
        Back to Activities
      </Button>

      <Card elevation={0} className="panel-card">
        <CardContent>
          <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" spacing={2} sx={{ mb: 2 }}>
            <Box>
              <Typography variant="h5" className="section-title">Activity Details</Typography>
              <Typography className="section-subtitle">
                {new Date(activity.createdAt).toLocaleString()}
              </Typography>
            </Box>
            <Chip label={activity.type} />
          </Stack>
          <Typography className="metric-line">Duration: {activity.duration} minutes</Typography>
          <Typography className="metric-line">Calories Burned: {activity.caloriesBurned}</Typography>
        </CardContent>
      </Card>

      <Card elevation={0} className="panel-card">
        <CardContent>
          <Typography variant="h5" className="section-title" sx={{ mb: 2 }}>
            AI Recommendation
          </Typography>

          <Typography variant="h6" sx={{ mb: 1 }}>Analysis</Typography>
          <Typography paragraph className="detail-text">
            {analysisText || "No analysis available for this activity."}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" sx={{ mb: 1 }}>Improvements</Typography>
          {renderList(improvements, "No specific improvements available.")}

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" sx={{ mb: 1 }}>Suggestions</Typography>
          {renderList(suggestions, "No suggestions available.")}

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" sx={{ mb: 1 }}>Safety Guidelines</Typography>
          {renderList(safety, "No safety guidance available.")}
        </CardContent>
      </Card>
    </Stack>
  )
}

export default ActivityDetail
