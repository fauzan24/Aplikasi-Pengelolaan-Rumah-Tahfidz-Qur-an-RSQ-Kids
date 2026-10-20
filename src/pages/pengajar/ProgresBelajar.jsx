import { useMemo, useState } from "react";
import { Assessment, Search } from "@mui/icons-material";
import {
  Button,
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

const dataSantri = [
  { id: "RSQ001", nama: "Jauza Askana", kelas: "Pagi A" },
  { id: "RSQ004", nama: "Dede Ridho", kelas: "Pagi A" },
  { id: "RSQ006", nama: "Fauzan", kelas: "Pagi A" },
];

export default function ProgresBelajar({ onNavigate, onLogout, onDetail }) {
  const [keyword, setKeyword] = useState("");

  const dataTampil = useMemo(() => {
    const cari = keyword.toLowerCase().trim();

    return dataSantri.filter(
      (santri) =>
        santri.nama.toLowerCase().includes(cari) ||
        santri.id.toLowerCase().includes(cari)
    );
  }, [keyword]);

  return (
    <LayoutPengajar
      activeMenu="Progres Belajar"
      onNavigate={onNavigate}
      onLogout={onLogout}
    >
      <Stack spacing={3} sx={{ width: "100%", minWidth: 0, pb: 3 }}>
        <Typography component="h1" variant="h5" fontWeight={800} color="#28352C">
          Progres Belajar
        </Typography>

        <Stack
          component="form"
          direction={{ xs: "column", sm: "row" }}
          spacing={1.5}
          onSubmit={(event) => {
            event.preventDefault();
            setKeyword(keyword.trim());
          }}
        >
          <TextField
            fullWidth
            type="search"
            placeholder="Cari Santri"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            inputProps={{ "aria-label": "Cari nama atau NIS santri" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search sx={{ color: "#5A734E" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": { borderRadius: 2, backgroundColor: "#fff" },
              "& .MuiInputBase-input": { fontSize: 12 },
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
            borderRadius: { xs: 2, sm: 3 },
            backgroundColor: "#fff",
          }}
        >
          <TableContainer sx={{ overflowX: "auto", borderRadius: 1.5 }}>
            <Table aria-label="Daftar santri dan progres belajar" sx={{ minWidth: 570 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#5A734E" }}>
                  {["No", "NIS", "Nama", "Aksi"].map((label) => (
                    <TableCell
                      key={label}
                      sx={{
                        height: 60,
                        px: { xs: 1.5, sm: 2.5 },
                        color: "#fff",
                        fontSize: 12,
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                        "&:first-of-type": { borderTopLeftRadius: 1.5 },
                        "&:last-child": { textAlign: "center", borderTopRightRadius: 1.5 },
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
                      <TableCell sx={tableCellSx}>{index + 1}.</TableCell>
                      <TableCell sx={tableCellSx}>{santri.id}</TableCell>
                      <TableCell sx={tableCellSx}>{santri.nama}</TableCell>
                      <TableCell align="center" sx={tableCellSx}>
                        <Button
                          variant="outlined"
                          onClick={() => onDetail?.(santri)}
                          sx={{
                            minWidth: 100,
                            px: 2.25,
                            py: 1,
                            borderColor: "#30442E",
                            borderRadius: 5,
                            color: "#30442E",
                            fontSize: 12,
                            fontWeight: 700,
                            textTransform: "none",
                            "&:hover": {
                              borderColor: "#5A734E",
                              backgroundColor: "#5A734E",
                              color: "#fff",
                            },
                          }}
                        >
                          Detail
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                      <Assessment sx={{ display: "block", mx: "auto", mb: 1, color: "#7B8577" }} />
                      <Typography variant="body2" color="text.secondary">
                        Santri tidak ditemukan.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Stack>
    </LayoutPengajar>
  );
}

const tableCellSx = {
  height: 89,
  px: { xs: 1.5, sm: 2.5 },
  py: 1.75,
  borderBottomColor: "#ECEAE3",
  color: "#626B60",
  fontSize: 13,
  whiteSpace: "nowrap",
};