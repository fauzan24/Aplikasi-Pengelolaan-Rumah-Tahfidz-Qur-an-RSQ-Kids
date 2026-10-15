
import { useMemo, useState } from "react";
import {
  Search,
  Pencil,
  Trash2,
  X,
  Save,
  BookOpen,
} from "lucide-react";
import LayoutPengajar from "../../components/pengajar/LayoutPengajar";

const dataAwal = [
  {
    id: "RSQ001",
    nama: "Jauza Askana",
    bacaan: 90,
    hafalan: 88,
    iqro: 90,
  },
  {
    id: "RSQ004",
    nama: "Dede Ridho",
    bacaan: 88,
    hafalan: 89,
    iqro: 88,
  },
  {
    id: "RSQ006",
    nama: "Aisyah Putri",
    bacaan: 89,
    hafalan: 90,
    iqro: 90,
  },
];

const hitungRataRata = (santri) => {
  const nilai = [santri.bacaan, santri.hafalan, santri.iqro]
    .filter((n) => n !== "" && n !== null && n !== undefined)
    .map(Number);

  if (!nilai.length) return "-";

  return Math.round(
    nilai.reduce((total, n) => total + n, 0) / nilai.length
  );
};

export default function InputNilai({ onNavigate, onLogout }) {
  const [santriList, setSantriList] = useState(dataAwal);
  const [keyword, setKeyword] = useState("");
  const [santriEdit, setSantriEdit] = useState(null);
  const [formNilai, setFormNilai] = useState({
    bacaan: "",
    hafalan: "",
    iqro: "",
  });

  const dataTampil = useMemo(() => {
    const cari = keyword.toLowerCase().trim();

    return santriList.filter(
      (santri) =>
        santri.nama.toLowerCase().includes(cari) ||
        santri.id.toLowerCase().includes(cari)
    );
  }, [santriList, keyword]);

  const bukaEdit = (santri) => {
    setSantriEdit(santri);
    setFormNilai({
      bacaan: santri.bacaan,
      hafalan: santri.hafalan,
      iqro: santri.iqro,
    });
  };

  const simpanNilai = (e) => {
    e.preventDefault();

    setSantriList((sebelumnya) =>
      sebelumnya.map((santri) =>
        santri.id === santriEdit.id
          ? {
              ...santri,
              bacaan: formNilai.bacaan === "" ? "" : Number(formNilai.bacaan),
              hafalan: formNilai.hafalan === "" ? "" : Number(formNilai.hafalan),
              iqro: formNilai.iqro === "" ? "" : Number(formNilai.iqro),
            }
          : santri
      )
    );

    setSantriEdit(null);
  };

  const hapusNilai = (id) => {
    const yakin = window.confirm(
      "Yakin ingin menghapus data nilai santri ini?"
    );

    if (!yakin) return;

    setSantriList((sebelumnya) =>
      sebelumnya.filter((santri) => santri.id !== id)
    );
  };

  return (
    <LayoutPengajar
      activeMenu="Input Nilai"
      onNavigate={onNavigate}
      onLogout={onLogout}
    >
      <div className="in-page">
        <style>{`
          .in-page {
            min-height: calc(100vh - 76px);
            padding: 30px;
            background: #FBF9F3;
            color: #28352C;
            font-family: 'Plus Jakarta Sans', sans-serif;
          }

          .in-page * {
            box-sizing: border-box;
          }

          .in-heading {
            margin-bottom: 24px;
          }

          .in-heading h1 {
            margin: 0 0 8px;
            font-size: 27px;
            font-weight: 800;
            letter-spacing: -.8px;
          }

          .in-heading p {
            margin: 0;
            color: #899287;
            font-size: 13px;
            line-height: 1.7;
          }

          .in-search-row {
            display: flex;
            gap: 12px;
            margin-bottom: 24px;
          }

          .in-search {
            flex: 1;
            min-width: 0;
            height: 48px;
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 0 15px;
            border: 1px solid #E7E4DB;
            border-radius: 13px;
            background: #FFFFFF;
            color: #71816D;
          }

          .in-search input {
            width: 100%;
            border: none;
            outline: none;
            background: transparent;
            color: #28352C;
            font-family: inherit;
            font-size: 12px;
          }

          .in-search input::placeholder {
            color: #A0A69D;
          }

          .in-search-button {
            min-width: 120px;
            padding: 0 22px;
            border: none;
            border-radius: 12px;
            background: #5A734E;
            color: #FFFFFF;
            font-family: inherit;
            font-size: 12px;
            font-weight: 700;
            cursor: pointer;
          }

          .in-search-button:hover {
            background: #30442E;
          }

          .in-table-card {
            overflow: hidden;
            padding: 12px;
            border: 1px solid #EAE7DF;
            border-radius: 22px;
            background: #FFFFFF;
          }

          .in-table-scroll {
            width: 100%;
            overflow-x: auto;
            border-radius: 15px;
          }

          .in-table {
            width: 100%;
            min-width: 750px;
            border-collapse: separate;
            border-spacing: 0;
            table-layout: fixed;
            text-align: center;
          }

          .in-table thead {
            background: #5A734E;
            color: #FFFFFF;
          }

          .in-table th {
            padding: 17px 12px;
            font-size: 11px;
            font-weight: 700;
          }

          .in-table thead tr:first-child th:first-child {
            border-top-left-radius: 14px;
          }

          .in-table thead tr:first-child th:last-child {
            border-top-right-radius: 14px;
          }

          .in-table .in-group-heading {
            padding-top: 18px;
            padding-bottom: 14px;
            border-bottom: 1px solid rgba(255,255,255,.12);
          }

          .in-table .in-subheading th {
            padding: 12px 8px 17px;
            font-size: 10px;
            line-height: 1.7;
          }

          .in-table td {
            height: 76px;
            padding: 12px 10px;
            border-bottom: 1px solid #ECEAE3;
            color: #626B60;
            font-size: 12px;
          }

          .in-table tbody tr:hover {
            background: #FCFBF7;
          }

          .in-table tbody tr:last-child td {
            border-bottom: none;
          }

          .in-table .in-name {
            color: #28352C;
            font-weight: 600;
            text-align: left;
          }

          .in-table .in-score {
            color: #28352C;
            font-size: 13px;
            font-weight: 700;
          }

          .in-actions {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
          }

          .in-icon-button {
            width: 40px;
            height: 40px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border: none;
            border-radius: 12px;
            cursor: pointer;
            transition: background .2s ease;
          }

          .in-edit {
            background: #EBECE5;
            color: #526D48;
          }

          .in-edit:hover {
            background: #DDE4D6;
          }

          .in-delete {
            background: #F9DFDF;
            color: #CB3E36;
          }

          .in-delete:hover {
            background: #F4CCCC;
          }

          .in-empty {
            padding: 38px !important;
            color: #899287 !important;
            text-align: center;
          }

          .in-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 12px;
            padding: 15px 8px 4px;
            color: #899287;
            font-size: 11px;
          }

          .in-modal-backdrop {
            position: fixed;
            inset: 0;
            z-index: 2000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 18px;
            background: rgba(24, 36, 25, .48);
          }

          .in-modal {
            width: 100%;
            max-width: 450px;
            padding: 25px;
            border-radius: 20px;
            background: #FFFFFF;
            box-shadow: 0 20px 60px rgba(0,0,0,.16);
          }

          .in-modal-header {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 15px;
            margin-bottom: 22px;
          }

          .in-modal-header h2 {
            margin: 0 0 6px;
            font-size: 20px;
          }

          .in-modal-header p {
            margin: 0;
            color: #899287;
            font-size: 12px;
          }

          .in-close {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 32px;
            height: 32px;
            border: none;
            border-radius: 9px;
            background: #F2F3EE;
            color: #52614E;
            cursor: pointer;
          }

          .in-form {
            display: grid;
            gap: 16px;
          }

          .in-field {
            display: grid;
            gap: 7px;
          }

          .in-field label {
            color: #4F5D4B;
            font-size: 12px;
            font-weight: 700;
          }

          .in-field input {
            width: 100%;
            height: 44px;
            padding: 0 12px;
            border: 1px solid #E2E5DC;
            border-radius: 10px;
            outline: none;
            background: #FCFBF8;
            color: #28352C;
            font-family: inherit;
            font-size: 13px;
          }

          .in-field input:focus {
            border-color: #5A734E;
            box-shadow: 0 0 0 3px rgba(90,115,78,.1);
          }

          .in-modal-actions {
            display: flex;
            justify-content: flex-end;
            gap: 10px;
            margin-top: 8px;
          }

          .in-cancel,
          .in-save {
            min-height: 42px;
            padding: 0 16px;
            border-radius: 10px;
            font-family: inherit;
            font-size: 12px;
            font-weight: 700;
            cursor: pointer;
          }

          .in-cancel {
            border: 1px solid #E2E5DC;
            background: white;
            color: #52614E;
          }

          .in-save {
            display: inline-flex;
            align-items: center;
            gap: 7px;
            border: none;
            background: #5A734E;
            color: white;
          }

          .in-save:hover {
            background: #30442E;
          }

          @media (max-width: 700px) {
            .in-page {
              padding: 22px 14px;
            }

            .in-heading h1 {
              font-size: 23px;
            }

            .in-search-row {
              gap: 8px;
            }

            .in-search-button {
              min-width: 90px;
              padding: 0 12px;
            }

            .in-table-card {
              padding: 8px;
              border-radius: 16px;
            }

            .in-footer {
              align-items: flex-start;
              flex-direction: column;
            }
          }
        `}</style>

        <div className="in-heading">
          <h1>Input Nilai</h1>
          <p>
            Kelola nilai bacaan Al-Qur’an, hafalan, dan Iqro santri yang kamu ampu.
          </p>
        </div>

        <div className="in-search-row">
          <label className="in-search">
            <input
              type="search"
              placeholder="Cari nama atau NIS santri..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <Search size={20} />
          </label>

          <button
            className="in-search-button"
            onClick={() => setKeyword(keyword.trim())}
          >
            Tampilkan
          </button>
        </div>

        <section className="in-table-card">
          <div className="in-table-scroll">
            <table className="in-table">
              <colgroup>
                <col style={{ width: "6%" }} />
                <col style={{ width: "11%" }} />
                <col style={{ width: "21%" }} />
                <col style={{ width: "12%" }} />
                <col style={{ width: "12%" }} />
                <col style={{ width: "12%" }} />
                <col style={{ width: "12%" }} />
                <col style={{ width: "14%" }} />
              </colgroup>

              <thead>
                <tr>
                  <th rowSpan={2}>No</th>
                  <th rowSpan={2}>NIS</th>
                  <th rowSpan={2}>Nama Santri</th>
                  <th colSpan={3} className="in-group-heading">
                    Penilaian
                  </th>
                  <th rowSpan={2}>Rata-rata</th>
                  <th rowSpan={2}>Aksi</th>
                </tr>
                <tr className="in-subheading">
                  <th>Bacaan Al-Qur’an</th>
                  <th>Hafalan</th>
                  <th>Iqro</th>
                </tr>
              </thead>

              <tbody>
                {dataTampil.length > 0 ? (
                  dataTampil.map((santri, index) => (
                    <tr key={santri.id}>
                      <td>{index + 1}.</td>
                      <td>{santri.id}</td>
                      <td className="in-name">{santri.nama}</td>
                      <td className="in-score">
                        {santri.bacaan === "" ? "-" : santri.bacaan}
                      </td>
                      <td className="in-score">
                        {santri.hafalan === "" ? "-" : santri.hafalan}
                      </td>
                      <td className="in-score">
                        {santri.iqro === "" ? "-" : santri.iqro}
                      </td>
                      <td className="in-score">{hitungRataRata(santri)}</td>
                      <td>
                        <div className="in-actions">
                          <button
                            className="in-icon-button in-edit"
                            title="Edit nilai"
                            aria-label={`Edit nilai ${santri.nama}`}
                            onClick={() => bukaEdit(santri)}
                          >
                            <Pencil size={18} />
                          </button>
                          <button
                            className="in-icon-button in-delete"
                            title="Hapus nilai"
                            aria-label={`Hapus nilai ${santri.nama}`}
                            onClick={() => hapusNilai(santri.id)}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="in-empty">
                      <BookOpen
                        size={24}
                        style={{ display: "block", margin: "0 auto 8px" }}
                      />
                      Santri tidak ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="in-footer">
            <span>
              Menampilkan {dataTampil.length} dari {santriList.length} santri
            </span>
            <span>Semester Ganjil · Tahun Ajaran 2026/2027</span>
          </div>
        </section>

        {santriEdit && (
          <div
            className="in-modal-backdrop"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) setSantriEdit(null);
            }}
          >
            <section
              className="in-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="in-modal-title"
            >
              <div className="in-modal-header">
                <div>
                  <h2 id="in-modal-title">Edit Nilai Santri</h2>
                  <p>
                    {santriEdit.nama} · {santriEdit.id}
                  </p>
                </div>
                <button
                  className="in-close"
                  aria-label="Tutup"
                  onClick={() => setSantriEdit(null)}
                >
                  <X size={18} />
                </button>
              </div>

              <form className="in-form" onSubmit={simpanNilai}>
                {[
                  ["bacaan", "Nilai Bacaan Al-Qur’an"],
                  ["hafalan", "Nilai Hafalan"],
                  ["iqro", "Nilai Iqro"],
                ].map(([field, label]) => (
                  <div className="in-field" key={field}>
                    <label htmlFor={`nilai-${field}`}>{label}</label>
                    <input
                      id={`nilai-${field}`}
                      type="number"
                      min="0"
                      max="100"
                      value={formNilai[field]}
                      onChange={(e) =>
                        setFormNilai((sebelumnya) => ({
                          ...sebelumnya,
                          [field]: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                ))}

                <div className="in-modal-actions">
                  <button
                    type="button"
                    className="in-cancel"
                    onClick={() => setSantriEdit(null)}
                  >
                    Batal
                  </button>
                  <button type="submit" className="in-save">
                    <Save size={16} />
                    Simpan Nilai
                  </button>
                </div>
              </form>
            </section>
          </div>
        )}
      </div>
    </LayoutPengajar>
  );
}