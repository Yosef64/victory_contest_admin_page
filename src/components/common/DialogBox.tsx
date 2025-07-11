// src/components/common/DialogBox.tsx
import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography } from '@mui/material';
import { TimePickerComponent } from '../contests/DatePicker'; // Corrected import path for TimePickerComponent
import dayjs from 'dayjs';
import { Contest } from '../../types/models'; // Assuming Contest type path is correct

interface DialogBoxProps {
  open: boolean; // Controlled by parent
  onClose: () => void; // Controlled by parent
  action: 'announce' | 'clone' | 'update';
  handler: (
    action: string,
    time?: { start_time: string; end_time: string },
    info?: { title: string; description: string },
    data?: { file: File | null; message: string }
  ) => Promise<void>;
  contest?: Contest; // Only for 'update' action, provides initial values
}

export const DialogBox: React.FC<DialogBoxProps> = ({ open, onClose, action, handler, contest }) => {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(null);
  const [endTime, setEndTime] = useState<dayjs.Dayjs | null>(null);
  const [cloneTitle, setCloneTitle] = useState('');
  const [cloneDescription, setCloneDescription] = useState('');

  // Initialize time states when dialog opens or contest prop changes
  useEffect(() => {
    if (open && action === 'update' && contest) {
      console.log("DialogBox useEffect: Contest data received:", contest); // DEBUG
      console.log("DialogBox useEffect: Raw start_time:", contest.start_time); // DEBUG
      console.log("DialogBox useEffect: Raw end_time:", contest.end_time); // DEBUG

      // Parse time strings in "HH:mm" format (from backend) or "hh:mm A" (from AddContest)
      // Attempt to parse both for robustness
      const parseTime = (timeStr: string) => {
        if (!timeStr) return null; // Handle empty or undefined time strings gracefully
        let parsed = dayjs(timeStr, "HH:mm");
        if (!parsed.isValid()) {
          parsed = dayjs(timeStr, "hh:mm A");
        }
        return parsed.isValid() ? parsed : null;
      };

      const parsedStartTime = contest.start_time ? parseTime(contest.start_time) : null;
      const parsedEndTime = contest.end_time ? parseTime(contest.end_time) : null;

      setStartTime(parsedStartTime);
      setEndTime(parsedEndTime);

      console.log("DialogBox useEffect: Parsed start_time (dayjs object):", parsedStartTime); // DEBUG
      console.log("DialogBox useEffect: Parsed end_time (dayjs object):", parsedEndTime); // DEBUG
    }
  }, [open, action, contest]);

  const handleSubmit = async () => {
    if (action === 'announce') {
      await handler(action, undefined, undefined, { file, message });
    } else if (action === 'clone') {
      await handler(action, undefined, { title: cloneTitle, description: cloneDescription });
    } else if (action === 'update') {
      await handler(action, {
        // Format to "HH:mm" for consistency with backend expectation
        start_time: startTime ? startTime.format("HH:mm") : '',
        end_time: endTime ? endTime.format("HH:mm") : '',
      });
    }
    onClose(); // Close the dialog after submission
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle
        sx={{
          fontFamily: "'Public Sans',sans-serif",
          fontWeight: 700,
          fontSize: 20,
        }}
      >
        {action === 'announce' && 'Announce Contest'}
        {action === 'clone' && 'Clone Contest'}
        {action === 'update' && 'Update Contest Time'}
      </DialogTitle>
      <DialogContent dividers>
        {action === 'announce' && (
          <>
            <TextField
              autoFocus
              margin="dense"
              label="Announcement Message"
              type="text"
              fullWidth
              variant="outlined"
              multiline
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              sx={{ mb: 2 }}
              InputLabelProps={{
                sx: { fontFamily: "'Public Sans',sans-serif" }
              }}
              inputProps={{
                sx: { fontFamily: "'Public Sans',sans-serif" }
              }}
            />
            <Typography sx={{ fontFamily: "'Public Sans',sans-serif", mb: 1 }}>
              Upload Image (Optional)
            </Typography>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
              style={{ fontFamily: "'Public Sans',sans-serif" }}
            />
          </>
        )}
        {action === 'clone' && (
          <>
            <TextField
              autoFocus
              margin="dense"
              label="New Contest Title"
              type="text"
              fullWidth
              variant="outlined"
              value={cloneTitle}
              onChange={(e) => setCloneTitle(e.target.value)}
              sx={{ mb: 2 }}
              InputLabelProps={{
                sx: { fontFamily: "'Public Sans',sans-serif" }
              }}
              inputProps={{
                sx: { fontFamily: "'Public Sans',sans-serif" }
              }}
            />
            <TextField
              margin="dense"
              label="New Contest Description"
              type="text"
              fullWidth
              variant="outlined"
              multiline
              rows={4}
              value={cloneDescription}
              onChange={(e) => setCloneDescription(e.target.value)}
              InputLabelProps={{
                sx: { fontFamily: "'Public Sans',sans-serif" }
              }}
              inputProps={{
                sx: { fontFamily: "'Public Sans',sans-serif" }
              }}
            />
          </>
        )}
        {action === 'update' && (
          <>
            <Typography
              sx={{
                color: "rgb(99, 115, 129)",
                fontFamily: "'Public Sans',sans-serif",
                fontSize: 14,
                mb: 1
              }}
            >
              Start Time
            </Typography>
            {/* TimePickerComponent expects dayjs object and returns dayjs object */}
            <TimePickerComponent
              timeChangeHandler={(newValue: dayjs.Dayjs | null) => setStartTime(newValue)}
              value={startTime}
            />
            <Typography
              sx={{
                color: "rgb(99, 115, 129)",
                fontFamily: "'Public Sans',sans-serif",
                fontSize: 14,
                mt: 2,
                mb: 1
              }}
            >
              End Time
            </Typography>
            {/* TimePickerComponent expects dayjs object and returns dayjs object */}
            <TimePickerComponent
              timeChangeHandler={(newValue: dayjs.Dayjs | null) => setEndTime(newValue)}
              value={endTime}
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose} // Use onClose from props
          sx={{
            fontFamily: "'Public Sans',sans-serif",
            fontWeight: 600,
            color: "rgb(99, 115, 129)",
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          sx={{
            fontFamily: "'Public Sans',sans-serif",
            fontWeight: 600,
            color: "#00AB55",
          }}
        >
          {action === 'announce' && 'Announce'}
          {action === 'clone' && 'Clone'}
          {action === 'update' && 'Update'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
