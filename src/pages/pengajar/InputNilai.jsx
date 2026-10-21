import { useMemo, useState } from "react";
import {
  BookOutlined,
  Close,
  Delete,
  EditOutlined,
  SaveOutlined,
  Search,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
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
  { id: "RSQ001", nama: "Jauza Askana", bacaan: 90, hafalan: 88, iqro: 90 },
  { id: "RSQ004", nama: "Dede Ridho", bacaan: 88, hafalan: 89, iqro: 88 },
  { id: "RSQ006", nama: "Aisyah Putri", bacaan: 89, hafalan: 90, iqro: 90 },
];

const hitungRataRata = (santri) => {
  const nilai = [santri.bacaan, santri.hafalan, santri.iqro]
    .filter((item) => item !== "" && item !== null && item !== undefined)
    .map(Number);

  if (!nilai.length) return "-";

  return Math.round(nilai.reduce((total, item) => total + item, 0) / nilai.length);
};

const kolomNilai = [
  ["bacaan", "Nilai Bacaan Al-Qur’an"],
  ["hafalan", "Nilai Hafalan"],
  ["iqro", "Nilai Iqro"],
];

const headerCellSx = {
  px: 1.5,
  py: 2,
  color: "#fff",
  fontSize: 11,
  fontWeight: 700,
  borderBottom: "none",
};

const bodyCellSx = {
  height: 76,
  px: 1.25,
  py: 1.5,
  color: "#626B60",
  fontSize: 12,
  borderBottomColor: "#ECEAE3",
};

const scoreCellSx = {
  ...bodyCellSx,
  color: "#28352C",
  fontSize: 13,
  fontWeight: 700,
};

export default function InputNilai({ onNavigate, onLogout }) {
  const [santriList, setSantriList] = useState(dataAwal);
  const [keyword, setKeyword] = useState("");
  const [santriEdit, setSantriEdit] = useState(null);
  const [formNilai, setFormNilai] = useState({
    bacaan: "",
    hafalan: "",
    iqro: "",
  });

  const dataTampil = useMemo(() => {
    const cari = keyword.toLowerCase().trim();

    return santriList.filter(
      (santri) =>
        santri.nama.toLowerCase().includes(cari) ||
        santri.id.toLowerCase().includes(cari)
    );
  }, [santriList, keyword]);

  const bukaEdit = (santri) => {
    setSantriEdit(santri);
    setFormNilai({
      bacaan: santri.bacaan,
      hafalan: santri.hafalan,
      iqro: santri.iqro,
    });
  };

  const simpanNilai = (event) => {
    event.preventDefault();

    setSantriList((sebelumnya) =>
      sebelumnya.map((santri) =>
        santri.id === santriEdit.id
          ? {
              ...santri,
              bacaan: formNilai.bacaan === "" ? "" : Number(formNilai.bacaan),
              hafalan: formNilai.hafalan === "" ? "" : Number(formNilai.hafalan),
              iqro: formNilai.iqro === "" ? "" : Number(formNilai.iqro),
            }
          : santri
      )
    );

    setSantriEdit(null);
  };

  const hapusNilai = (id) => {
    const yakin = window.confirm("Yakin ingin menghapus data nilai santri ini?");

    if (!yakin) return;

    setSantriList((sebelumnya) =>
      sebelumnya.filter((santri) => santri.id !== id)
    );
  };

  return (
    <LayoutPengajar
      onNavigate={onNavigate}
      onLogout={onLogout}
    >
      <Stack spacing={3} sx={{ width: "100%", minWidth: 0, pb: 3 }}>
        <Box>
          <Typography component="h1" variant="h5" fontWeight={800} color="#28352C">
            Input Nilai
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Kelola nilai bacaan Al-Qur’an, hafalan, dan Iqro santri yang kamu ampu.
          </Typography>
        </Box>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.5}
          component="form"
          onSubmit={(event) => {
            event.preventDefault();
            setKeyword(keyword.trim());
          }}
        >
          <TextField
            fullWidth
            type="search"
            placeholder="Cari nama atau NIS santri..."
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            inputProps={{ "aria-label": "Cari nama atau NIS santri" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: "#71816D" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": { borderRadius: 2, backgroundColor: "#fff" },
              "& .MuiInputBase-input": { fontSize: 13 },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              minWidth: { xs: "100%", sm: 120 },
              borderRadius: 2,
              backgroundColor: "#5A734E",
              fontSize: 12,
              fontWeight: 700,
              textTransform: "none",
              "&:hover": { backgroundColor: "#30442E" },
            }}
          >
            Tampilkan
          </Button>
        </Stack>

        <Paper
          variant="outlined"
          sx={{
            overflow: "hidden",
            p: { xs: 1, sm: 1.5 },
            borderColor: "#EAE7DF",
            borderRadius: { xs: 2, sm: 2.75 },
            backgroundColor: "#fff",
          }}
        >
          <TableContainer sx={{ overflowX: "auto", borderRadius: 2 }}>
            <Table
              aria-label="Daftar nilai santri"
              sx={{
                minWidth: 750,
                tableLayout: "fixed",
                textAlign: "center",
                "& th, & td": { textAlign: "center" },
              }}
            >
              <colgroup>
                <col style={{ width: "6%" }} />
                <col style={{ width: "11%" }} />
                <col style={{ width: "21%" }} />
                <col style={{ width: "12%" }} />
                <col style={{ width: "12%" }} />
                <col style={{ width: "12%" }} />
                <col style={{ width: "12%" }} />
                <col style={{ width: "14%" }} />
              </colgroup>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#5A734E" }}>
                  <TableCell rowSpan={2} sx={headerCellSx}>No</TableCell>
                  <TableCell rowSpan={2} sx={headerCellSx}>NIS</TableCell>
                  <TableCell rowSpan={2} sx={headerCellSx}>Nama Santri</TableCell>
                  <TableCell colSpan={3} sx={{ ...headerCellSx, borderBottom: "1px solid rgba(255,255,255,.12)" }}>
                    Penilaian
                  </TableCell>
                  <TableCell rowSpan={2} sx={headerCellSx}>Rata-rata</TableCell>
                  <TableCell rowSpan={2} sx={headerCellSx}>Aksi</TableCell>
                </TableRow>
                <TableRow sx={{ backgroundColor: "#5A734E" }}>
                  {["Bacaan Al-Qur’an", "Hafalan", "Iqro"].map((label) => (
                    <TableCell
                      key={label}
                      sx={{
                        px: 1,
                        pt: 1.25,
                        pb: 2,
                        color: "#fff",
                        fontSize: 10,
                        fontWeight: 700,
                        lineHeight: 1.7,
                      }}
                    >
                      {label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {dataTampil.length > 0 ? (
                  dataTampil.map((santri, index) => (
                    <TableRow key={santri.id} hover>
                      <TableCell sx={bodyCellSx}>{index + 1}.</TableCell>
                      <TableCell sx={bodyCellSx}>{santri.id}</TableCell>
                      <TableCell
                        sx={{
                          ...bodyCellSx,
                          color: "#28352C",
                          fontWeight: 600,
                          textAlign: "left !important",
                        }}
                      >
                        {santri.nama}
                      </TableCell>
                      <TableCell sx={scoreCellSx}>{santri.bacaan === "" ? "-" : santri.bacaan}</TableCell>
                      <TableCell sx={scoreCellSx}>{santri.hafalan === "" ? "-" : santri.hafalan}</TableCell>
                      <TableCell sx={scoreCellSx}>{santri.iqro === "" ? "-" : santri.iqro}</TableCell>
                      <TableCell sx={scoreCellSx}>{hitungRataRata(santri)}</TableCell>
                      <TableCell sx={bodyCellSx}>
                        <Stack direction="row" spacing={1} sx={{ justifyContent: "center" }}>
                          <IconButton
                            size="small"
                            title="Edit nilai"
                            aria-label={`Edit nilai ${santri.nama}`}
                            onClick={() => bukaEdit(santri)}
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: 1.5,
                              backgroundColor: "#EBECE5",
                              color: "#526D48",
                              "&:hover": { backgroundColor: "#DDE4D6" },
                            }}
                          >
                            <EditOutlined fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            title="Hapus nilai"
                            aria-label={`Hapus nilai ${santri.nama}`}
                            onClick={() => hapusNilai(santri.id)}
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: 1.5,
                              backgroundColor: "#F9DFDF",
                              color: "#CB3E36",
                              "&:hover": { backgroundColor: "#F4CCCC" },
                            }}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} align="center" sx={{ py: 4, color: "#899287" }}>
                      <BookOutlined sx={{ display: "block", mx: "auto", mb: 1 }} />
                      Santri tidak ditemukan.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            sx={{
              alignItems: { sm: "center" },
              justifyContent: "space-between",
              px: 1,
              pt: 1.75,
              pb: 0.5,
            }}
          >
            <Typography variant="caption" color="text.secondary">
              Menampilkan {dataTampil.length} dari {santriList.length} santri
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Semester Ganjil · Tahun Ajaran 2026/2027
            </Typography>
          </Stack>
        </Paper>

        <Dialog
          open={Boolean(santriEdit)}
          onClose={() => setSantriEdit(null)}
          fullWidth
          maxWidth="xs"
          aria-labelledby="in-modal-title"
        >
          <DialogTitle sx={{ p: 3, pb: 1.5 }}>
            <Stack direction="row" spacing={2} sx={{ alignItems: "flex-start", justifyContent: "space-between" }}>
              <Box>
                <Typography id="in-modal-title" component="h2" variant="h6" fontWeight={800} color="#28352C">
                  Edit Nilai Santri
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontSize: 12 }}>
                  {santriEdit?.nama} · {santriEdit?.id}
                </Typography>
              </Box>
              <IconButton
                aria-label="Tutup"
                onClick={() => setSantriEdit(null)}
                size="small"
                sx={{ backgroundColor: "#F2F3EE", color: "#52614E" }}
              >
                <Close fontSize="small" />
              </IconButton>
            </Stack>
          </DialogTitle>
          <Box component="form" onSubmit={simpanNilai}>
            <DialogContent sx={{ px: 3, pt: 1.5 }}>
              <Stack spacing={2}>
                {kolomNilai.map(([field, label]) => (
                  <TextField
                    key={field}
                    fullWidth
                    required
                    type="number"
                    label={label}
                    value={formNilai[field]}
                    onChange={(event) =>
                      setFormNilai((sebelumnya) => ({
                        ...sebelumnya,
                        [field]: event.target.value,
                      }))
                    }
                    inputProps={{ min: 0, max: 100, step: 1 }}
                    sx={{
                      "& .MuiOutlinedInput-root": { borderRadius: 1.5, backgroundColor: "#FCFBF8" },
                    }}
                  />
                ))}
              </Stack>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 3, pt: 1, gap: 1 }}>
              <Button
                type="button"
                variant="outlined"
                onClick={() => setSantriEdit(null)}
                sx={{
                  minHeight: 42,
                  borderColor: "#E2E5DC",
                  borderRadius: 1.5,
                  color: "#52614E",
                  textTransform: "none",
                }}
              >
                Batal
              </Button>
              <Button
                type="submit"
                variant="contained"
                startIcon={<SaveOutlined />}
                sx={{
                  minHeight: 42,
                  borderRadius: 1.5,
                  backgroundColor: "#5A734E",
                  textTransform: "none",
                  "&:hover": { backgroundColor: "#30442E" },
                }}
              >
                Simpan Nilai
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
      </Stack>
    </LayoutPengajar>
  );
}