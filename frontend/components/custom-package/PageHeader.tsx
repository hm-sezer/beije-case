import { Box, Typography, Button } from "@mui/material";

export function PageHeader() {
  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 700, color: "text.primary" }}>
          Kendi Paketini Oluştur
        </Typography>
        <Button
          variant="text"
          sx={{
            textTransform: "none",
            color: "text.secondary",
            "&:hover": { color: "text.primary" },
          }}
        >
          Nasıl Çalışır?
        </Button>
      </Box>
      <Typography variant="body1" color="text.secondary">
        Tercih ve ihtiyaçların doğrultusunda seçeceğin ürünlerden ve miktarlardan, sana özel bir paket oluşturalım.
      </Typography>
    </Box>
  );
}

