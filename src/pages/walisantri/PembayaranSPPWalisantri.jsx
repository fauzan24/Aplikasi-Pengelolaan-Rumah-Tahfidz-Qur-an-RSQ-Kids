import { useState } from "react";
import {
  AccountBalanceWalletOutlined,
  ArrowBack,
  CalendarMonthOutlined,
  InfoOutlined,
} from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LayoutWalisantri from "../../components/walisantri/LayoutWalisantri";
import { dataSantriProgres } from "../../data/santriProgres";
import {
  buatStatusPembayaran,
  dataSantriSPP,
  formatRupiah,
  nominalSPP,
} from "../../data/pembayaranSPP";

function StatusPembayaran({ status }) {
  const warnaStatus = {
    Lunas: { warna: "success", label: "Lunas" },
    "Belum Lunas": { warna: "warning", label: "Belum Lunas" },
    Menunggak: { warna: "error", label: "Menunggak" },
    "Belum Jatuh Tempo": { warna: "default", label: "Belum Jatuh Tempo" },
  };
  const tampilan = warnaStatus[status];

  return (
    <Chip
      label={tampilan.label}
      color={tampilan.warna}
      size="small"
      variant={status === "Belum Jatuh Tempo" ? "outlined" : "filled"}
      sx={{ fontWeight: 700 }}
    />
  );
}

export default function PembayaranSPPWalisantri({ pengguna, onLogout }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [sekarang] = useState(() => new Date());
  const tahunSekarang = sekarang.getFullYear();
  const bulanSekarang = sekarang.getMonth() + 1;
  const santriId = pengguna?.santriId || (pengguna?.id === "WALI001" ? "RSQ006" : null);
  const santri = dataSantriSPP.find((item) => item.id === santriId);
  const profilSantri = dataSantriProgres.find((item) => item.id === santriId);
  const riwayatPembayaran = santri
    ? buatStatusPembayaran(santri, {}, tahunSekarang, bulanSekarang)
    : [];
  const jumlahTunggakan = riwayatPembayaran.filter(
    (item) => item.status === "Menunggak" || item.status === "Belum Lunas"
  ).length;
  const jumlahLunas = riwayatPembayaran.filter(
    (item) => item.status === "Lunas"
  ).length;

  return (
    <LayoutWalisantri pengguna={pengguna} onLogout={onLogout}>
      <Stack spacing={3} sx={{ width: "100%", maxWidth: 1280, mx: "auto", pb: 4 }}>
        {!santri ? (
          <Alert severity="info">
            Data pembayaran belum tersedia atau belum terhubung ke akun wali ini.
            Silakan hubungi administrator.
          </Alert>
        ) : (
          <>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ justifyContent: "space-between", alignItems: { sm: "center" } }}
            >
              <Box>
                <Button
                  startIcon={<ArrowBack />}
                  onClick={() => navigate("/walisantri/dashboard")}
                  sx={{ mb: 1, px: 0, color: "primary.main" }}
                >
                  Kembali ke Beranda
                </Button>
                <Typography variant="h5" sx={{ fontWeight: 800 }}>
                  Riwayat SPP Santri
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {santri.id} · {profilSantri?.nama || santri.nama} · Tahun {tahunSekarang}
                </Typography>
              </Box>
              <Chip
                icon={<CalendarMonthOutlined />}
                label={`${sekarang.toLocaleDateString("id-ID", { month: "long" })} ${tahunSekarang}`}
                color="primary"
                variant="outlined"
              />
            </Stack>

            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, sm: 3 },
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: `${theme.shape.borderRadius + 4}px`,
              }}
            >
              <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                <Avatar sx={{ width: 52, height: 52, bgcolor: "primary.light" }}>
                  <AccountBalanceWalletOutlined />
                </Avatar>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Nominal SPP per bulan
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 800 }}>
                    {formatRupiah(nominalSPP)}
                  </Typography>
                </Box>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={1}
                  sx={{ ml: "auto", alignItems: { xs: "flex-end", sm: "center" } }}
                >
                  <Chip label={`${jumlahLunas} bulan lunas`} color="success" size="small" />
                  <Chip
                    label={`${jumlahTunggakan} bulan perlu dibayar`}
                    color={jumlahTunggakan ? "warning" : "default"}
                    size="small"
                  />
                </Stack>
              </Stack>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, sm: 3 },
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: `${theme.shape.borderRadius + 4}px`,
              }}
            >
              <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 2 }}>
                <InfoOutlined color="primary" fontSize="small" />
                <Typography variant="body2" color="text.secondary">
                  Riwayat status pembayaran setiap bulan pada tahun {tahunSekarang}.
                </Typography>
              </Stack>
              <TableContainer>
                <Table sx={{ minWidth: 520 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>BULAN</TableCell>
                      <TableCell align="right">NOMINAL</TableCell>
                      <TableCell align="center">STATUS PEMBAYARAN</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {riwayatPembayaran.map((item) => (
                      <TableRow key={`${item.tahun}-${item.bulan}`} hover>
                        <TableCell sx={{ fontWeight: 600 }}>
                          {item.namaBulan} {item.tahun}
                        </TableCell>
                        <TableCell align="right">{formatRupiah(nominalSPP)}</TableCell>
                        <TableCell align="center">
                          <StatusPembayaran status={item.status} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </>
        )}
      </Stack>
    </LayoutWalisantri>
  );
}
