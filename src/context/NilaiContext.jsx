
import { createContext, useContext, useState } from "react";

const NilaiContext = createContext(null);


const dataAwal = [
  // Kelas Pagi
  {
    nis: "RSQ001",
    nama: "Jauza Askana",
    kelas: "Pagi",
    bacaan: 90,
    doa: 88,
    tahfidz: "-",
    hadits: 88,
    adab: 89,
  },
  {
    nis: "RSQ002",
    nama: "Dinda Azzahra",
    kelas: "Pagi",
    bacaan: 90,
    doa: 87,
    tahfidz: 89,
    hadits: 88,
    adab: 90,
  },
  {
    nis: "RSQ003",
    nama: "Raffa Fadila",
    kelas: "Pagi",
    bacaan: 88,
    doa: "-",
    tahfidz: 87,
    hadits: 88,
    adab: 90,
  },
  {
    nis: "RSQ004",
    nama: "Dede Ridho",
    kelas: "Pagi",
    bacaan: 88,
    doa: 89,
    tahfidz: 88,
    hadits: 87,
    adab: 90,
  },
  {
    nis: "RSQ005",
    nama: "Kalila Haura",
    kelas: "Pagi",
    bacaan: 90,
    doa: 88,
    tahfidz: 89,
    hadits: 88,
    adab: 89,
  },
  {
    nis: "RSQ006",
    nama: "Fauzan Najib Ali",
    kelas: "Pagi",
    bacaan: 90,
    doa: 90,
    tahfidz: 90,
    hadits: 88,
    adab: 89,
  },
  {
    nis: "RSQ007",
    nama: "Muhammad Fikri",
    kelas: "Pagi",
    bacaan: 89,
    doa: 88,
    tahfidz: 90,
    hadits: 88,
    adab: 86,
  },

  // Kelas Sore
  {
    nis: "RSQ008",
    nama: "Aisyah Putri",
    kelas: "Sore",
    bacaan: 88,
    doa: 90,
    tahfidz: 87,
    hadits: 89,
    adab: 90,
  },
  {
    nis: "RSQ009",
    nama: "Ahmad Rizky",
    kelas: "Sore",
    bacaan: 85,
    doa: 88,
    tahfidz: 90,
    hadits: 87,
    adab: 89,
  },
  {
    nis: "RSQ010",
    nama: "Zahra Nabila",
    kelas: "Sore",
    bacaan: 92,
    doa: 90,
    tahfidz: 91,
    hadits: 88,
    adab: 90,
  },
];

export function NilaiProvider({ children }) {
  const [santri, setSantri] = useState(dataAwal);

  return (
    <NilaiContext.Provider value={{ santri, setSantri }}>
      {children}
    </NilaiContext.Provider>
  );
}

export function useNilai() {
  const context = useContext(NilaiContext);

  if (!context) {
    throw new Error("useNilai harus digunakan di dalam NilaiProvider");
  }

  return context;
}