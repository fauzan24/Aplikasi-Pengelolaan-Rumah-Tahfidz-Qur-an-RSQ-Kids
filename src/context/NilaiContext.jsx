import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "nilai-santri-tahun-ajaran-v1";

const getPeriodeBerjalan = () => {
  const sekarang = new Date();
  const tahunMulai = sekarang.getMonth() >= 6 ? sekarang.getFullYear() : sekarang.getFullYear() - 1;
  return {
    tahunAjaran: `${tahunMulai}/${tahunMulai + 1}`,
    semester: sekarang.getMonth() >= 6 ? "Ganjil" : "Genap",
  };
};

const dataSantriAwal = [
  { nis: "RSQ001", nama: "Jauza Askana", kelas: "Pagi", bacaan: 90, doa: 88, tahfidz: "-", hadits: 88, adab: 89 },
  { nis: "RSQ002", nama: "Dinda Azzahra", kelas: "Pagi", bacaan: 90, doa: 87, tahfidz: 89, hadits: 88, adab: 90 },
  { nis: "RSQ003", nama: "Raffa Fadila", kelas: "Pagi", bacaan: 88, doa: "-", tahfidz: 87, hadits: 88, adab: 90 },
  { nis: "RSQ004", nama: "Dede Ridho", kelas: "Pagi", bacaan: 88, doa: 89, tahfidz: 88, hadits: 87, adab: 90 },
  { nis: "RSQ005", nama: "Kalila Haura", kelas: "Pagi", bacaan: 90, doa: 88, tahfidz: 89, hadits: 88, adab: 89 },
  { nis: "RSQ006", nama: "Fauzan Najib Ali", kelas: "Pagi", bacaan: 90, doa: 90, tahfidz: 90, hadits: 88, adab: 89 },
  { nis: "RSQ007", nama: "Muhammad Fikri", kelas: "Pagi", bacaan: 89, doa: 88, tahfidz: 90, hadits: 88, adab: 86 },
  { nis: "RSQ008", nama: "Aisyah Putri", kelas: "Sore", bacaan: 88, doa: 90, tahfidz: 87, hadits: 89, adab: 90 },
  { nis: "RSQ009", nama: "Ahmad Rizky", kelas: "Sore", bacaan: 85, doa: 88, tahfidz: 90, hadits: 87, adab: 89 },
  { nis: "RSQ010", nama: "Zahra Nabila", kelas: "Sore", bacaan: 92, doa: 90, tahfidz: 91, hadits: 88, adab: 90 },
];

const kunciPeriode = ({ tahunAjaran, semester }) => `${tahunAjaran}-${semester}`;

function buatDataAwal() {
  const periodeBerjalan = getPeriodeBerjalan();
  const periodeSebelumnya = {
    tahunAjaran: `${Number(periodeBerjalan.tahunAjaran.slice(0, 4)) - 1}/${Number(periodeBerjalan.tahunAjaran.slice(0, 4))}`,
    semester: periodeBerjalan.semester,
  };

  const dataPeriode = (periode, pengurang = 0) =>
    dataSantriAwal.map((santri) => ({
      ...santri,
      ...periode,
      ...Object.fromEntries(
        ["bacaan", "doa", "tahfidz", "hadits", "adab"].map((aspek) => [
          aspek,
          Number.isFinite(Number(santri[aspek]))
            ? Math.max(0, Number(santri[aspek]) - pengurang)
            : santri[aspek],
        ])
      ),
    }));

  return [...dataPeriode(periodeSebelumnya, 3), ...dataPeriode(periodeBerjalan)];
}

function bacaNilaiTersimpan() {
  const tersimpan = localStorage.getItem(STORAGE_KEY);
  if (!tersimpan) return buatDataAwal();

  const data = JSON.parse(tersimpan);
  if (!Array.isArray(data)) {
    throw new Error("Data penilaian tersimpan harus berupa daftar.");
  }
  return data;
}

const NilaiContext = createContext(null);

export function NilaiProvider({ children }) {
  const [nilai, setNilai] = useState(bacaNilaiTersimpan);
  const periodeBerjalan = getPeriodeBerjalan();
  const { tahunAjaran, semester } = periodeBerjalan;
  const santri = useMemo(
    () =>
      nilai.filter(
        (item) => kunciPeriode(item) === kunciPeriode({ tahunAjaran, semester })
      ),
    [nilai, tahunAjaran, semester]
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nilai));
  }, [nilai]);

  useEffect(() => {
    const sinkronkanTabLain = (event) => {
      if (event.key !== STORAGE_KEY || !event.newValue) return;
      const data = JSON.parse(event.newValue);
      if (!Array.isArray(data)) {
        throw new Error("Data penilaian dari tab lain tidak valid.");
      }
      setNilai(data);
    };

    window.addEventListener("storage", sinkronkanTabLain);
    return () => window.removeEventListener("storage", sinkronkanTabLain);
  }, []);

  const setSantri = useCallback((updater) => {
    setNilai((sebelumnya) => {
      const periode = getPeriodeBerjalan();
      const periodeKey = kunciPeriode(periode);
      const dataPeriode = sebelumnya.filter((item) => kunciPeriode(item) === periodeKey);
      const dataBaru = typeof updater === "function" ? updater(dataPeriode) : updater;
      const dataLain = sebelumnya.filter((item) => kunciPeriode(item) !== periodeKey);
      return [...dataLain, ...dataBaru.map((item) => ({ ...item, ...periode }))];
    });
  }, []);

  return (
    <NilaiContext.Provider value={{ santri, setSantri, nilai, setNilai }}>
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
