import { useState } from "react";
import {
  ArrowBack,
  CalendarMonthOutlined,
  EditOutlined,
  InfoOutlined,
  Search,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Chip,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import LayoutAdmin from "../../components/admin/LayoutAdmin";

const nominalSPP = 50000;
const bulanIndonesia = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const dataSantriSPP = [
  { id: "RSQ001", nama: "Jauza Askana", bulanBelumDibayar: [4, 8] },
  { id: "RSQ002", nama: "Dinda Azzahra", bulanBelumDibayar: [2, 5, 10] },
  { id: "RSQ004", nama: "Dede Ridho", bulanBelumDibayar: [6] },
  { id: "RSQ005", nama: "Kalila Haura", bulanBelumDibayar: [1, 10] },
  { id: "RSQ006", nama: "Fauzan", bulanBelumDibayar: [3, 9] },
];

const formatRupiah = (nilai) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(nilai);

function buatStatusPembayaran(santri, pembayaran, tahun, bulanSekarang) {
  return bulanIndonesia.map((namaBulan, index) => {
    const bulan = index + 1;
    const sudahDibayar = pembayaran[santri.id]?.[bulan] ??
      (bulan <= bulanSekarang && !santri.bulanBelumDibayar.includes(bulan));

    let status;
    if (bulan > bulanSekarang) {
      status = "Belum Jatuh Tempo";
    } else if (sudahDibayar) {
      status = "Lunas";
    } else if (bulan === bulanSekarang) {
      status = "Belum Lunas";
    } else {
      status = "Menunggak";
    }

    return { bulan, namaBulan, tahun, status };
  });
}

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

export default function PembayaranSPP({ onNavigate, onLogout }) {
  const { santriId } = useParams();
  const navigate = useNavigate();
  const [sekarang] = useState(() => new Date());
  const tahunSekarang = sekarang.getFullYear();
  const bulanSekarang = sekarang.getMonth() + 1;
  const namaBulanSekarang = bulanIndonesia[sekarang.getMonth()];
  const [pembayaran, setPembayaran] = useState({});
  const [kataKunci, setKataKunci] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua Status");
  const [konfirmasiStatus, setKonfirmasiStatus] = useState(null);

  const santriDetail = dataSantriSPP.find((santri) => santri.id === santriId);
  const detailPembayaran = santriDetail
    ? buatStatusPembayaran(santriDetail, pembayaran, tahunSekarang, bulanSekarang)
    : [];
  const dataTampil = dataSantriSPP
    .map((santri) => {
      const riwayat = buatStatusPembayaran(
        santri,
        pembayaran,
        tahunSekarang,
        bulanSekarang
      );
      const statusBulanIni = riwayat[bulanSekarang - 1].status;
      const jumlahTunggakan = riwayat.filter(
        (item) => item.status === "Menunggak" || item.status === "Belum Lunas"
      ).length;

      return {
        ...santri,
        statusBulanIni,
        tunggakan: jumlahTunggakan * nominalSPP,
      };
    })
    .filter((santri) => {
      const cocokKataKunci = `${santri.id} ${santri.nama}`
        .toLowerCase()
        .includes(kataKunci.trim().toLowerCase());
      const cocokStatus =
        filterStatus === "Semua Status" ||
        (filterStatus === "Lunas" && santri.statusBulanIni === "Lunas") ||
        (filterStatus === "Belum Lunas" &&
          santri.statusBulanIni !== "Lunas");

      return cocokKataKunci && cocokStatus;
    });

  const ubahStatusPembayaran = (idSantri, bulan, statusSaatIni) => {
    setPembayaran((data) => ({
      ...data,
      [idSantri]: {
        ...data[idSantri],
        [bulan]: statusSaatIni !== "Lunas",
      },
    }));
    setKonfirmasiStatus(null);
  };

  const mintaKonfirmasiStatus = (santri, bulan, status) => {
    setKonfirmasiStatus({ santri, bulan, status });
  };

  const konfirmasiPerubahanStatus = () => {
    if (!konfirmasiStatus) return;

    ubahStatusPembayaran(
      konfirmasiStatus.santri.id,
      konfirmasiStatus.bulan,
      konfirmasiStatus.status
    );
  };

  const bukaDetail = (id) =>
    navigate(`/admin/pembayaran-spp/${encodeURIComponent(id)}`);

  return (
    <LayoutAdmin onNavigate={onNavigate} onLogout={onLogout}>
      <Stack spacing={3} sx={{ width: "100%", maxWidth: 1280, mx: "auto", pb: 4 }}>
        {santriId && !santriDetail ? (
          <Alert
            severity="error"
            action={
              <Button color="inherit" size="small" onClick={() => navigate("/admin/pembayaran-spp")}>
                Kembali
              </Button>
            }
          >
            Data pembayaran untuk santri dengan NIS {santriId} tidak ditemukan.
          </Alert>
        ) : santriDetail ? (
          <>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              alignItems={{ sm: "center" }}
              justifyContent="space-between"
            >
              <Box>
                <Button
                  startIcon={<ArrowBack />}
                  onClick={() => navigate("/admin/pembayaran-spp")}
                  sx={{ mb: 1, px: 0, color: "primary.main" }}
                >
                  Kembali ke Pembayaran SPP
                </Button>
                <Typography variant="h5" sx={{ fontWeight: 800, color: "text.primary" }}>
                  Riwayat SPP Santri
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {santriDetail.id} · {santriDetail.nama} · Tahun {tahunSekarang}
                </Typography>
              </Box>
              <Chip
                icon={<CalendarMonthOutlined />}
                label={`${namaBulanSekarang} ${tahunSekarang}`}
                color="primary"
                variant="outlined"
              />
            </Stack>

            <Paper
              elevation={0}
              sx={{ p: { xs: 2, sm: 3 }, border: "1px solid", borderColor: "divider" }}
            >
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                <InfoOutlined color="primary" fontSize="small" />
                <Typography variant="body2" color="text.secondary">
                  Status pembayaran untuk seluruh bulan pada tahun {tahunSekarang}.
                </Typography>
              </Stack>
              <TableContainer>
                <Table sx={{ minWidth: 520 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>BULAN</TableCell>
                      <TableCell align="right">NOMINAL</TableCell>
                      <TableCell align="center">STATUS PEMBAYARAN</TableCell>
                      <TableCell align="center">AKSI</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {detailPembayaran.map((item) => (
                      <TableRow key={item.bulan}>
                        <TableCell sx={{ fontWeight: 600 }}>
                          {item.namaBulan} {item.tahun}
                        </TableCell>
                        <TableCell align="right">{formatRupiah(nominalSPP)}</TableCell>
                        <TableCell align="center">
                          <StatusPembayaran status={item.status} />
                        </TableCell>
                        <TableCell align="center">
                          <Tooltip
                            title={
                              item.status === "Lunas"
                                ? "Batalkan status lunas"
                                : "Tandai pembayaran lunas"
                            }
                          >
                            <span>
                              <IconButton
                                aria-label={
                                  item.status === "Lunas"
                                    ? `Batalkan status lunas ${item.namaBulan}`
                                    : `Tandai ${item.namaBulan} lunas`
                                }
                                size="small"
                                disabled={item.status === "Belum Jatuh Tempo"}
                                onClick={() =>
                                  mintaKonfirmasiStatus(
                                    santriDetail,
                                    item.bulan,
                                    item.status
                                  )
                                }
                                sx={{
                                  color: "primary.main",
                                  backgroundColor: "action.hover",
                                  "&:hover": { backgroundColor: "primary.light", color: "common.white" },
                                }}
                              >
                                <EditOutlined fontSize="small" />
                              </IconButton>
                            </span>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </>
        ) : (
          <>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              alignItems={{ sm: "center" }}
              justifyContent="space-between"
            >
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 800, color: "text.primary" }}>
                  Pembayaran SPP
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Kelola pembayaran SPP santri untuk {namaBulanSekarang} {tahunSekarang}.
                </Typography>
              </Box>
            </Stack>

            <Paper
              elevation={0}
              sx={{ overflow: "hidden", border: "1px solid", borderColor: "divider" }}
            >
              <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={2}
                sx={{ p: { xs: 2, sm: 2.5 } }}
              >
                <TextField
                  size="small"
                  fullWidth
                  value={kataKunci}
                  onChange={(event) => setKataKunci(event.target.value)}
                  placeholder="Cari berdasarkan nama atau NIS..."
                  aria-label="Cari berdasarkan nama atau NIS"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search fontSize="small" color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  select
                  size="small"
                  value={filterStatus}
                  onChange={(event) => setFilterStatus(event.target.value)}
                  sx={{ minWidth: { xs: "100%", md: 190 } }}
                  label="Status pembayaran"
                >
                  {["Semua Status", "Lunas", "Belum Lunas"].map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>

              <TableContainer>
                <Table sx={{ minWidth: 760 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" sx={{ width: 64 }}>NO</TableCell>
                      <TableCell>NIS</TableCell>
                      <TableCell>NAMA SANTRI</TableCell>
                      <TableCell>BULAN</TableCell>
                      <TableCell align="right">NOMINAL</TableCell>
                      <TableCell align="right">TUNGGAKAN</TableCell>
                      <TableCell align="center">STATUS</TableCell>
                      <TableCell align="center">AKSI</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataTampil.length > 0 ? (
                      dataTampil.map((santri, index) => (
                        <TableRow key={santri.id} hover>
                          <TableCell align="center" sx={{ color: "text.secondary" }}>
                            {index + 1}
                          </TableCell>
                          <TableCell sx={{ fontWeight: 700, color: "primary.main" }}>
                            {santri.id}
                          </TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>{santri.nama}</TableCell>
                          <TableCell>{namaBulanSekarang} {tahunSekarang}</TableCell>
                          <TableCell align="right">{formatRupiah(nominalSPP)}</TableCell>
                          <TableCell align="right">
                            <Typography
                              component="span"
                              variant="body2"
                              sx={{
                                color: santri.tunggakan ? "error.main" : "text.secondary",
                                fontWeight: santri.tunggakan ? 700 : 400,
                              }}
                            >
                              {formatRupiah(santri.tunggakan)}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <StatusPembayaran status={santri.statusBulanIni} />
                          </TableCell>
                          <TableCell align="center">
                            <Stack direction="row" spacing={0.5} justifyContent="center">
                              <Button
                                size="small"
                                variant="outlined"
                                onClick={() => bukaDetail(santri.id)}
                              >
                                Detail
                              </Button>
                              <Tooltip
                                title={
                                  santri.statusBulanIni === "Lunas"
                                    ? "Batalkan status lunas bulan ini"
                                    : "Tandai pembayaran bulan ini lunas"
                                }
                              >
                                <IconButton
                                  aria-label={
                                    santri.statusBulanIni === "Lunas"
                                      ? `Batalkan pembayaran ${santri.nama}`
                                      : `Edit pembayaran ${santri.nama}`
                                  }
                                  size="small"
                                  onClick={() =>
                                    mintaKonfirmasiStatus(
                                      santri,
                                      bulanSekarang,
                                      santri.statusBulanIni
                                    )
                                  }
                                  sx={{
                                    color: "primary.main",
                                    backgroundColor: "action.hover",
                                  }}
                                >
                                  <EditOutlined fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Stack>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} align="center" sx={{ py: 6 }}>
                          <Typography color="text.secondary">
                            Tidak ada data pembayaran yang sesuai.
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </>
        )}
      </Stack>
      <Dialog
        open={Boolean(konfirmasiStatus)}
        onClose={() => setKonfirmasiStatus(null)}
        aria-labelledby="konfirmasi-status-title"
        aria-describedby="konfirmasi-status-description"
      >
        <DialogTitle id="konfirmasi-status-title">
          Konfirmasi perubahan status
        </DialogTitle>
        <DialogContent>
          <Typography id="konfirmasi-status-description" color="text.secondary">
            {konfirmasiStatus?.status === "Lunas"
              ? `Batalkan status lunas SPP ${bulanIndonesia[(konfirmasiStatus?.bulan ?? 1) - 1]} ${tahunSekarang} untuk ${konfirmasiStatus?.santri.nama}?`
              : `Tandai SPP ${bulanIndonesia[(konfirmasiStatus?.bulan ?? 1) - 1]} ${tahunSekarang} untuk ${konfirmasiStatus?.santri.nama} sebagai lunas?`}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setKonfirmasiStatus(null)}>Batal</Button>
          <Button
            variant="contained"
            color={konfirmasiStatus?.status === "Lunas" ? "error" : "primary"}
            onClick={konfirmasiPerubahanStatus}
          >
            Ya, ubah status
          </Button>
        </DialogActions>
      </Dialog>
    </LayoutAdmin>
  );
}
