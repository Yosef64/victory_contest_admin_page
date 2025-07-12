import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton // Import IconButton for the delete button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; // Import DeleteIcon
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface AnalyticsData {
  totalResponses: number;
  questionStats: {
    questionId: string;
    question: string;
    responses: { [option: string]: number };
  }[];
  pollStats: {
    optionId: string;
    option: string;
    count: number;
    percentage: number;
  }[];
  contactList: {
    name: string;
    score: number;
    phoneNumber: string;
    submittedAt: string;
  }[];
  commentSummary: {
    totalComments: number;
    averageLength: number;
    sentimentScore: number;
  };
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function FeedbackAnalytics() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, [selectedTimeRange]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/feedback/analytics?range=${selectedTimeRange}`);
      // const data = await response.json();
      // setAnalyticsData(data);
      
      // Mock data for demo
      setAnalyticsData({
        totalResponses: 150,
        questionStats: [
          {
            questionId: '1',
            question: 'How do you rate our learning strategy?',
            responses: {
              'Excellent': 45,
              'Very Good': 60,
              'Good': 35,
              'Bad': 10
            }
          }
        ],
        pollStats: [
          { optionId: '1', option: 'Less than 300', count: 25, percentage: 16.7 },
          { optionId: '2', option: 'Less than 400', count: 40, percentage: 26.7 },
          { optionId: '3', option: 'Less than 500', count: 50, percentage: 33.3 },
          { optionId: '4', option: 'Between 500-600', count: 35, percentage: 23.3 }
        ],
        contactList: [
          { name: 'አበበ ከበደ', score: 580, phoneNumber: '+251911234567', submittedAt: '2024-01-15T10:30:00Z' },
          { name: 'ስላሜ ተሰማ', score: 545, phoneNumber: '+251912345678', submittedAt: '2024-01-14T14:20:00Z' },
          { name: 'ሮዳስ ግርማ', score: 592, phoneNumber: '+251913456789', submittedAt: '2024-01-13T09:15:00Z' }
        ],
        commentSummary: {
          totalComments: 95,
          averageLength: 156,
          sentimentScore: 4.2
        }
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setLoading(false);
    }
  };

  // New function to handle deletion
  const handleDeleteContact = (phoneNumberToDelete: string) => {
    if (!analyticsData) return;

    // In a real application, you'd make an API call here to delete the contact from the backend
    // For now, we'll just update the local state (mock data)
    const updatedContactList = analyticsData.contactList.filter(
      (contact) => contact.phoneNumber !== phoneNumberToDelete
    );

    setAnalyticsData({
      ...analyticsData,
      contactList: updatedContactList,
    });

    console.log(`Contact with phone number ${phoneNumberToDelete} deleted (mock action).`);
    // TODO: Add actual API call here, e.g.:
    // try {
    //   await fetch(`/api/feedback/contacts/${phoneNumberToDelete}`, { method: 'DELETE' });
    //   setAnalyticsData({ ...analyticsData, contactList: updatedContactList });
    // } catch (error) {
    //   console.error('Error deleting contact:', error);
    //   // Optionally, revert the UI change or show an error message
    // }
  };

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6">Loading analytics...</Typography>
        <LinearProgress sx={{ mt: 2 }} />
      </Box>
    );
  }

  if (!analyticsData) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6">No analytics data available</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Feedback Analytics
        </Typography>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Time Range</InputLabel>
          <Select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
          >
            <MenuItem value="all">All Time</MenuItem>
            <MenuItem value="7d">Last 7 Days</MenuItem>
            <MenuItem value="30d">Last 30 Days</MenuItem>
            <MenuItem value="90d">Last 90 Days</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                {analyticsData.totalResponses}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Responses
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'success.main' }}>
                {analyticsData.contactList.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                High Scorers
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'info.main' }}>
                {analyticsData.commentSummary.totalComments}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Comments Received
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'warning.main' }}>
                {analyticsData.commentSummary.sentimentScore}/5
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sentiment Score
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Question Response Charts */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Question Responses
            </Typography>
            {analyticsData.questionStats.map((stat) => (
              <Box key={stat.questionId} sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                  {stat.question}
                </Typography>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={Object.entries(stat.responses).map(([option, count]) => ({ option, count }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="option" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            ))}
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Exam Results Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analyticsData.pollStats}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ option, percentage }) => `${option}: ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {analyticsData.pollStats.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* High Scorers Contact List */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          High Scorers Contact List (500-600 Range)
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Score</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Submitted Date</TableCell>
                <TableCell>Action</TableCell> {/* New: Action column header */}
              </TableRow>
            </TableHead>
            <TableBody>
              {analyticsData.contactList.map((contact, index) => (
                <TableRow key={index}>
                  <TableCell>{contact.name}</TableCell>
                  <TableCell>
                    <Chip 
                      label={contact.score} 
                      color={contact.score >= 580 ? 'success' : 'primary'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{contact.phoneNumber}</TableCell>
                  <TableCell>{new Date(contact.submittedAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <IconButton 
                      aria-label="delete" 
                      onClick={() => handleDeleteContact(contact.phoneNumber)} // Call delete handler
                      color="error" // Make the icon red
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell> {/* New: Action cell with delete button */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}