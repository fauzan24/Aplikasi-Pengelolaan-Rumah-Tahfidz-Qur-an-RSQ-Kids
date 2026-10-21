import { useState } from "react";
import {
  ArrowBack,
  Close,
  Delete,
  EditOutlined,
  Person,
  SaveOutlined,
} from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  LinearProgress,
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
import { useNavigate, useParams } from "react-router-dom";
import LayoutPengajar from "../../components/pengajar/LayoutPengajar";
import { dataSantriProgres } from "../../data/santriProgres";

const dataAwal = [
  { id: 1, tanggal: "05/04/2026", pelajaran: "Tahfidz", progres: 30, catatan: "Surat AT-Takatsur" },
  { id: 2, tanggal: "13/04/2026", pelajaran: "Bacaan", progres: 60, catatan: "AT-Takwir" },
  { id: 3, tanggal: "15/04/2026", pelajaran: "Iqro", progres: 50, catatan: "Jilid 3" },
];

const tanggalValid = (tanggal) => {
  const bagian = tanggal.split("/");
  return bagian.length === 3 && bagian.every((nilai) => nilai.trim() !== "");
};

const fieldEdit = [
  { field: "tanggal", label: "Tanggal (DD/MM/YYYY)", type: "text" },
  { field: "pelajaran", label: "Mata Pelajaran", type: "text" },
  { field: "progres", label: "Progres (%)", type: "number" },
  { field: "catatan", label: "Catatan", type: "text" },
];

export default function DetailProgresBelajar({ onNavigate, onLogout }) {
  const { santriId } = useParams();
  const navigate = useNavigate();
  const santri = dataSantriProgres.find((item) => item.id === santriId);
  const [daftarProgres, setDaftarProgres] = useState(dataAwal);
  const [dataEdit, setDataEdit] = useState(null);

  const bukaEdit = (item) => setDataEdit({ ...item });

  const simpanEdit = (event) => {
    event.preventDefault();

    setDaftarProgres((data) =>
      data.map((item) => (item.id === dataEdit.id ? dataEdit : item))
    );
    setDataEdit(null);
  };

  const hapusProgres = (id) => {
    if (!window.confirm("Yakin ingin menghapus catatan progres ini?")) return;

    setDaftarProgres((data) => data.filter((item) => item.id !== id));
  };

  const progresValid =
    dataEdit &&
    dataEdit.progres !== "" &&
    Number(dataEdit.progres) >= 0 &&
    Number(dataEdit.progres) <= 100;
  const formValid =
    dataEdit &&
    tanggalValid(dataEdit.tanggal) &&
    dataEdit.pelajaran.trim() &&
    dataEdit.catatan.trim() &&
    progresValid;

  if (!santri) {
    return (
      <LayoutPengajar onNavigate={onNavigate} onLogout={onLogout}>
        <Stack spacing={2} sx={{ width: "100%", minWidth: 0 }}>
          <Typography component="h1" variant="h5" fontWeight={800} color="#28352C">
            Detail Progres Belajar
          </Typography>
          <Alert severity="error">
            Data santri dengan ID {santriId} tidak ditemukan.
          </Alert>
          <Button
            startIcon={<ArrowBack />}
            variant="outlined"
            onClick={() => navigate("/pengajar/progres-belajar")}
            sx={{ alignSelf: "flex-start", textTransform: "none" }}
          >
            Kembali ke daftar santri
          </Button>
        </Stack>
      </LayoutPengajar>
    );
  }

  return (
    <LayoutPengajar
      onNavigate={onNavigate}
      onLogout={onLogout}
    >
      <Stack spacing={3} sx={{ width: "100%", minWidth: 0, pb: 3 }}>
        <Typography component="h1" variant="h5" fontWeight={800} color="#28352C">
          Detail Progres Belajar
        </Typography>

        <Button
          startIcon={<ArrowBack />}
          variant="outlined"
          onClick={() => navigate("/pengajar/progres-belajar")}
          sx={{
            alignSelf: "flex-start",
            borderColor: "#DCDDD3",
            borderRadius: 2,
            color: "#526D48",
            fontSize: 12,
            textTransform: "none",
          }}
        >
          Kembali ke daftar santri
        </Button>

        <Paper
          variant="outlined"
          sx={{
            width: "100%",
            maxWidth: 520,
            p: { xs: 2, sm: 3 },
            borderColor: "#EAE7DF",
            borderRadius: 3,
            backgroundColor: "#fff",
          }}
        >
          <Stack direction="row" spacing={{ xs: 1.75, sm: 2.5 }} sx={{ alignItems: "center" }}>
            <Avatar
              sx={{
                width: { xs: 65, sm: 86 },
                height: { xs: 65, sm: 86 },
                flex: "0 0 auto",
                backgroundColor: "#5A734E",
              }}
            >
              <Person sx={{ fontSize: { xs: 36, sm: 46 } }} />
            </Avatar>
            <Box sx={{ minWidth: 0 }}>
              <Typography component="h2" variant="subtitle1" fontWeight={800} color="#28352C">
                {santri?.nama || "Santri tidak ditemukan"}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75, fontSize: 12 }}>
                NIS: {santri?.id || santriId}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontSize: 12 }}>
                Kelas: {santri?.kelas || "-"}
              </Typography>
            </Box>
          </Stack>
        </Paper>

        <Paper
          variant="outlined"
          sx={{
            width: "100%",
            overflow: "hidden",
            p: { xs: 1, sm: 1.5 },
            borderColor: "#EAE7DF",
            borderRadius: 3,
            backgroundColor: "#fff",
          }}
        >
          <TableContainer sx={{ overflowX: "auto", borderRadius: 1.5 }}>
            <Table aria-label="Detail progres belajar" sx={{ minWidth: 850 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#5A734E" }}>
                  {["No", "Tanggal", "Mata Pelajaran", "Progres", "Catatan", "Aksi"].map(
                    (label) => (
                      <TableCell
                        key={label}
                        align={label === "Aksi" ? "center" : "left"}
                        sx={{
                          height: 60,
                          px: 2.25,
                          color: "#fff",
                          fontSize: 12,
                          fontWeight: 700,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {label}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {daftarProgres.length > 0 ? (
                  daftarProgres.map((item, index) => {
                    const persentase = Math.min(100, Math.max(0, Number(item.progres) || 0));

                    return (
                      <TableRow key={item.id} hover>
                        <TableCell sx={tableCellSx}>{index + 1}.</TableCell>
                        <TableCell sx={{ ...tableCellSx, whiteSpace: "nowrap" }}>
                          {item.tanggal}
                        </TableCell>
                        <TableCell sx={tableCellSx}>{item.pelajaran}</TableCell>
                        <TableCell sx={tableCellSx}>
                          <Stack direction="row" spacing={1.5} sx={{ minWidth: 155, alignItems: "center" }}>
                            <LinearProgress
                              variant="determinate"
                              value={persentase}
                              sx={{
                                flex: 1,
                                height: 12,
                                borderRadius: 5,
                                backgroundColor: "#E9E7E0",
                                "& .MuiLinearProgress-bar": {
                                  borderRadius: 5,
                                  backgroundColor: "#5A734E",
                                },
                              }}
                            />
                            <Typography
                              variant="body2"
                              fontWeight={800}
                              color="#28352C"
                              sx={{ minWidth: 38, fontSize: 13 }}
                            >
                              {item.progres}%
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell sx={tableCellSx}>{item.catatan}</TableCell>
                        <TableCell align="center" sx={tableCellSx}>
                          <Stack direction="row" spacing={1} sx={{ justifyContent: "center" }}>
                            <IconButton
                              title="Edit progres"
                              aria-label={`Edit progres ${item.pelajaran}`}
                              onClick={() => bukaEdit(item)}
                              sx={{
                                width: 42,
                                height: 42,
                                borderRadius: 1.5,
                                backgroundColor: "#EBECE5",
                                color: "#526D48",
                                "&:hover": { backgroundColor: "#DDE4D6" },
                              }}
                            >
                              <EditOutlined fontSize="small" />
                            </IconButton>
                            <IconButton
                              title="Hapus progres"
                              aria-label={`Hapus progres ${item.pelajaran}`}
                              onClick={() => hapusProgres(item.id)}
                              sx={{
                                width: 42,
                                height: 42,
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
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 4, color: "#626B60", fontSize: 13 }}>
                      Belum ada catatan progres belajar.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <Dialog
          open={Boolean(dataEdit)}
          onClose={() => setDataEdit(null)}
          fullWidth
          maxWidth="xs"
          aria-labelledby="dpb-modal-title"
        >
          <DialogTitle sx={{ p: 3, pb: 1.5 }}>
            <Stack direction="row" spacing={2} sx={{ alignItems: "center", justifyContent: "space-between" }}>
              <Typography id="dpb-modal-title" component="h2" variant="h6" fontWeight={800} color="#28352C">
                Edit Progres Belajar
              </Typography>
              <IconButton
                aria-label="Tutup"
                onClick={() => setDataEdit(null)}
                size="small"
                sx={{ backgroundColor: "#F2F3EE", color: "#52614E" }}
              >
                <Close fontSize="small" />
              </IconButton>
            </Stack>
          </DialogTitle>
          <Box component="form" onSubmit={simpanEdit}>
            <DialogContent sx={{ px: 3, pt: 1.5 }}>
              <Stack spacing={2}>
                {fieldEdit.map(({ field, label, type }) => (
                  <TextField
                    key={field}
                    fullWidth
                    required
                    type={type}
                    label={label}
                    value={dataEdit?.[field] ?? ""}
                    onChange={(event) =>
                      setDataEdit((sebelumnya) => ({
                        ...sebelumnya,
                        [field]: event.target.value,
                      }))
                    }
                    inputProps={
                      field === "progres"
                        ? { min: 0, max: 100, step: 1 }
                        : undefined
                    }
                    error={field === "tanggal" && Boolean(dataEdit) && !tanggalValid(dataEdit.tanggal)}
                    helperText={
                      field === "tanggal" && dataEdit && !tanggalValid(dataEdit.tanggal)
                        ? "Isi tanggal dengan format DD/MM/YYYY."
                        : undefined
                    }
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 1.5,
                        backgroundColor: "#FCFBF8",
                      },
                    }}
                  />
                ))}
              </Stack>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 3, pt: 1, gap: 1 }}>
              <Button
                type="button"
                variant="outlined"
                onClick={() => setDataEdit(null)}
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
                disabled={!formValid}
                sx={{
                  minHeight: 42,
                  borderRadius: 1.5,
                  backgroundColor: "#5A734E",
                  textTransform: "none",
                  "&:hover": { backgroundColor: "#30442E" },
                }}
              >
                Simpan
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
      </Stack>
    </LayoutPengajar>
  );
}

const tableCellSx = {
  height: 88,
  px: 2.25,
  py: 1.75,
  borderBottomColor: "#ECEAE3",
  color: "#626B60",
  fontSize: 12,
};
