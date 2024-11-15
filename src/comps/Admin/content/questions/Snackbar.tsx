import { Alert, Snackbar } from "@mui/material";
import React from "react";

export default function SnackBar({ snakOpen, handleClose, addStatus }: any) {
  return (
    <div>
      <Snackbar
        open={snakOpen}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        onClose={handleClose}
        autoHideDuration={5000}
        children={
          addStatus === 200 ? (
            <Alert
              variant="filled"
              severity="success"
              sx={{ fontFamily: "'Public Sans',sans-serif" }}
            >
              Successfully added the question
            </Alert>
          ) : (
            <Alert
              variant="filled"
              severity="error"
              sx={{ fontFamily: "'Public Sans',sans-serif" }}
            >
              Failed to add the question
            </Alert>
          )
        }
      />
    </div>
  );
}
