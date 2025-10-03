"use client";

import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export function SubscriptionInfo() {
  return (
    <Accordion
      elevation={0}
      sx={{
        borderRadius: "8px !important",
        "&:before": { display: "none" },
        bgcolor: "white",
        mt: 3,
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          "& .MuiAccordionSummary-content": {
            my: 1.5,
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography sx={{ fontSize: "1.2rem" }}>🤔</Typography>
          <Typography variant="subtitle1" fontWeight={600}>
            Abonelik nasıl çalışır?
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
          Oluşturduğun paketin içeriğinden teslimat tarihine kadar her şeyini
          dilediğin zaman düzenleyebilirsin. Sen bir değişiklik yapmadıkça
          aboneliğin her iki ayda bir otomatik olarak yenilenir. ❤️
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}

