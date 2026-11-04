
import { useNavigate } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Paper,
  Chip,
  useMediaQuery,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";

import {
  MenuBook,
  AutoStories,
  Favorite,
  School,
  VolunteerActivism,
  ArrowForward,
  Star,
} from "@mui/icons-material";

// ================= DATA PROGRAM =================
const programs = [
  {
    icon: <MenuBook />,
    title: "Belajar Iqro & Al-Qur'an",
    desc: "Membimbing santri membaca Al-Qur'an dengan baik dan benar.",
  },
  {
    icon: <AutoStories />,
    title: "Hafalan Surah",
    desc: "Membantu santri menghafal surah secara bertahap.",
  },
  {
    icon: <Favorite />,
    title: "Hafalan Hadits",
    desc: "Mengenalkan hadits sederhana dalam kehidupan sehari-hari.",
  },
  {
    icon: <School />,
    title: "Pembinaan Akhlak",
    desc: "Membentuk karakter anak yang santun dan berakhlak mulia.",
  },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const hijau = "#286B40";
  const hijauMuda = "#347A4B";
  const cream = "#F7F8F5";
  const teks = "#28352C";
  const abu = "#788779";

  return (
    <Box
      sx={{
        bgcolor: cream,
        minHeight: "100vh",
        width: "100%",
        color: teks,
        overflowX: "hidden",
      }}
    >
      {/* ================= NAVBAR ================= */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "#FFFFFF",
          color: teks,
          borderBottom: "1px solid #E9EEE8",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            sx={{
              minHeight: { xs: 65, md: 76 },
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            {/* LOGO */}
            <Stack
              direction="row"
              alignItems="center"
              spacing={1.5}
              sx={{ flexShrink: 0 }}
            >
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: "13px",
                  bgcolor: "#E8F0E8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MenuBook sx={{ color: hijau, fontSize: 25 }} />
              </Box>

              <Box>
                <Typography fontWeight={800} fontSize={15}>
                  Rumah Sahabat Qur'an
                </Typography>
                <Typography fontSize={10} color={abu}>
                  Menginspirasi Generasi Qur'ani
                </Typography>
              </Box>
            </Stack>

            {/* MENU DESKTOP */}
            {!isMobile && (
              <Stack direction="row" spacing={2} alignItems="center">
                {[
                  ["Beranda", "#beranda"],
                  ["Tentang Kami", "#tentang"],
                  ["Program", "#program"],
                  ["Kontak", "#kontak"],
                ].map(([label, link]) => (
                  <Button
                    key={label}
                    href={link}
                    sx={{
                      color: "#536457",
                      fontSize: 13,
                      fontWeight: 600,
                      textTransform: "none",
                      "&:hover": { color: hijau },
                    }}
                  >
                    {label}
                  </Button>
                ))}
              </Stack>
            )}

            {/* TOMBOL LOGIN */}
            <Button
              variant="contained"
              onClick={() => navigate("/login")}
              sx={{
                bgcolor: hijau,
                color: "#FFFFFF",
                borderRadius: "30px",
                px: { xs: 2.5, md: 3.5 },
                py: 1,
                fontSize: 13,
                fontWeight: 700,
                textTransform: "none",
                boxShadow: "none",
                flexShrink: 0,
                "&:hover": {
                  bgcolor: "#205732",
                  boxShadow: "none",
                },
              }}
            >
              Masuk
            </Button>
          </Toolbar>
        </Container>
      </AppBar>

      {/* ================= HERO ================= */}
      <Box id="beranda" sx={{ py: { xs: 7, md: 11 } }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "1.05fr 0.95fr",
              },
              gap: { xs: 5, md: 8 },
              alignItems: "center",
            }}
          >
            {/* HERO TEXT */}
            <Box>
              <Chip
                icon={
                  <Star
                    sx={{
                      color: "#D9A441 !important",
                      fontSize: 16,
                    }}
                  />
                }
                label="RUMAH SAHABAT QUR'AN - KIDS"
                sx={{
                  bgcolor: "#E8F0E8",
                  color: hijau,
                  fontWeight: 700,
                  fontSize: 11,
                  mb: 3,
                  height: 32,
                  borderRadius: "30px",
                }}
              />

              <Typography
                component="h1"
                sx={{
                  fontSize: { xs: 35, sm: 43, md: 52 },
                  lineHeight: 1.18,
                  fontWeight: 900,
                  letterSpacing: "-1.5px",
                  color: teks,
                  mb: 2.5,
                }}
              >
                Membentuk Generasi
                <Box component="span" sx={{ color: hijauMuda }}>
                  {" "}Qur'ani
                </Box>
                <br />
                Sejak Dini
              </Typography>

              <Typography
                sx={{
                  color: abu,
                  fontSize: { xs: 14, md: 15 },
                  lineHeight: 1.9,
                  maxWidth: 480,
                  mb: 3.5,
                }}
              >
                Tempat belajar Al-Qur'an yang nyaman dan menyenangkan
                untuk membimbing anak menjadi generasi yang cinta
                Al-Qur'an, berilmu, dan berakhlak mulia.
              </Typography>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ maxWidth: { xs: "100%", sm: "fit-content" } }}
              >
                <Button
                  variant="contained"
                  endIcon={<ArrowForward />}
                  onClick={() => navigate("/login")}
                  sx={{
                    bgcolor: hijau,
                    borderRadius: "30px",
                    px: 3.5,
                    py: 1.5,
                    fontWeight: 700,
                    textTransform: "none",
                    boxShadow: "none",
                    "&:hover": { bgcolor: "#205732" },
                  }}
                >
                  Mulai Sekarang
                </Button>

                <Button
                  variant="outlined"
                  href="#tentang"
                  sx={{
                    color: hijau,
                    borderColor: "#C9D8CA",
                    borderRadius: "30px",
                    px: 3.5,
                    py: 1.5,
                    fontWeight: 700,
                    textTransform: "none",
                    "&:hover": {
                      borderColor: hijau,
                      bgcolor: "#E8F0E8",
                    },
                  }}
                >
                  Pelajari Kami
                </Button>
              </Stack>

              {/* HERO INFO */}
              <Stack
                direction="row"
                spacing={4}
                sx={{ mt: 5 }}
              >
                <Box>
                  <Typography
                    fontWeight={800}
                    color={hijau}
                    fontSize={19}
                  >
                    Qur'ani
                  </Typography>
                  <Typography fontSize={11} color={abu}>
                    Cinta Al-Qur'an
                  </Typography>
                </Box>

                <Box
                  sx={{
                    width: "1px",
                    bgcolor: "#DCE5DC",
                  }}
                />

                <Box>
                  <Typography
                    fontWeight={800}
                    color={hijau}
                    fontSize={19}
                  >
                    Islami
                  </Typography>
                  <Typography fontSize={11} color={abu}>
                    Akhlak Mulia
                  </Typography>
                </Box>
              </Stack>
            </Box>

            {/* HERO VISUAL */}
            <Box
              sx={{
                bgcolor: "#E8F0E8",
                borderRadius: { xs: "24px", md: "32px" },
                p: { xs: 2, md: 3 },
              }}
            >
              <Box
                sx={{
                  minHeight: { xs: 280, md: 390 },
                  borderRadius: "23px",
                  background:
                    "linear-gradient(145deg, #438B58 0%, #205D36 100%)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  color: "#FFFFFF",
                  p: 3,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    width: 180,
                    height: 180,
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.12)",
                    top: -70,
                    right: -45,
                  }}
                />

                <Box
                  sx={{
                    position: "absolute",
                    width: 150,
                    height: 150,
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.12)",
                    bottom: -65,
                    left: -45,
                  }}
                />

                <Box
                  sx={{
                    width: 110,
                    height: 110,
                    borderRadius: "30px",
                    bgcolor: "rgba(255,255,255,0.13)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 3,
                    position: "relative",
                  }}
                >
                  <MenuBook sx={{ fontSize: 65 }} />
                </Box>

                <Typography
                  fontWeight={800}
                  fontSize={{ xs: 23, md: 28 }}
                  mb={1}
                >
                  Rumah Sahabat Qur'an
                </Typography>

                <Typography
                  fontSize={13}
                  color="#E0EFE2"
                  mb={3}
                >
                  Belajar • Menghafal • Mengamalkan
                </Typography>

                <Box
                  sx={{
                    bgcolor: "rgba(255,255,255,0.14)",
                    borderRadius: "30px",
                    px: 3,
                    py: 1,
                  }}
                >
                  <Typography fontSize={11} fontWeight={600}>
                    ✨ Generasi Qur'ani Masa Depan
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ================= TENTANG KAMI ================= */}
      <Box
        id="tentang"
        sx={{
          py: { xs: 7, md: 9 },
          bgcolor: "#FFFFFF",
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              maxWidth: 650,
              mx: "auto",
              textAlign: "center",
              mb: 5,
            }}
          >
            <Typography
              color={hijau}
              fontWeight={800}
              fontSize={12}
              letterSpacing={1}
              mb={1.5}
            >
              TENTANG KAMI
            </Typography>

            <Typography
              fontSize={{ xs: 25, md: 33 }}
              fontWeight={800}
              color={teks}
              mb={2}
            >
              Mengenal Rumah Sahabat Qur'an
            </Typography>

            <Typography
              color={abu}
              fontSize={14}
              lineHeight={1.9}
            >
              Rumah Sahabat Qur'an - Kids hadir sebagai tempat
              pembelajaran Al-Qur'an bagi anak-anak dengan suasana
              yang nyaman dan menyenangkan. Kami mendampingi
              perkembangan belajar serta membangun karakter
              generasi Qur'ani sejak dini.
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(3, 1fr)",
              },
              gap: 2.5,
            }}
          >
            {[
              {
                icon: <Favorite />,
                title: "Visi Kami",
                desc: "Membentuk generasi yang cinta Al-Qur'an dan berakhlak mulia.",
              },
              {
                icon: <VolunteerActivism />,
                title: "Misi Kami",
                desc: "Memberikan bimbingan belajar Al-Qur'an yang nyaman dan berkualitas.",
              },
              {
                icon: <School />,
                title: "Pendidikan",
                desc: "Mendampingi perkembangan belajar setiap santri secara bertahap.",
              },
            ].map((item, index) => (
              <Paper
                key={index}
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: "20px",
                  border: "1px solid #E9EEE8",
                  bgcolor: "#FFFFFF",
                  textAlign: "center",
                  transition: "0.25s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 10px 25px rgba(40,107,64,0.07)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 52,
                    height: 52,
                    borderRadius: "15px",
                    bgcolor: "#E8F0E8",
                    color: hijau,
                    mx: "auto",
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    "& svg": { fontSize: 27 },
                  }}
                >
                  {item.icon}
                </Box>

                <Typography
                  fontWeight={800}
                  fontSize={16}
                  mb={1}
                  color={teks}
                >
                  {item.title}
                </Typography>

                <Typography
                  color={abu}
                  fontSize={13}
                  lineHeight={1.8}
                >
                  {item.desc}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ================= PROGRAM ================= */}
      <Box
        id="program"
        sx={{
          py: { xs: 7, md: 9 },
          bgcolor: cream,
        }}
      >
        <Container maxWidth="lg">
          <Box textAlign="center" mb={5}>
            <Typography
              color={hijau}
              fontWeight={800}
              fontSize={12}
              letterSpacing={1}
              mb={1.5}
            >
              PROGRAM PEMBELAJARAN
            </Typography>

            <Typography
              fontSize={{ xs: 25, md: 33 }}
              fontWeight={800}
              color={teks}
              mb={1.5}
            >
              Belajar dan Tumbuh Bersama
            </Typography>

            <Typography color={abu} fontSize={14}>
              Kegiatan pembelajaran untuk mendukung perkembangan santri.
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(4, 1fr)",
              },
              gap: 2.5,
            }}
          >
            {programs.map((program, index) => (
              <Paper
                key={index}
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: "20px",
                  border: "1px solid #E7EDE6",
                  bgcolor: "#FFFFFF",
                  minHeight: 205,
                  transition: "0.25s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    borderColor: "#C5D9C8",
                    boxShadow: "0 10px 25px rgba(40,107,64,0.07)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: "15px",
                    bgcolor: "#E8F0E8",
                    color: hijau,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2.5,
                    "& svg": { fontSize: 27 },
                  }}
                >
                  {program.icon}
                </Box>

                <Typography
                  fontWeight={800}
                  fontSize={15}
                  color={teks}
                  mb={1}
                >
                  {program.title}
                </Typography>

                <Typography
                  fontSize={12}
                  color={abu}
                  lineHeight={1.8}
                >
                  {program.desc}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ================= CTA ================= */}
      <Box
        sx={{
          py: { xs: 5, md: 7 },
          px: { xs: 2, md: 0 },
          bgcolor: "#FFFFFF",
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              background:
                "linear-gradient(120deg, #286B40 0%, #438653 100%)",
              borderRadius: { xs: "22px", md: "28px" },
              px: { xs: 3, md: 6 },
              py: { xs: 5, md: 6 },
              textAlign: "center",
              color: "#FFFFFF",
            }}
          >
            <Typography
              fontWeight={800}
              fontSize={{ xs: 23, md: 32 }}
              lineHeight={1.3}
              mb={1.5}
            >
              Mari Tumbuh Bersama Al-Qur'an!
            </Typography>

            <Typography
              sx={{
                color: "#E8F2E9",
                fontSize: { xs: 13, md: 14 },
                lineHeight: 1.9,
                maxWidth: 500,
                mx: "auto",
                mb: 3,
              }}
            >
              Mulai perjalanan belajar Al-Qur'an bersama
              Rumah Sahabat Qur'an - Kids.
            </Typography>

            <Button
              variant="contained"
              endIcon={<ArrowForward />}
              onClick={() => navigate("/login")}
              sx={{
                bgcolor: "#FFFFFF",
                color: hijau,
                borderRadius: "30px",
                px: 3.5,
                py: 1.4,
                fontWeight: 800,
                textTransform: "none",
                boxShadow: "none",
                "&:hover": {
                  bgcolor: "#E8F0E8",
                  boxShadow: "none",
                },
              }}
            >
              Masuk Sekarang
            </Button>
          </Box>
        </Container>
      </Box>

      {/* ================= FOOTER ================= */}
      <Box
        id="kontak"
        component="footer"
        sx={{
          bgcolor: "#204F31",
          color: "#FFFFFF",
          py: { xs: 4, md: 4 },
          width: "100%",
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems="center"
            spacing={2.5}
            sx={{
              textAlign: { xs: "center", md: "left" },
            }}
          >
            <Box>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent={{ xs: "center", md: "flex-start" }}
                spacing={1}
                mb={1}
              >
                <Typography
                  color="#FFFFFF"
                  fontWeight={800}
                  fontSize={15}
                >
                </Typography>
              </Stack>

              <Typography
                sx={{
                  color: "#D5E4D7",
                  fontSize: 12,
                  lineHeight: 1.8,
                }}
              >
              </Typography>
            </Box>

            <Box
            sx={{
                width: "100%",
                textAlign: "center",
                mt: { xs: 1, md: 0 },
                pt: { xs: 2, md: 0 },
                borderTop: {
                xs: "1px solid rgba(255,255,255,0.18)",
                md: "none",
                },
            }}
            >
            <Typography
                sx={{
                color: "#E3EEE5",
                fontSize: 12,
                textAlign: "center",
                lineHeight: 1.8,
                }}
            >
                © 2026 Rumah Sahabat Qur'an. All Rights Reserved.
            </Typography>
            </Box>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}