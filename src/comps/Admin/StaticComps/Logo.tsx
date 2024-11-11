import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import logo from "../../../assets/logo.jpg";
export default function Logo() {
  return (
    <Box sx={{ mb: 2 }}>
      <Card
        sx={{
          width: "90%",
          bgcolor: "rgba(145, 158, 171, 0.12)",
          borderRadius: 4,

          cursor: "pointer",
          height: 70,
        }}
        elevation={0}
      >
        <CardContent
          sx={{
            // padding: 0,
            height: "100%",
            display: "flex",
            alignItems: "center",
            gap: 2,
            // bgcolor: "black",
          }}
        >
          <Box>
            <img
              src={logo}
              alt="log"
              style={{
                width: 50,
                height: 50,
                borderRadius: "50%",
              }}
            />
          </Box>

          <Typography
            sx={{
              fontSize: 20,
              fontWeight: 700,
              color: "#0F5385",
              fontFamily: "'Public Sans',sans-serif",
            }}
          >
            Victory
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
