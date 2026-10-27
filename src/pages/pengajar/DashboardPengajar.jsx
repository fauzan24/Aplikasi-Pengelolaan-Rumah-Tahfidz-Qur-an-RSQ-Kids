
import { useMemo, useState } from "react";
import {
  Add,
  AssignmentTurnedIn,
  CheckCircle,
  Download,
  MenuBook,
  PeopleAlt,
  ReportProblem,
  Search,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
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
  Typography,
} from "@mui/material";
import LayoutPengajar from "../../components/pengajar/LayoutPengajar";

const dataAwal = [
  {
    id: "RSQ001",
    nama: "Jauza Askana",
    kelas: "Pagi",
    nilai: 89,
    lengkap: true,
  },
  {
    id: "RSQ002",
    nama: "Dinda Azzahra",
    kelas: "Pagi",
    nilai: 89,
    lengkap: true,
  },
  {
    id: "RSQ003",
    nama: "Raffa Fadila",
    kelas: "Pagi",
    nilai: 0,
    lengkap: false,
  },
  {
    id: "RSQ004",
    nama: "Dede Ridho",
    kelas: "Pagi",
    nilai: 88,
    lengkap: true,
  },
  {
    id: "RSQ005",
    nama: "Kalila Haura",
    kelas: "Pagi",
    nilai: 89,
    lengkap: true,
  },
  {
    id: "RSQ006",
    nama: "Fauzan Najib Ali",
    kelas: "Pagi",
    nilai: 89,
    lengkap: true,
  },
  {
    id: "RSQ007",
    nama: "Muhammad Fikri",
    kelas: "Pagi",
    nilai: 88,
    lengkap: true,
  },
  {
    id: "RSQ008",
    nama: "Aisyah Putri",
    kelas: "Sore",
    nilai: 89,
    lengkap: true,
  },
  {
    id: "RSQ009",
    nama: "Ahmad Rizky",
    kelas: "Sore",
    nilai: 88,
    lengkap: true,
  },
  {
    id: "RSQ010",
    nama: "Zahra Nabila",
    kelas: "Sore",
    nilai: 90,
    lengkap: true,
  },
];

const warnaKartu = {
  hijau: { warna: "#5A734E", latar: "#EFF3EA" },
  kuning: { warna: "#B18A4C", latar: "#F8F1E2" },
  biru: { warna: "#6483BD", latar: "#EDF2FB" },
  jingga: { warna: "#C47B48", latar: "#FAEEE5" },
};

export default function DashboardPengajar({ onLogout, onNavigate }) {
  const [keyword, setKeyword] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua Status");

  const jumlahLengkap = dataAwal.filter((santri) => santri.lengkap).length;
  const jumlahBelum = dataAwal.length - jumlahLengkap;

  const dataTampil = useMemo(() => {
    return dataAwal.filter((santri) => {
      const kataKunci = keyword.toLowerCase();

      const cocokNama =
        santri.nama.toLowerCase().includes(kataKunci) ||
        santri.id.toLowerCase().includes(kataKunci);

      const cocokStatus =
        filterStatus === "Semua Status" ||
        (filterStatus === "Lengkap" && santri.lengkap) ||
        (filterStatus === "Belum Lengkap" && !santri.lengkap);

      return cocokNama && cocokStatus;
    });
  }, [keyword, filterStatus]);

  const unduhRekap = () => {
    const header = ["NIS", "Nama Santri", "Kelas", "Nilai", "Status"];

    const rows = dataTampil.map((santri) => [
      santri.id,
      santri.nama,
      santri.kelas,
      santri.nilai || "-",
      santri.lengkap ? "Lengkap" : "Belum Lengkap",
    ]);

    const csv = [header, ...rows]
      .map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "rekap-santri-rsq-kids.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const kartu = [
    {
      label: "Total Santri",
      angka: dataAwal.length,
      deskripsi: "Santri dalam kelas",
      badge: "Aktif",
      icon: PeopleAlt,
      warna: "hijau",
    },
    {
      label: "Kelas Diampu",
      angka: 2,
      deskripsi: "Kelas Pagi A & Kelas Sore A",
      icon: MenuBook,
      warna: "kuning",
    },
    {
      label: "Nilai Lengkap",
      angka: `${jumlahLengkap}/${dataAwal.length}`,
      deskripsi: "Data nilai santri",
      badge: "Tersimpan",
      icon: CheckCircle,
      warna: "biru",
    },
    {
      label: "Belum Lengkap",
      angka: jumlahBelum,
      deskripsi: "Perlu ditindaklanjuti",
      badge: "Periksa",
      icon: ReportProblem,
      warna: "jingga",
    },
  ];

  return (
    <LayoutPengajar
      onNavigate={onNavigate}
      onLogout={onLogout}
    >
      <Stack spacing={3} sx={{ width: "100%", minWidth: 0, pb: 3 }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          sx={{
            alignItems: { md: "center" },
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography
              component="h1"
              variant="h5"
              fontWeight={800}
              color="#28352C"
            >
              Selamat Datang, Pengajar 👋
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              Pantau perkembangan santri, nilai, dan jadwal mengajar kamu hari ini.
            </Typography>
          </Box>

          <Stack
            direction="row"
            spacing={1}
            sx={{ width: { xs: "100%", md: "auto" } }}
          >
            <Button
              variant="outlined"
              startIcon={<Download />}
              onClick={unduhRekap}
              sx={{
                flex: { xs: 1, md: "initial" },
                minHeight: 40,
                borderColor: "#E2E0D6",
                borderRadius: 2.5,
                color: "#566752",
                fontSize: 12,
                textTransform: "none",
              }}
            >
              Unduh Rekap
            </Button>

            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => onNavigate?.("Input Nilai")}
              sx={{
                flex: { xs: 1, md: "initial" },
                minHeight: 40,
                borderRadius: 2.5,
                backgroundColor: "#5A734E",
                fontSize: 12,
                textTransform: "none",
                "&:hover": { backgroundColor: "#30442E" },
              }}
            >
              Input Nilai
            </Button>
          </Stack>
        </Stack>

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
          {kartu.map(
            ({ label, angka, deskripsi, badge, icon: Icon, warna }) => (
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
                <CardContent
                  sx={{
                    p: { xs: 1.5, sm: 2 },
                    "&:last-child": { pb: { xs: 1.5, sm: 2 } },
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: { xs: 11, sm: 12 } }}
                    >
                      {label}
                    </Typography>

                    <Box
                      sx={{
                        width: { xs: 34, sm: 42 },
                        height: { xs: 34, sm: 42 },
                        display: "grid",
                        placeItems: "center",
                        flex: "0 0 auto",
                        borderRadius: 2,
                        backgroundColor: warnaKartu[warna].latar,
                        color: warnaKartu[warna].warna,
                      }}
                    >
                      <Icon fontSize="small" />
                    </Box>
                  </Stack>

                  <Typography
                    variant="h4"
                    fontWeight={800}
                    color="#28352C"
                    sx={{
                      mt: 1.5,
                      mb: 1,
                      fontSize: { xs: 25, sm: 30 },
                    }}
                  >
                    {angka}
                  </Typography>

                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={0.75}
                    sx={{
                      alignItems: { sm: "center" },
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ fontSize: 11 }}
                    >
                      {deskripsi}
                    </Typography>

                    {badge && (
                      <Chip
                        size="small"
                        label={badge}
                        sx={{
                          alignSelf: { xs: "flex-start", sm: "auto" },
                          height: 24,
                          backgroundColor:
                            warna === "jingga" ? "#FFF9EA" : "#EEF3E8",
                          color:
                            warna === "jingga" ? "#A96A09" : "#628255",
                          border:
                            warna === "jingga"
                              ? "1px solid #F6D58A"
                              : "none",
                          fontSize: 10,
                        }}
                      />
                    )}
                  </Stack>
                </CardContent>
              </Card>
            )
          )}
        </Box>

        <Paper
          variant="outlined"
          sx={{
            width: "100%",
            overflow: "hidden",
            borderColor: "#E9E6DD",
            borderRadius: 2,
            boxShadow: "0 2px 5px rgba(40,53,44,.025)",
          }}
        >
          <Stack
            direction={{ xs: "column", lg: "row" }}
            spacing={2}
            sx={{
              alignItems: { lg: "center" },
              justifyContent: "space-between",
              px: { xs: 2, sm: 2.75 },
              py: 2,
            }}
          >
            <Box>
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  alignItems: "center",
                  mb: 0.75,
                  flexWrap: "wrap",
                }}
              >
                <Typography
                  component="h2"
                  variant="h6"
                  fontWeight={800}
                  color="#28352C"
                >
                  Daftar Santri
                </Typography>

                <Chip
                  size="small"
                  label={`${dataAwal.length} Santri`}
                  sx={{
                    height: 24,
                    backgroundColor: "#F0F3EB",
                    color: "#5A734E",
                    fontSize: 10,
                  }}
                />
              </Stack>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: 12 }}
              >
                Pantau nilai dan kelengkapan data santri yang kamu ampu.
              </Typography>
            </Box>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1}
              sx={{ width: { xs: "100%", lg: "auto" } }}
            >
              <TextField
                size="small"
                placeholder="Cari nama santri..."
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                inputProps={{
                  "aria-label": "Cari nama atau NIS santri",
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  width: { xs: "100%", sm: 230 },
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#FCFBF8",
                    borderRadius: 2.5,
                  },
                  "& .MuiInputBase-input": {
                    fontSize: 12,
                  },
                }}
              />

              {/* Filter status tanpa label kecil di atas dropdown */}
              <TextField
                select
                size="small"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                sx={{
                  minWidth: 190,
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#FCFBF8",
                    borderRadius: 2.5,
                  },
                  "& .MuiSelect-select": {
                    fontSize: 12,
                  },
                }}
              >
                <MenuItem value="Semua Status">
                  Semua Status
                </MenuItem>

                <MenuItem value="Lengkap">
                  Lengkap
                </MenuItem>

                <MenuItem value="Belum Lengkap">
                  Belum Lengkap
                </MenuItem>
              </TextField>
            </Stack>
          </Stack>

          <TableContainer sx={{ overflowX: "auto" }}>
            <Table aria-label="Daftar santri" sx={{ minWidth: 700 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#5A734E" }}>
                  {[
                    "NO",
                    "NIS",
                    "NAMA SANTRI",
                    "KELAS",
                    "NILAI",
                    "STATUS",
                  ].map((judul) => (
                    <TableCell
                      key={judul}
                      sx={{
                        height: 49,
                        color: "#fff",
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: 0.4,
                        whiteSpace: "nowrap",
                        "&:first-of-type": { pl: 2.75 },
                      }}
                    >
                      {judul}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {dataTampil.length > 0 ? (
                  dataTampil.map((santri, index) => (
                    <TableRow key={santri.id} hover>
                      <TableCell
                        sx={{
                          pl: 2.75,
                          width: 55,
                          color: "#A1A69E",
                          fontSize: 12,
                        }}
                      >
                        {index + 1}.
                      </TableCell>

                      <TableCell
                        sx={{ color: "#5D685D", fontSize: 12 }}
                      >
                        {santri.id}
                      </TableCell>

                      <TableCell
                        sx={{
                          color: "#28352C",
                          fontSize: 12,
                          fontWeight: 600,
                        }}
                      >
                        <Stack
                          direction="row"
                          spacing={1.25}
                          sx={{ alignItems: "center" }}
                        >
                          <Box
                            aria-hidden="true"
                            sx={{
                              width: 38,
                              height: 38,
                              display: "grid",
                              placeItems: "center",
                              flex: "0 0 auto",
                              borderRadius: "50%",
                              backgroundColor: "#EDF0E7",
                              color: "#4E6745",
                              fontSize: 11,
                              fontWeight: 700,
                            }}
                          >
                            {santri.nama
                              .split(" ")
                              .map((kata) => kata[0])
                              .slice(0, 2)
                              .join("")}
                          </Box>

                          {santri.nama}
                        </Stack>
                      </TableCell>

                      <TableCell
                        sx={{ color: "#5D685D", fontSize: 12 }}
                      >
                        {santri.kelas}
                      </TableCell>

                      <TableCell
                        sx={{ color: "#5D685D", fontSize: 12 }}
                      >
                        {santri.nilai || "-"}
                      </TableCell>

                      <TableCell>
                        <Chip
                          size="small"
                          label={
                            santri.lengkap
                              ? "Lengkap"
                              : "Belum Lengkap"
                          }
                          sx={{
                            height: 26,
                            border: santri.lengkap
                              ? "1px solid #A9E7D1"
                              : "1px solid #F4D78B",
                            backgroundColor: santri.lengkap
                              ? "#EDFBF5"
                              : "#FFF9EA",
                            color: santri.lengkap
                              ? "#14805E"
                              : "#A56A0B",
                            fontSize: 11,
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      align="center"
                      sx={{ py: 4, color: "#899287" }}
                    >
                      <AssignmentTurnedIn
                        sx={{
                          display: "block",
                          mx: "auto",
                          mb: 1,
                        }}
                      />
                      Santri tidak ditemukan.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Box
            sx={{
              px: { xs: 2, sm: 2.75 },
              py: 1.5,
              borderTop: "1px solid #ECEAE3",
              backgroundColor: "#FDFCF9",
            }}
          >
            <Typography variant="caption" color="text.secondary">
              Menampilkan {dataTampil.length} dari {dataAwal.length} santri
            </Typography>
          </Box>
        </Paper>
      </Stack>
    </LayoutPengajar>
  );
}