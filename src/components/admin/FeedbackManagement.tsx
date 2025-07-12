// src/components/admin/FeedbackManagement.tsx

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Card,
  CardContent,
  Chip,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch
} from '@mui/material';
import { Add, Edit, Delete, BarChart } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Updated interfaces
interface FeedbackQuestion {
  id: string;
  question: string;
  options: string[];
  isActive: boolean;
  createdAt: string;
}

interface PollOption {
  id: string;
  label: string;
  minScore?: number;
  maxScore?: number;
  requiresContact: boolean;
}

interface FeedbackResponse {
  id: string;
  studentId: string;
  studentName: string;
  questionResponses: { [questionId: string]: string };
  comment: string;
  pollResponse: string;
  contactInfo?: {
    score: number;
    phoneNumber: string;
  };
  language: 'english' | 'amharic';
  submittedAt: string;
}

// Define types for items that can be deleted
type DeletableItemType = 'question' | 'pollOption' | 'response';

export default function FeedbackManagement() {
  const [activeTab, setActiveTab] = useState(0);
  const [questions, setQuestions] = useState<FeedbackQuestion[]>([]);
  const [pollOptions, setPollOptions] = useState<PollOption[]>([]);
  const [responses, setResponses] = useState<FeedbackResponse[]>([]);
  const [openDialog, setOpenDialog] = useState(false); // For Question Add/Edit
  const [editingQuestion, setEditingQuestion] = useState<FeedbackQuestion | null>(null);
  const [pollDialog, setPollDialog] = useState(false); // For Poll Option Add/Edit
  const [editingPoll, setEditingPoll] = useState<PollOption | null>(null);
  const navigate = useNavigate();

  // State for Confirmation Dialog
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState<string | null>(null);
  const [itemToDeleteType, setItemToDeleteType] = useState<DeletableItemType | null>(null);

  // Form states
  const [newQuestion, setNewQuestion] = useState({
    question: '',
    options: ['', '', '', ''],
  });

  const [newPollOption, setNewPollOption] = useState({
    label: '',
    minScore: 0,
    maxScore: 0,
    requiresContact: false
  });

  // Use the API base URL from your environment or shared config (e.g., api.ts)
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchQuestions();
    fetchPollOptions();
    fetchResponses();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/feedback/questions`);
      const fetchedQuestions: FeedbackQuestion[] = response.data.questions.map((q: any) => ({
        id: q.id,
        question: q.question,
        options: q.options || [],
        isActive: q.isActive,
        createdAt: q.createdAt
      }));
      setQuestions(fetchedQuestions);
    } catch (error) {
      console.error('Error fetching questions:', error);
      setQuestions([]); // Set to empty array on error
    }
  };

  const fetchPollOptions = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/feedback/poll-options`);
      const fetchedPollOptions: PollOption[] = response.data.poll_options.map((po: any) => ({
        id: po.id,
        label: po.label,
        minScore: po.minScore,
        maxScore: po.maxScore,
        requiresContact: po.requiresContact
      }));
      setPollOptions(fetchedPollOptions);
    } catch (error) {
      console.error('Error fetching poll options:', error);
      setPollOptions([ // Fallback or initial data
        { id: 'p1', label: 'Less than 300', minScore: 0, maxScore: 299, requiresContact: false },
        { id: 'p2', label: 'Less than 400', minScore: 300, maxScore: 399, requiresContact: false },
        { id: 'p3', label: 'Less than 500', minScore: 400, maxScore: 499, requiresContact: false },
        { id: 'p4', label: 'Between 500-600', minScore: 500, maxScore: 600, requiresContact: true }
      ]);
    }
  };

  const fetchResponses = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/feedback/responses`);
      const fetchedResponses: FeedbackResponse[] = response.data.responses.map((r: any) => ({
        id: r.id,
        studentId: r.studentId,
        studentName: r.studentName,
        questionResponses: r.questionResponses,
        comment: r.comment,
        pollResponse: r.pollResponse,
        contactInfo: r.contactInfo,
        language: r.language,
        submittedAt: r.submittedAt
      }));
      setResponses(fetchedResponses);
    } catch (error) {
      console.error('Error fetching responses:', error);
      setResponses([ // Fallback or initial data
        {
          id: 'r1',
          studentId: 's1',
          studentName: 'John Doe',
          questionResponses: { '1': 'Excellent', '2': 'Good' },
          comment: 'Great course, very helpful!',
          pollResponse: 'Between 500-600',
          contactInfo: { score: 580, phoneNumber: '+1234567890' },
          language: 'english',
          submittedAt: '2024-07-10T09:00:00Z'
        },
        {
          id: 'r2',
          studentId: 's2',
          studentName: 'Jane Smith',
          questionResponses: { '1': 'Good', '2': 'Average' },
          comment: '',
          pollResponse: 'Less than 400',
          language: 'english',
          submittedAt: '2024-07-09T14:00:00Z'
        }
      ]);
    }
  };

  const handleSaveQuestion = async () => {
    try {
      const questionData = {
        question: newQuestion.question,
        options: newQuestion.options.filter(opt => opt.trim() !== ''),
        admin_id: "admin_user_id", // Placeholder: Replace with actual admin ID from auth context
      };

      if (editingQuestion) {
        await axios.put(`${API_BASE_URL}/api/feedback/questions/${editingQuestion.id}`, questionData);
      } else {
        await axios.post(`${API_BASE_URL}/api/feedback/questions`, questionData);
      }

      setOpenDialog(false);
      setEditingQuestion(null);
      setNewQuestion({
        question: '',
        options: ['', '', '', '']
      });
      fetchQuestions();
    } catch (error) {
      console.error('Error saving question:', error);
    }
  };

  // Function to initiate delete (opens confirmation dialog)
  const confirmDelete = (id: string, type: DeletableItemType) => {
    setItemToDeleteId(id);
    setItemToDeleteType(type);
    setOpenConfirmDialog(true);
  };

  // Function called after confirmation
  const handleConfirmDelete = async () => {
    if (!itemToDeleteId || !itemToDeleteType) return;

    try {
      switch (itemToDeleteType) {
        case 'question':
          await axios.delete(`${API_BASE_URL}/api/feedback/questions/${itemToDeleteId}`);
          fetchQuestions();
          break;
        case 'pollOption':
          await axios.delete(`${API_BASE_URL}/api/feedback/poll-options/${itemToDeleteId}`);
          fetchPollOptions();
          break;
        case 'response':
          await axios.delete(`${API_BASE_URL}/api/feedback/responses/${itemToDeleteId}`);
          fetchResponses();
          break;
        default:
          console.warn('Unknown item type for deletion:', itemToDeleteType);
      }
    } catch (error) {
      console.error(`Error deleting ${itemToDeleteType}:`, error);
    } finally {
      // Always close the dialog and reset state
      setOpenConfirmDialog(false);
      setItemToDeleteId(null);
      setItemToDeleteType(null);
    }
  };

  // Original handleDelete functions now call confirmDelete
  const handleDeleteQuestion = (id: string) => {
    confirmDelete(id, 'question');
  };

  const toggleQuestionStatus = async (id: string, isActive: boolean) => {
    try {
      await axios.put(`${API_BASE_URL}/api/feedback/questions/${id}/status`, { isActive });
      fetchQuestions();
    } catch (error) {
      console.error('Error toggling question status:', error);
    }
  };

  const handleSavePollOption = async () => {
    try {
      const pollOptionData = {
        label: newPollOption.label,
        min_score: newPollOption.minScore,
        max_score: newPollOption.maxScore,
        requires_contact: newPollOption.requiresContact,
      };

      if (editingPoll) {
        await axios.put(`${API_BASE_URL}/api/feedback/poll-options/${editingPoll.id}`, pollOptionData);
      } else {
        await axios.post(`${API_BASE_URL}/api/feedback/poll-options`, pollOptionData);
      }
      setPollDialog(false);
      setEditingPoll(null);
      setNewPollOption({
        label: '',
        minScore: 0,
        maxScore: 0,
        requiresContact: false
      });
      fetchPollOptions();
    } catch (error) {
      console.error('Error saving poll option:', error);
    }
  };

  const handleDeletePollOption = (id: string) => {
    confirmDelete(id, 'pollOption');
  };

  const handleDeleteResponse = (id: string) => {
    confirmDelete(id, 'response');
  };


  const TabPanel = ({ children, value, index }: { children: React.ReactNode; value: number; index: number }) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Feedback Management
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Manage student feedback questions, polls, and responses
        </Typography>
      </Box>

      {/* Tab Navigation */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          
          {['Questions', 'Poll Options', 'Responses'].map((tab: string, index: number) => (
            <Button
              key={tab}
              onClick={() => setActiveTab(index)}
              variant={activeTab === index ? 'contained' : 'text'}
              sx={{ minWidth: 120 }}
            >
              {tab}
            </Button>
          ))}
        </Box>
      </Box>

      {/* Questions Management */}
      <TabPanel value={activeTab} index={0}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6">Feedback Questions</Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => {
              setEditingQuestion(null);
              setNewQuestion({
                question: '',
                options: ['', '', '', '']
              });
              setOpenDialog(true);
            }}
          >
            Add Question
          </Button>
        </Box>

        <Grid container spacing={3}>
          {questions.map((question) => (
            <Grid item xs={12} md={6} key={question.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" sx={{ flex: 1 }}>
                      {question.question}
                    </Typography>
                    <Chip
                      label={question.isActive ? 'Active' : 'Inactive'}
                      color={question.isActive ? 'success' : 'default'}
                      size="small"
                    />
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>Options:</Typography>
                    {question.options.map((option, index) => (
                      <Typography key={index} variant="body2" sx={{ ml: 2, mb: 0.5 }}>
                        • {option}
                      </Typography>
                    ))}
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <Switch
                      checked={question.isActive}
                      onChange={(e) => toggleQuestionStatus(question.id, e.target.checked)}
                      size="small"
                    />
                    <IconButton
                      onClick={() => {
                        setEditingQuestion(question);
                        setNewQuestion({
                          question: question.question,
                          options: [...question.options],
                        });
                        setOpenDialog(true);
                      }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteQuestion(question.id)} // Calls confirmation
                      color="error"
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Poll Options Management */}
      <TabPanel value={activeTab} index={1}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6">Poll Options</Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => {
              setEditingPoll(null);
              setNewPollOption({
                label: '',
                minScore: 0,
                maxScore: 0,
                requiresContact: false
              });
              setPollDialog(true);
            }}
          >
            Add Poll Option
          </Button>
        </Box>

        <Grid container spacing={3}>
          {pollOptions.map((option) => (
            <Grid item xs={12} md={6} key={option.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {option.label}
                  </Typography>

                  {option.minScore !== undefined && option.maxScore !== undefined && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2">
                        Score Range: {option.minScore} - {option.maxScore}
                      </Typography>
                    </Box>
                  )}

                  {option.requiresContact && (
                    <Chip
                      label="Requires Contact Info"
                      color="primary"
                      size="small"
                      sx={{ mb: 2 }}
                    />
                  )}

                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton
                      onClick={() => {
                        setEditingPoll(option);
                        setNewPollOption({
                          label: option.label,
                          minScore: option.minScore || 0,
                          maxScore: option.maxScore || 0,
                          requiresContact: option.requiresContact
                        });
                        setPollDialog(true);
                      }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeletePollOption(option.id)} // Calls confirmation
                      color="error"
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Responses View */}
      <TabPanel value={activeTab} index={2}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6">Student Responses</Typography>
          <Button
            variant="outlined"
            startIcon={<BarChart />}
            onClick={() => navigate('../analytics')} 
          >
            View Analytics
          </Button>
        </Box>

        <Grid container spacing={3}>
          {responses.map((response) => (
            <Grid item xs={12} key={response.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">{response.studentName}</Typography>
                    <Chip
                      label={response.language === 'english' ? 'English' : 'Amharic'}
                      size="small"
                    />
                  </Box>

                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                    Submitted: {new Date(response.submittedAt).toLocaleDateString()}
                  </Typography>

                  {response.comment && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2">{response.comment}</Typography>
                    </Box>
                  )}

                  {response.contactInfo && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2">Contact Info:</Typography>
                      <Typography variant="body2">
                        Score: {response.contactInfo.score} | Phone: {response.contactInfo.phoneNumber}
                      </Typography>
                    </Box>
                  )}
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <IconButton
                      onClick={() => handleDeleteResponse(response.id)} // Calls confirmation
                      color="error"
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>



      {/* Question Dialog (Existing) */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingQuestion ? 'Edit Question' : 'Add New Question'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Question"
              fullWidth
              multiline
              rows={2}
              value={newQuestion.question}
              onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
            />

            <Typography variant="subtitle1" sx={{ mt: 2 }}>Options</Typography>
            {newQuestion.options.map((option, index) => (
              <Box key={index} sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  label={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...newQuestion.options];
                    newOptions[index] = e.target.value;
                    setNewQuestion({ ...newQuestion, options: newOptions });
                  }}
                  sx={{ flex: 1 }}
                />
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveQuestion} variant="contained">
            {editingQuestion ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Poll Dialog (Existing) */}
      <Dialog open={pollDialog} onClose={() => setPollDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingPoll ? 'Edit Poll Option' : 'Add Poll Option'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Label"
              fullWidth
              value={newPollOption.label}
              onChange={(e) => setNewPollOption({ ...newPollOption, label: e.target.value })}
            />
            <TextField
              label="Minimum Score"
              type="number"
              fullWidth
              value={newPollOption.minScore}
              onChange={(e) => setNewPollOption({ ...newPollOption, minScore: parseInt(e.target.value) })}
            />
            <TextField
              label="Maximum Score"
              type="number"
              fullWidth
              value={newPollOption.maxScore}
              onChange={(e) => setNewPollOption({ ...newPollOption, maxScore: parseInt(e.target.value) })}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={newPollOption.requiresContact}
                  onChange={(e) => setNewPollOption({ ...newPollOption, requiresContact: e.target.checked })}
                />
              }
              label="Requires Contact Information"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPollDialog(false)}>Cancel</Button>
          <Button onClick={handleSavePollOption} variant="contained">
            {editingPoll ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog (New) */}
      <Dialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this {itemToDeleteType}? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setOpenConfirmDialog(false);
            setItemToDeleteId(null);
            setItemToDeleteType(null);
          }}>
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
