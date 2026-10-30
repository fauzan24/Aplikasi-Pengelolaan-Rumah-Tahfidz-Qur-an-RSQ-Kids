import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#2E6F40",
      light: "#4E8F5E",
      dark: "#1D4F2C",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#D97706",
      light: "#F59E0B",
      dark: "#B45309",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#F8FAF8",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1A251D",
      secondary: "#5E6F61",
      disabled: "#9EADA0",
    },
    divider: "#E5ECE4",
    success: {
      main: "#16A34A",
      light: "#DCFCE7",
      dark: "#15803D",
    },
    warning: {
      main: "#D97706",
      light: "#FEF3C7",
      dark: "#B45309",
    },
    error: {
      main: "#DC2626",
      light: "#FEE2E2",
      dark: "#991B1B",
    },
    info: {
      main: "#2563EB",
      light: "#DBEAFE",
      dark: "#1D4ED8",
    },
  },
  typography: {
    fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
    h1: { fontWeight: 800, letterSpacing: "-0.03em" },
    h2: { fontWeight: 800, letterSpacing: "-0.025em" },
    h3: { fontWeight: 700, letterSpacing: "-0.02em" },
    h4: { fontWeight: 700, letterSpacing: "-0.02em" },
    h5: { fontWeight: 700, letterSpacing: "-0.015em" },
    h6: { fontWeight: 700, letterSpacing: "-0.01em" },
    subtitle1: { fontWeight: 600 },
    subtitle2: { fontWeight: 600 },
    body1: { fontSize: "0.925rem", lineHeight: 1.6 },
    body2: { fontSize: "0.85rem", lineHeight: 1.55 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: "none",
          fontWeight: 600,
          padding: "8px 18px",
          boxShadow: "none",
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            boxShadow: "0 4px 14px 0 rgba(46, 111, 64, 0.2)",
            transform: "translateY(-1px)",
          },
          "&:active": {
            transform: "translateY(0)",
          },
        },
        containedSecondary: {
          "&:hover": {
            boxShadow: "0 4px 14px 0 rgba(217, 119, 6, 0.25)",
          },
        },
        outlined: {
          borderColor: "#DCE5DC",
          "&:hover": {
            borderColor: "#2E6F40",
            backgroundColor: "rgba(46, 111, 64, 0.04)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: "1px solid #E5ECE4",
          boxShadow: "0 2px 10px rgba(26, 37, 29, 0.03)",
          transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
        rounded: {
          borderRadius: 16,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          backgroundColor: "#FFFFFF",
          "& fieldset": {
            borderColor: "#E2E9E1",
            transition: "border-color 0.2s ease",
          },
          "&:hover fieldset": {
            borderColor: "#A9BEAC",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#2E6F40",
            borderWidth: "1.5px",
          },
        },
        input: {
          fontSize: "0.875rem",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: 8,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: "#EDF2EC",
          padding: "14px 18px",
          fontSize: "0.86rem",
        },
        head: {
          fontWeight: 700,
          fontSize: "0.78rem",
          letterSpacing: "0.04em",
          color: "#46594A",
          backgroundColor: "#F4F7F3",
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          transition: "background-color 0.15s ease",
          "&:hover": {
            backgroundColor: "#F8FAF8",
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 20,
          boxShadow: "0 20px 45px -10px rgba(22, 38, 26, 0.18)",
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 8,
          backgroundColor: "#1D2820",
          fontSize: "0.75rem",
          padding: "6px 12px",
        },
      },
    },
  },
});

