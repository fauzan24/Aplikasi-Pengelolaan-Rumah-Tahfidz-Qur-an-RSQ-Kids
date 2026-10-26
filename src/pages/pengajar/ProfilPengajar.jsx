import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  Snackbar,
  Alert,
  Stack,
} from "@mui/material";

import {
  Person,
  PhotoCamera,
  Edit,
  Save,
  Close,
} from "@mui/icons-material";

import LayoutPengajar from "../../components/pengajar/LayoutPengajar";

export default function ProfilPengajar({
  pengguna,
  onNavigate,
  onLogout,
}) {
  const [nama] = useState(
    pengguna?.nama || pengguna?.namaLengkap || "Ustadzah Aisyah"
  );

  const [nip] = useState(pengguna?.nip || "12345");

  const [noHp, setNoHp] = useState(
    pengguna?.noHp || pengguna?.telepon || "082635273538"
  );

  const [alamat, setAlamat] = useState(
    pengguna?.alamat || "Batu Aji"
  );

  const [foto, setFoto] = useState("");
  const [modeEdit, setModeEdit] = useState(false);

  const [pesanTerbuka, setPesanTerbuka] = useState(false);
  const [pesan, setPesan] = useState("");
  const [jenisPesan, setJenisPesan] = useState("success");

  const [dataAwal, setDataAwal] = useState({
    noHp,
    alamat,
  });

  const tampilkanPesan = (teks, jenis = "success") => {
    setPesan(teks);
    setJenisPesan(jenis);
    setPesanTerbuka(true);
  };

  const handleUbahFoto = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      tampilkanPesan(
        "Pilih file gambar untuk foto profil.",
        "error"
      );
      event.target.value = "";
      return;
    }

    setFoto(URL.createObjectURL(file));
  };

  const handleEdit = () => {
    setDataAwal({ noHp, alamat });
    setModeEdit(true);
  };

  const handleBatal = () => {
    setNoHp(dataAwal.noHp);
    setAlamat(dataAwal.alamat);
    setModeEdit(false);
  };

  const handleSimpan = () => {
    if (!noHp.trim() || !alamat.trim()) {
      tampilkanPesan(
        "Nomor HP dan alamat wajib diisi.",
        "error"
      );
      return;
    }

    try {
      const dataLama = JSON.parse(
        sessionStorage.getItem("pengguna") || "{}"
      );

      sessionStorage.setItem(
        "pengguna",
        JSON.stringify({
          ...dataLama,
          nama,
          nip,
          noHp,
          telepon: noHp,
          alamat,
        })
      );

      setDataAwal({ noHp, alamat });
      setModeEdit(false);

      tampilkanPesan("Profil berhasil disimpan.");
    } catch {
      tampilkanPesan("Profil gagal disimpan.", "error");
    }
  };

  // STYLE KOTAK INPUT
  const fieldStyle = {
    "& .MuiOutlinedInput-root": {
      minHeight: 50,
      borderRadius: "12px",
      backgroundColor: "#F5F4EF",
      color: "#374334",
      fontFamily: "Roboto, sans-serif",
      fontSize: "14px",

      "& fieldset": {
        borderColor: "#E0DED6",
      },

      "&:hover fieldset": {
        borderColor: "#B8C4B1",
      },

      "&.Mui-focused fieldset": {
        borderColor: "#5C7652",
        borderWidth: "1.5px",
      },

      "&.Mui-disabled": {
        backgroundColor: "#F5F4EF",
      },

      "& .MuiInputBase-input": {
        padding: "13px 14px",
        fontFamily: "Roboto, sans-serif",
        fontSize: "14px",
        lineHeight: 1.5,
      },

      "& .MuiInputBase-input.Mui-disabled": {
        WebkitTextFillColor: "#374334",
        opacity: 1,
      },
    },
  };

  // STYLE LABEL DI ATAS KOTAK
  const labelStyle = {
    display: "block",
    fontFamily: "Roboto, sans-serif",
    fontSize: "13px",
    fontWeight: 600,
    color: "#53644E",
    mb: 1,
  };

  // STYLE TOMBOL
  const buttonStyle = {
    borderRadius: "11px",
    px: 2.5,
    py: 1.1,
    minHeight: 42,
    fontFamily: "Roboto, sans-serif",
    fontSize: "13px",
    fontWeight: 600,
    textTransform: "none",
    boxShadow: "none",
    whiteSpace: "nowrap",
  };

  return (
    <LayoutPengajar
      onNavigate={onNavigate}
      onLogout={onLogout}
    >
      <Box
        sx={{
          minHeight: "100%",
          bgcolor: "#F8F6F0",
          p: { xs: 2, sm: 3, md: 4 },
          fontFamily: "Roboto, sans-serif",
        }}
      >
        {/* JUDUL HALAMAN */}
        <Typography
          component="h1"
          sx={{
            fontFamily: "Roboto, sans-serif",
            fontSize: { xs: "21px", md: "24px" },
            fontWeight: 700,
            lineHeight: 1.4,
            letterSpacing: "-0.4px",
            color: "#243323",
            mb: { xs: 3, md: 4 },
          }}
        >
          Profil Pengajar
        </Typography>

        <Box
          sx={{
            maxWidth: 1120,
            mx: "auto",
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "0.72fr 1.5fr",
            },
            gap: { xs: 3, md: 6 },
            alignItems: "start",
          }}
        >
          {/* FOTO PROFIL */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              src={foto}
              sx={{
                width: { xs: 150, md: 200 },
                height: { xs: 150, md: 200 },
                bgcolor: "#5C7652",
                color: "#FFFFFF",
                border: "6px solid #E7E6DF",
                fontSize: { xs: 70, md: 90 },
              }}
            >
              {!foto && <Person fontSize="inherit" />}
            </Avatar>

            <Typography
              sx={{
                mt: 2,
                mb: 2.5,
                fontFamily: "Roboto, sans-serif",
                fontSize: { xs: "18px", md: "20px" },
                fontWeight: 700,
                lineHeight: 1.4,
                color: "#243323",
                textAlign: "center",
              }}
            >
              {nama}
            </Typography>

            <Button
              component="label"
              variant="contained"
              startIcon={<PhotoCamera />}
              sx={{
                ...buttonStyle,
                minWidth: 135,
                bgcolor: "#C9A044",
                color: "#2D2B20",
                "&:hover": {
                  bgcolor: "#B78D34",
                  boxShadow: "none",
                },
              }}
            >
              Ubah Foto

              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleUbahFoto}
              />
            </Button>
          </Box>

          {/* INFORMASI PENGAJAR */}
          <Paper
            elevation={0}
            sx={{
              width: "100%",
              minWidth: 0,
              boxSizing: "border-box",
              p: { xs: 2.5, sm: 3, md: 3.5 },
              borderRadius: "20px",
              border: "1px solid #EEEBE4",
              bgcolor: "#FFFFFF",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Roboto, sans-serif",
                fontSize: "16px",
                fontWeight: 700,
                color: "#243323",
                mb: 3,
              }}
            >
              Informasi Pribadi
            </Typography>

            <Stack spacing={2.5}>
              {/* NAMA LENGKAP */}
              <Box>
                <Typography sx={labelStyle}>
                  Nama Lengkap
                </Typography>

                <TextField
                  value={nama}
                  fullWidth
                  disabled
                  sx={fieldStyle}
                />
              </Box>

              {/* NIP */}
              <Box>
                <Typography sx={labelStyle}>
                  NIP
                </Typography>

                <TextField
                  value={nip}
                  fullWidth
                  disabled
                  sx={fieldStyle}
                />
              </Box>

              {/* NOMOR HP */}
              <Box>
                <Typography sx={labelStyle}>
                  Nomor HP
                </Typography>

                <TextField
                  value={noHp}
                  onChange={(e) => setNoHp(e.target.value)}
                  fullWidth
                  disabled={!modeEdit}
                  sx={fieldStyle}
                />
              </Box>

              {/* ALAMAT */}
              <Box>
                <Typography sx={labelStyle}>
                  Alamat
                </Typography>

                <TextField
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                  fullWidth
                  disabled={!modeEdit}
                  sx={fieldStyle}
                />
              </Box>
            </Stack>

            {/* TOMBOL EDIT, BATAL, DAN SIMPAN */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 1.5,
                mt: 3,
                flexWrap: "wrap",
              }}
            >
              {modeEdit ? (
                <>
                  <Button
                    variant="outlined"
                    startIcon={<Close />}
                    onClick={handleBatal}
                    sx={{
                      ...buttonStyle,
                      borderColor: "#A6ADA0",
                      color: "#43513F",
                      "&:hover": {
                        borderColor: "#5C7652",
                        bgcolor: "#F5F7F2",
                      },
                    }}
                  >
                    Batal
                  </Button>

                  <Button
                    variant="contained"
                    startIcon={<Save />}
                    onClick={handleSimpan}
                    sx={{
                      ...buttonStyle,
                      bgcolor: "#5C7652",
                      color: "#FFFFFF",
                      "&:hover": {
                        bgcolor: "#435A3A",
                        boxShadow: "none",
                      },
                    }}
                  >
                    Simpan Perubahan
                  </Button>
                </>
              ) : (
                <Button
                  variant="contained"
                  startIcon={<Edit />}
                  onClick={handleEdit}
                  sx={{
                    ...buttonStyle,
                    bgcolor: "#C9A044",
                    color: "#2D2B20",
                    "&:hover": {
                      bgcolor: "#B78D34",
                      boxShadow: "none",
                    },
                  }}
                >
                  Edit Profil
                </Button>
              )}
            </Box>
          </Paper>
        </Box>

        {/* NOTIFIKASI */}
        <Snackbar
          open={pesanTerbuka}
          autoHideDuration={3000}
          onClose={() => setPesanTerbuka(false)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <Alert
            severity={jenisPesan}
            onClose={() => setPesanTerbuka(false)}
            variant="filled"
            sx={{
              fontFamily: "Roboto, sans-serif",
              fontSize: "13px",
              "& .MuiAlert-message": {
                fontWeight: 500,
              },
            }}
          >
            {pesan}
          </Alert>
        </Snackbar>
      </Box>
    </LayoutPengajar>
  );
}