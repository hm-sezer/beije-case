import { Box, Typography, Button } from "@mui/material";
import { PAGE_HEADER } from "@/constants/app";

export function PageHeader() {
  return (
    <Box sx={{ mb: { xs: 3, md: 4 } }}>
      {/* Title */}
      <Typography 
        variant="h5" 
        component="h1" 
        sx={{ 
          fontWeight: 700, 
          color: "text.primary",
          fontSize: { xs: "1.5rem", md: "1.75rem" },
          mb: { xs: 1.5, md: 1 }
        }}
      >
        {PAGE_HEADER.TITLE}
      </Typography>
      
      {/* Badge - Mobile Only (between title and description) */}
      <Box 
        sx={{ 
          display: { xs: "inline-flex", lg: "none" },
          alignItems: "center",
          gap: 1,
          bgcolor: "rgb(209, 237, 229)",
          px: 2,
          py: 0.75,
          borderRadius: "20px",
          mb: 2
        }}
      >
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            bgcolor: "rgb(77, 188, 168)",
          }}
        />
        <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
          2 ayda bir gönderim
        </Typography>
      </Box>
      
      {/* Description */}
      <Typography 
        variant="body1" 
        color="text.secondary"
        sx={{
          fontSize: { xs: "0.875rem", md: "1rem" },
          lineHeight: 1.6,
        }}
      >
        {PAGE_HEADER.DESCRIPTION}
      </Typography>
    </Box>
  );
}

