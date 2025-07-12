import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import "../styles/ComingSoonDialog.css";

const ComingSoonDialog = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className="launch-dialog"
      PaperProps={{
        className: "dialog-paper",
        sx: {
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          border: "1px solid rgba(245, 212, 66, 0.3)",
        },
      }}
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={1}>
            <RocketLaunchIcon sx={{ color: "#f5d442", fontSize: "2rem", animation: "bounce 1s infinite" }} />
            <Typography variant="h6" sx={{ color: "#f5d442" }}>
              We Are Launching Soon!
            </Typography>
          </Box>
          <IconButton onClick={handleClose}>
            <CloseIcon sx={{ color: "#fff" }} />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Typography variant="body1" sx={{ color: "#eee", mb: 2 }}>
          🚀 PixQR Premium is coming soon with new features like:
        </Typography>

      

        <Typography variant="body2" sx={{ color: "#aaa", mt: 2 }}>
          Stay tuned! Expected launch: <strong>August 2025</strong> 🚀
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default ComingSoonDialog;
