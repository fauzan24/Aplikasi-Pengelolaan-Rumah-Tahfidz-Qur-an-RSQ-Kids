import {
  Assignment,
  MenuBook,
  PeopleAlt,
  School,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
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
} from "@mui/material";
import LayoutAdmin from "../../components/admin/LayoutAdmin";

const ringkasan = [
  { label: "Total Santri", jumlah: 20, icon: PeopleAlt, warna: "#5A734E", latar: "#EFF3EA" },
  { label: "Total Pengajar", jumlah: 4, icon: School, warna: "#6483BD", latar: "#EDF2FB" },
  { label: "Total Kelas", jumlah: 2, icon: MenuBook, warna: "#B18A4C", latar: "#F8F1E2" },
  { label: "Daftar Tunggu", jumlah: 3, icon: Assignment, warna: "#C47B48", latar: "#FAEEE5" },
];

const pendaftaranTerbaru = [
  { nama: "Raffa Fadilla", tanggal: "27 Maret 2026", status: "Menunggu" },
  { nama: "Aisyah Putri", tanggal: "25 Maret 2026", status: "Menunggu" },
  { nama: "Nabila Rahma", tanggal: "15 Maret 2026", status: "Diterima" },
  { nama: "Muhammad Abi", tanggal: "13 Maret 2026", status: "Diterima" },
  { nama: "Ahmad Nabil", tanggal: "10 Maret 2026", status: "Diterima" },
];

export default function DashboardAdmin({ onNavigate, onLogout }) {
  return (
    <LayoutAdmin
      onNavigate={onNavigate}
      onLogout={onLogout}
    >
      <Stack spacing={3} sx={{ width: "100%", minWidth: 0, pb: 3 }}>
        <Box>
          <Typography
            component="h1"
            variant="h5"
            fontWeight={800}
            color="#28352C"
          >
            Selamat Datang, Admin
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Ringkasan aktivitas Rumah Tahfidz Qur'an RSQ-Kids.
          </Typography>
        </Box>

        <Box
          aria-label="Ringkasan data"
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, minmax(0, 1fr))",
              lg: "repeat(4, minmax(0, 1fr))",
            },
            gap: 1.75,
          }}
        >
          {ringkasan.map(({ label, jumlah, icon: Icon, warna, latar }) => (
            <Card
              key={label}
              variant="outlined"
              sx={{
                minWidth: 0,
                borderColor: "#E9E6DD",
                borderRadius: 2,
                boxShadow: "0 2px 5px rgba(40,53,44,.025)",
              }}
            >
              <CardContent sx={{ p: { xs: 1.5, sm: 2 }, "&:last-child": { pb: { xs: 1.5, sm: 2 } } }}>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ alignItems: "center", justifyContent: "space-between" }}
                >
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: 11, sm: 12 } }}>
                    {label}
                  </Typography>
                  <Box
                    sx={{
                      width: 38,
                      height: 38,
                      display: "grid",
                      placeItems: "center",
                      flex: "0 0 auto",
                      borderRadius: 2,
                      backgroundColor: latar,
                      color: warna,
                    }}
                  >
                    <Icon fontSize="small" />
                  </Box>
                </Stack>
                <Typography
                  variant="h4"
                  fontWeight={800}
                  color="#28352C"
                  sx={{ mt: 1.5, fontSize: { xs: 25, sm: 30 } }}
                >
                  {jumlah}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Paper
          variant="outlined"
          sx={{
            overflow: "hidden",
            borderColor: "#E9E6DD",
            borderRadius: 2,
            boxShadow: "0 2px 5px rgba(40,53,44,.025)",
          }}
        >
          <Box sx={{ px: { xs: 2, sm: 2.75 }, py: 2 }}>
            <Typography component="h2" variant="h6" fontWeight={800} color="#28352C">
              Pendaftaran Terbaru
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontSize: 12 }}>
              Periksa status pendaftaran santri yang masuk.
            </Typography>
          </Box>

          <TableContainer sx={{ overflowX: "auto" }}>
            <Table aria-label="Pendaftaran terbaru" sx={{ minWidth: 580 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#5A734E" }}>
                  {["No", "Nama Santri", "Tanggal Daftar", "Status"].map((judul) => (
                    <TableCell
                      key={judul}
                      align={judul === "No" ? "center" : "left"}
                      sx={{ color: "#fff", fontSize: 11, fontWeight: 700, whiteSpace: "nowrap" }}
                    >
                      {judul}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {pendaftaranTerbaru.map((pendaftaran, index) => {
                  const diterima = pendaftaran.status === "Diterima";

                  return (
                    <TableRow key={pendaftaran.nama} hover>
                      <TableCell align="center" sx={{ width: 55, color: "#A1A69E", fontSize: 12 }}>
                        {index + 1}.
                      </TableCell>
                      <TableCell sx={{ color: "#28352C", fontSize: 12, fontWeight: 600 }}>
                        {pendaftaran.nama}
                      </TableCell>
                      <TableCell sx={{ color: "#5D685D", fontSize: 12, whiteSpace: "nowrap" }}>
                        {pendaftaran.tanggal}
                      </TableCell>
                      <TableCell>
                        <Chip
                          size="small"
                          label={pendaftaran.status}
                          sx={{
                            height: 24,
                            backgroundColor: diterima ? "#EDFBF5" : "#FFF7E8",
                            color: diterima ? "#218365" : "#A96A09",
                            fontSize: 10,
                            fontWeight: 700,
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ px: { xs: 2, sm: 2.75 }, py: 1.5, borderTop: "1px solid #ECEAE3", backgroundColor: "#FDFCF9" }}>
            <Typography variant="caption" color="text.secondary">
              Menampilkan {pendaftaranTerbaru.length} pendaftaran terbaru
            </Typography>
          </Box>
        </Paper>
      </Stack>
    </LayoutAdmin>
  );
}