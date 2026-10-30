import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "progres-belajar-santri-v1";

const dataProgresAwal = [
  {
    id: "RSQ001-tilawah-1",
    santriId: "RSQ001",
    jenis: "tilawah",
    tanggal: "2026-04-05",
    hal: "1",
    surah: "Al-Fatihah",
    ayat: "1-7",
    nilai: "90",
    parafPengajar: "Ust. Aisyah",
    nilaiKelancaran: 90,
    nilaiTajwid: 88,
    nilaiMakhraj: 89,
    catatan: "Bacaan lancar dan makhraj semakin jelas.",
    dibuatOleh: "Pengajar",
  },
  {
    id: "RSQ001-hafalan-quran-1",
    santriId: "RSQ001",
    jenis: "hafalan-quran",
    tanggal: "2026-04-13",
    hal: "2",
    surah: "An-Nas",
    ayat: "1-6",
    nilai: "Lancar",
    parafPengajar: "Ust. Aisyah",
    statusSetoran: "Lancar",
    catatan: "Setoran lancar, lanjutkan murojaah mandiri.",
    dibuatOleh: "Pengajar",
  },
  {
    id: "RSQ001-hafalan-doa-1",
    santriId: "RSQ001",
    jenis: "hafalan-doa",
    tanggal: "2026-04-15",
    namaDoa: "Doa sebelum makan",
    penilaianDoa: "L",
    parafPengajar: "Ust. Aisyah",
    statusSetoran: "Lancar",
    catatan: "Hafalan sudah lancar dan pelafalan jelas.",
    dibuatOleh: "Pengajar",
  },
];

const ProgresBelajarContext = createContext(null);

function normalisasiProgres(data) {
  return data.map((item) => {
    const dataBersih = { ...item };
    delete dataBersih.parafWali;
    if (item.jenis === "hafalan-doa") {
      return {
        ...dataBersih,
        penilaianDoa:
          item.penilaianDoa ||
          (item.statusSetoran === "Lancar" ? "L" : "B.L."),
        parafPengajar: item.parafPengajar ?? "",
      };
    }
    if (item.jenis !== "tilawah" && item.jenis !== "hafalan-quran") return dataBersih;
    return {
      ...dataBersih,
      hal: item.hal ?? "",
      nilai: item.nilai ?? item.statusSetoran ?? "",
      parafPengajar: item.parafPengajar ?? "",
    };
  });
}

function bacaDataTersimpan() {
  const dataTersimpan = localStorage.getItem(STORAGE_KEY);
  if (!dataTersimpan) return normalisasiProgres(dataProgresAwal);

  const data = JSON.parse(dataTersimpan);
  if (!Array.isArray(data)) {
    throw new Error("Data progres belajar tersimpan harus berupa daftar.");
  }
  return normalisasiProgres(data);
}

export function ProgresBelajarProvider({ children }) {
  const [progres, setProgres] = useState(bacaDataTersimpan);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progres));
  }, [progres]);

  useEffect(() => {
    const sinkronkanTabLain = (event) => {
      if (event.key !== STORAGE_KEY || !event.newValue) return;
      const data = JSON.parse(event.newValue);
      if (!Array.isArray(data)) {
        throw new Error("Data progres belajar dari tab lain tidak valid.");
      }
      setProgres(data);
    };

    window.addEventListener("storage", sinkronkanTabLain);
    return () => window.removeEventListener("storage", sinkronkanTabLain);
  }, []);

  return (
    <ProgresBelajarContext.Provider value={{ progres, setProgres }}>
      {children}
    </ProgresBelajarContext.Provider>
  );
}

export function useProgresBelajar() {
  const context = useContext(ProgresBelajarContext);
  if (!context) {
    throw new Error("useProgresBelajar harus digunakan di dalam ProgresBelajarProvider");
  }
  return context;
}
