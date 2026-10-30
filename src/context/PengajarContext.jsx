import { createContext, useContext, useState } from "react";

const dataPengajarAwal = [
  { id: 1, nama: "Ust. Ahmad", jabatan: "Pagi", noHp: "08536342239" },
  { id: 2, nama: "Ust. Fatimah", jabatan: "Pagi", noHp: "08635426235" },
  { id: 3, nama: "Ust. Hasan", jabatan: "Sore", noHp: "08356324373" },
  { id: 4, nama: "Ust. Aisyah", jabatan: "Sore", noHp: "08532352632" },
];

const PengajarContext = createContext(null);

export function PengajarProvider({ children }) {
  const [dataPengajar, setDataPengajar] = useState(dataPengajarAwal);

  return (
    <PengajarContext.Provider value={{ dataPengajar, setDataPengajar }}>
      {children}
    </PengajarContext.Provider>
  );
}

export function usePengajar() {
  const context = useContext(PengajarContext);
  if (!context) {
    throw new Error("usePengajar harus digunakan di dalam PengajarProvider");
  }
  return context;
}
