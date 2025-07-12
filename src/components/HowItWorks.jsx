import React from "react";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent,
  TimelineDot,
} from "@mui/lab";

import { Typography, Paper, Box } from "@mui/material";
import {
  Mouse as MouseIcon,
  QrCode as QrCodeIcon,
  Description as FormIcon,
  RocketLaunch as RocketIcon,
} from "@mui/icons-material";

const steps = [
  {
    title: "Click 'Generate QR'",
    description: "Tap the 'Generate QR' button on the homepage to begin instantly.",
    icon: <MouseIcon />,
  },
  {
    title: "Select QR Type",
    description: "Choose QR type such as URL, Text, Phone, Email, or Wi-Fi.",
    icon: <QrCodeIcon />,
  },
  {
    title: "Fill the Form",
    description: "Enter your content securely. PixQR ensures fast & encrypted QR creation.",
    icon: <FormIcon />,
  },
  {
    title: "Generate & Download",
    description: "Click Generate and download your custom QR as PNG or with premium design.",
    icon: <RocketIcon />,
  },
];

const HowToGenerateQR_MUI = () => {
  return (
    <section className="mui-qr-timeline-section">
      <Box textAlign="center" mb={4}>
        <h2 className="timeline-heading">How to Generate a QR Code</h2>
        <p className="timeline-subtitle" style={{ color: "#fff" }}>
          Follow these quick and easy steps to create a stunning, secure, and custom QR code for your business, website, or personal use.
        </p>
      </Box>

      <Timeline position="alternate">
        {steps.map((step, index) => (
          <TimelineItem key={index}>
            <TimelineOppositeContent sx={{ m: "auto 0" }}>
              <Typography variant="body2" color="gold">
                Step {index + 1}
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot sx={{ bgcolor: "#f5d442", color: "#000" }}>
                {step.icon}
              </TimelineDot>
              {index < steps.length - 1 && <TimelineConnector sx={{ bgcolor: "#f5d442" }} />}
            </TimelineSeparator>
            <TimelineContent sx={{ py: "12px", px: 2 }}>
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid #f5d44255",
                  color: "#fff",
                  backdropFilter: "blur(6px)",
                }}
              >
                <Typography variant="h6" component="span" sx={{ color: "#f5d442" }}>
                  {step.title}
                </Typography>
                <Typography>{step.description}</Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </section>
  );
};

export default HowToGenerateQR_MUI;
