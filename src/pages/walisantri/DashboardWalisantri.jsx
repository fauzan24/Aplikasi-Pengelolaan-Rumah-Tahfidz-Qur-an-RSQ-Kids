import { useState } from "react";
import {
  AccountBalanceWalletOutlined,
  CalendarMonthOutlined,
  CheckCircleRounded,
  MenuBook,
  ScheduleOutlined,
  TrendingUpRounded,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import LayoutWalisantri from "../../components/walisantri/LayoutWalisantri";

const ringkasanDummyWali = [
  {
    label: "Progres Belajar",
    nilai: "4 Catatan",
    keterangan: "4 dari 4 kategori belajar",
    icon: TrendingUpRounded,
    warna: "primary",
    latar: (theme) => `${theme.palette.primary.main}14`,
  },
  {
    label: "Kelas",
    nilai: "Pagi A",
    keterangan: "08.00 - 09.30 WIB",
    icon: MenuBook,
    warna: "info",
    latar: (theme) => `${theme.palette.info.main}14`,
  },
  {
    label: "Tagihan SPP",
    nilai: "Rp50.000",
    keterangan: "SPP bulan berjalan",
    icon: AccountBalanceWalletOutlined,
    warna: "secondary",
    latar: (theme) => `${theme.palette.secondary.main}1A`,
  },
];

const riwayatPembayaranDummy = [
  "SPP Bulan Maret 2026",
  "SPP Bulan April 2026",
  "SPP Bulan Mei 2026",
];

export default function DashboardWalisantri({ pengguna, onLogout }) {
  const theme = useTheme();
  const namaPengguna = pengguna?.nama || "Bapak Ahmad";
  const [sekarang] = useState(() => new Date());

  return (
    <LayoutWalisantri pengguna={pengguna} onLogout={onLogout}>
      <Stack spacing={3.5} sx={{ width: "100%", maxWidth: 1280, mx: "auto", pb: 4 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: `${theme.shape.borderRadius + 8}px`,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            color: theme.palette.primary.contrastText,
            position: "relative",
            overflow: "hidden",
            boxShadow: `0 10px 30px ${theme.palette.primary.dark}26`,
          }}
        >
          <Chip
            label="PORTAL WALI SANTRI"
            size="small"
            sx={{
              mb: 1.5,
              bgcolor: "rgba(255,255,255,0.15)",
              color: theme.palette.secondary.light,
              border: "1px solid rgba(255,255,255,0.25)",
              fontSize: "0.72rem",
              fontWeight: 800,
              letterSpacing: "0.06em",
            }}
          />
          <Typography variant="h4" sx={{ mb: 0.75, color: "inherit", fontWeight: 800 }}>
            Ahlan wa Sahlan, {namaPengguna} 👋
          </Typography>
          <Typography variant="body2" sx={{ maxWidth: 620, color: "rgba(255,255,255,0.85)" }}>
            Pantau perkembangan belajar, jadwal kelas, dan pembayaran SPP ananda dalam satu halaman.
          </Typography>
        </Paper>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(1, minmax(0, 1fr))",
              sm: "repeat(2, minmax(0, 1fr))",
              lg: "repeat(3, minmax(0, 1fr))",
            },
            gap: 2.5,
          }}
        >
          {ringkasanDummyWali.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.label} sx={{ p: 2.5, borderRadius: `${theme.shape.borderRadius + 4}px` }}>
                <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
                  <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 2 }}>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography variant="body2" sx={{ mb: 0.5, color: "text.secondary", fontWeight: 600 }}>
                        {item.label}
                      </Typography>
                      <Typography variant="h5" sx={{ color: "text.primary", fontWeight: 800 }}>
                        {item.nilai}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {item.keterangan}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: 46,
                        height: 46,
                        flexShrink: 0,
                        display: "grid",
                        placeItems: "center",
                        borderRadius: `${theme.shape.borderRadius}px`,
                        color: theme.palette[item.warna].main,
                        bgcolor: item.latar(theme),
                      }}
                    >
                      <Icon />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            );
          })}
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.45fr 1fr" },
            alignItems: "start",
            gap: 2.5,
          }}
        >
          <Paper
            component="section"
            aria-labelledby="jadwal-hari-ini"
            elevation={0}
            sx={{ p: { xs: 2.5, sm: 3 }, borderRadius: `${theme.shape.borderRadius + 4}px` }}
          >
            <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", mb: 2.5 }}>
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  display: "grid",
                  placeItems: "center",
                  borderRadius: `${theme.shape.borderRadius}px`,
                  color: "primary.main",
                  bgcolor: `${theme.palette.primary.main}14`,
                }}
              >
                <CalendarMonthOutlined />
              </Box>
              <Box>
                <Typography id="jadwal-hari-ini" component="h2" variant="h6">
                  Jadwal Belajar Hari Ini
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {sekarang.toLocaleDateString("id-ID", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </Typography>
              </Box>
            </Stack>

            <Card
              variant="outlined"
              sx={{
                p: 2,
                borderRadius: `${theme.shape.borderRadius}px`,
                bgcolor: "background.default",
                boxShadow: "none",
              }}
            >
              <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                <ScheduleOutlined color="primary" />
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  08.00 - 09.30
                </Typography>
                <Chip label="Pagi A" size="small" color="primary" variant="outlined" sx={{ ml: "auto" }} />
              </Stack>
            </Card>
          </Paper>

          <Paper
            component="section"
            aria-labelledby="riwayat-pembayaran"
            elevation={0}
            sx={{ p: { xs: 2.5, sm: 3 }, borderRadius: `${theme.shape.borderRadius + 4}px` }}
          >
            <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", mb: 2.5 }}>
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  display: "grid",
                  placeItems: "center",
                  borderRadius: `${theme.shape.borderRadius}px`,
                  color: "secondary.dark",
                  bgcolor: `${theme.palette.secondary.main}1A`,
                }}
              >
                <AccountBalanceWalletOutlined />
              </Box>
              <Typography id="riwayat-pembayaran" component="h2" variant="h6">
                Riwayat Pembayaran
              </Typography>
            </Stack>
            <Stack spacing={1}>
              {riwayatPembayaranDummy.map((pembayaran) => (
                <Card
                  key={pembayaran}
                  variant="outlined"
                  sx={{
                    p: 1.5,
                    borderRadius: `${theme.shape.borderRadius}px`,
                    boxShadow: "none",
                    "&:hover": { bgcolor: "background.default" },
                  }}
                >
                  <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                    <CalendarMonthOutlined sx={{ color: "text.secondary", fontSize: 20 }} />
                    <Typography variant="body2" sx={{ flex: 1, fontWeight: 600 }}>
                      {pembayaran}
                    </Typography>
                    <CheckCircleRounded color="success" aria-label="Lunas" />
                  </Stack>
                </Card>
              ))}
            </Stack>
          </Paper>
        </Box>
      </Stack>
    </LayoutWalisantri>
  );
}
