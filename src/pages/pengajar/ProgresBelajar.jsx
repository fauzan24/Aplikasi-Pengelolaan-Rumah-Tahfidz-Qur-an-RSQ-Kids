
import { useMemo, useState } from "react";
import { Assessment, Search } from "@mui/icons-material";
import {
  Button,
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
import { dataSantriProgres } from "../../data/santriProgres";

export default function ProgresBelajar({
  onNavigate,
  onLogout,
  onDetail,
}) {
  const [keyword, setKeyword] = useState("");
  const [filterKelas, setFilterKelas] = useState("Semua Kelas");

  const dataTampil = useMemo(() => {
    const cari = keyword.toLowerCase().trim();

    return dataSantriProgres.filter((santri) => {
      const cocokPencarian =
        santri.nama.toLowerCase().includes(cari) ||
        santri.id.toLowerCase().includes(cari);

      const cocokKelas =
        filterKelas === "Semua Kelas" ||
        santri.kelas === filterKelas;

      return cocokPencarian && cocokKelas;
    });
  }, [keyword, filterKelas]);

  return (
    <LayoutPengajar
      onNavigate={onNavigate}
      onLogout={onLogout}
    >
      <Stack spacing={3} sx={{ width: "100%", minWidth: 0, pb: 3 }}>
        <Typography
          component="h1"
          variant="h5"
          fontWeight={800}
          color="#28352C"
        >
          Progres Belajar
        </Typography>

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={1.5}
          sx={{ width: "100%" }}
        >
          <TextField
            fullWidth
            placeholder="Cari nama atau NIS santri..."
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            inputProps={{
              "aria-label": "Cari nama atau NIS santri",
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: "#5A734E" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                backgroundColor: "#fff",
              },
              "& .MuiInputBase-input": { fontSize: 12 },
            }}
          />

          <TextField
            select
            value={filterKelas}
            onChange={(event) => setFilterKelas(event.target.value)}
            sx={{
              minWidth: { xs: "100%", md: 190 },
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                backgroundColor: "#fff",
              },
              "& .MuiSelect-select": { fontSize: 12 },
            }}
            inputProps={{ "aria-label": "Filter kelas santri" }}
          >
            <MenuItem value="Semua Kelas">Semua Kelas</MenuItem>
            <MenuItem value="Pagi">Kelas Pagi</MenuItem>
            <MenuItem value="Sore">Kelas Sore</MenuItem>
          </TextField>
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
            <Table
              aria-label="Daftar santri dan progres belajar"
              sx={{ minWidth: 650 }}
            >
              <TableHead>
                <TableRow sx={{ backgroundColor: "#5A734E" }}>
                  {["No", "NIS", "Nama Santri", "Kelas", "Aksi"].map(
                    (label) => (
                      <TableCell
                        key={label}
                        sx={{
                          height: 55,
                          px: { xs: 1.5, sm: 2.5 },
                          color: "#fff",
                          fontSize: 12,
                          fontWeight: 700,
                          whiteSpace: "nowrap",
                          "&:last-child": { textAlign: "center" },
                        }}
                      >
                        {label}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>

              <TableBody>
                {dataTampil.length > 0 ? (
                  dataTampil.map((santri, index) => (
                    <TableRow key={santri.id} hover>
                      <TableCell sx={tableCellSx}>
                        {index + 1}.
                      </TableCell>

                      <TableCell sx={tableCellSx}>
                        {santri.id}
                      </TableCell>

                      <TableCell sx={tableCellSx}>
                        {santri.nama}
                      </TableCell>

                      <TableCell sx={tableCellSx}>
                        {santri.kelas}
                      </TableCell>

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
                    <TableCell
                      colSpan={5}
                      align="center"
                      sx={{ py: 4 }}
                    >
                      <Assessment
                        sx={{
                          display: "block",
                          mx: "auto",
                          mb: 1,
                          color: "#7B8577",
                        }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        Santri tidak ditemukan.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              display: "block",
              px: 1.5,
              py: 1.5,
              borderTop: "1px solid #ECEAE3",
            }}
          >
            Menampilkan {dataTampil.length} dari {dataSantriProgres.length} santri
          </Typography>
        </Paper>
      </Stack>
    </LayoutPengajar>
  );
}

const tableCellSx = {
  height: 75,
  px: { xs: 1.5, sm: 2.5 },
  py: 1.75,
  borderBottomColor: "#ECEAE3",
  color: "#626B60",
  fontSize: 13,
  whiteSpace: "nowrap",
};
