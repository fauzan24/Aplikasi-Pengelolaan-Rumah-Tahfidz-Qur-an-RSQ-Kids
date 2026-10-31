import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowBack,
  CheckCircleRounded,
  SaveOutlined,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Snackbar,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import LayoutWalisantri from "../../components/walisantri/LayoutWalisantri";

const STORAGE_KEY = "pendaftaranSantriBaru";

const dataKosong = {
  namaSantri: "",
  tempatLahir: "",
  tanggalLahir: "",
  sekolah: "",
  namaAyah: "",
  namaIbu: "",
  nomorHandphone: "",
  alamatTempatTinggal: "",
};

const kolomSantri = [
  { name: "namaSantri", label: "Nama Santri" },
  { name: "tempatLahir", label: "Tempat Lahir" },
  { name: "tanggalLahir", label: "Tanggal Lahir", type: "date" },
  { name: "sekolah", label: "Sekolah" },
];

const kolomWali = [
  { name: "namaAyah", label: "Nama Ayah" },
  { name: "namaIbu", label: "Nama Ibu" },
  {
    name: "nomorHandphone",
    label: "Nomor Handphone",
    type: "tel",
    inputProps: { inputMode: "tel", minLength: 8, maxLength: 20 },
  },
  {
    name: "alamatTempatTinggal",
    label: "Alamat Tempat Tinggal",
    multiline: true,
    minRows: 2,
  },
];

export default function PendaftaranWalisantri({ pengguna, onLogout }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(dataKosong);
  const [notifikasi, setNotifikasi] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((dataSebelumnya) => ({ ...dataSebelumnya, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      const tersimpan = localStorage.getItem(STORAGE_KEY);
      const daftarPendaftaran = tersimpan ? JSON.parse(tersimpan) : [];

      if (!Array.isArray(daftarPendaftaran)) {
        throw new Error("Format data pendaftaran tidak valid.");
      }

      const pendaftaran = {
        ...formData,
        id: `REG-${Date.now()}`,
        tanggalDaftar: new Date().toISOString(),
        status: "Menunggu",
        idWali: pengguna?.id || null,
      };

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify([...daftarPendaftaran, pendaftaran])
      );
      setFormData(dataKosong);
      setNotifikasi({
        open: true,
        severity: "success",
        message: "Data pendaftaran berhasil disimpan di perangkat ini.",
      });
    } catch (error) {
      setNotifikasi({
        open: true,
        severity: "error",
        message:
          error instanceof Error
            ? `Data pendaftaran gagal disimpan: ${error.message}`
            : "Data pendaftaran gagal disimpan.",
      });
    }
  };

  const renderFields = (fields) =>
    fields.map(({ name, label, ...props }) => (
      <TextField
        key={name}
        name={name}
        label={label}
        type={props.type || "text"}
        value={formData[name]}
        onChange={handleChange}
        required
        fullWidth
        size="small"
        slotProps={{
          inputLabel: props.type === "date" ? { shrink: true } : undefined,
          htmlInput: props.inputProps,
        }}
        multiline={props.multiline}
        minRows={props.minRows}
      />
    ));

  return (
    <LayoutWalisantri pengguna={pengguna} onLogout={onLogout}>
      <Stack spacing={3} sx={{ width: "100%", maxWidth: 1050, mx: "auto", pb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
            Form Pendaftaran Santri Baru
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lengkapi data santri dan wali santri untuk mengajukan pendaftaran.
          </Typography>
        </Box>

        <Card sx={{ borderRadius: `${theme.shape.borderRadius + 8}px` }}>
          <CardContent sx={{ p: { xs: 2.5, sm: 3.5 }, "&:last-child": { pb: { xs: 2.5, sm: 3.5 } } }}>
            <Box component="form" onSubmit={handleSubmit}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                  gap: { xs: 3, md: 4 },
                }}
              >
                <Stack spacing={2.25}>
                  <Typography variant="h6" component="h2">
                    Data Santri
                  </Typography>
                  {renderFields(kolomSantri)}
                </Stack>

                <Box
                  sx={{
                    pl: { xs: 0, md: 4 },
                    borderLeft: {
                      xs: "none",
                      md: `1px solid ${theme.palette.divider}`,
                    },
                    borderTop: {
                      xs: `1px solid ${theme.palette.divider}`,
                      md: "none",
                    },
                    pt: { xs: 3, md: 0 },
                  }}
                >
                  <Stack spacing={2.25}>
                    <Typography variant="h6" component="h2">
                      Data Wali Santri
                    </Typography>
                    {renderFields(kolomWali)}
                  </Stack>
                </Box>
              </Box>

              <Divider sx={{ my: 3 }} />
              <Stack
                direction={{ xs: "column-reverse", sm: "row" }}
                spacing={1.5}
                sx={{ justifyContent: "space-between" }}
              >
                <Button
                  variant="outlined"
                  startIcon={<ArrowBack />}
                  onClick={() => navigate("/walisantri/dashboard")}
                  sx={{ minWidth: 160 }}
                >
                  Kembali
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<SaveOutlined />}
                  sx={{ minWidth: 190 }}
                >
                  Simpan Data Santri
                </Button>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Stack>

      <Snackbar
        open={notifikasi.open}
        autoHideDuration={6000}
        onClose={() => setNotifikasi((status) => ({ ...status, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity={notifikasi.severity}
          variant="filled"
          icon={notifikasi.severity === "success" ? <CheckCircleRounded /> : undefined}
          onClose={() => setNotifikasi((status) => ({ ...status, open: false }))}
          sx={{ width: "100%" }}
        >
          {notifikasi.message}
        </Alert>
      </Snackbar>
    </LayoutWalisantri>
  );
}
