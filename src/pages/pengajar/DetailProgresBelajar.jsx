import { useState } from "react";
import { Pencil, Trash2, X, Save, UserRound } from "lucide-react";
import LayoutPengajar from "../../components/pengajar/LayoutPengajar";

const dataAwal = [
  {
    id: 1,
    tanggal: "05/04/2026",
    pelajaran: "Tahfidz",
    progres: 30,
    catatan: "Surat AT-Takatsur",
  },
  {
    id: 2,
    tanggal: "13/04/2026",
    pelajaran: "Bacaan",
    progres: 60,
    catatan: "AT-Takwir",
  },
  {
    id: 3,
    tanggal: "15/04/2026",
    pelajaran: "Iqro",
    progres: 50,
    catatan: "Jilid 3",
  },
];

export default function DetailProgresBelajar({
  santri,
  onNavigate,
  onLogout,
}) {
  const [daftarProgres, setDaftarProgres] = useState(dataAwal);
  const [dataEdit, setDataEdit] = useState(null);

  const bukaEdit = (item) => setDataEdit({ ...item });

  const simpanEdit = (e) => {
    e.preventDefault();

    setDaftarProgres((data) =>
      data.map((item) =>
        item.id === dataEdit.id ? dataEdit : item
      )
    );

    setDataEdit(null);
  };

  const hapusProgres = (id) => {
    if (!window.confirm("Yakin ingin menghapus catatan progres ini?")) {
      return;
    }

    setDaftarProgres((data) =>
      data.filter((item) => item.id !== id)
    );
  };

  const tanggalValid = (tanggal) => {
    const bagian = tanggal.split("/");
    return bagian.length === 3 &&
      bagian.every((nilai) => nilai.trim() !== "");
  };

  return (
    <LayoutPengajar
      activeMenu="Progres Belajar"
      onNavigate={onNavigate}
      onLogout={onLogout}
    >
      <div className="dpb-page">
        <style>{`
          .dpb-page {
            min-height: calc(100vh - 76px);
            padding: 30px;
            background: #FBF9F3;
            color: #28352C;
            font-family: 'Plus Jakarta Sans', sans-serif;
          }
          .dpb-page * { box-sizing: border-box; }
          .dpb-page h1 {
            margin: 0 0 28px;
            font-size: 26px;
            font-weight: 800;
          }
          .dpb-profile {
            display: flex;
            align-items: center;
            gap: 20px;
            width: min(100%, 520px);
            margin-bottom: 30px;
            padding: 24px;
            border: 1px solid #EAE7DF;
            border-radius: 24px;
            background: white;
          }
          .dpb-avatar {
            width: 86px;
            height: 86px;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background: #5A734E;
            color: white;
          }
          .dpb-profile h2 {
            margin: 0 0 12px;
            font-size: 17px;
          }
          .dpb-profile p {
            margin: 7px 0;
            color: #626B60;
            font-size: 12px;
          }
          .dpb-card {
            overflow: hidden;
            padding: 12px 22px;
            border: 1px solid #EAE7DF;
            border-radius: 24px;
            background: white;
          }
          .dpb-scroll { overflow-x: auto; }
          .dpb-table {
            width: 100%;
            min-width: 850px;
            border-collapse: collapse;
            text-align: left;
          }
          .dpb-table thead {
            background: #5A734E;
            color: white;
          }
          .dpb-table th {
            height: 60px;
            padding: 0 18px;
            font-size: 12px;
          }
          .dpb-table th:first-child { border-radius: 12px 0 0 0; }
          .dpb-table th:last-child {
            border-radius: 0 12px 0 0;
            text-align: center;
          }
          .dpb-table td {
            height: 88px;
            padding: 14px 18px;
            border-bottom: 1px solid #ECEAE3;
            color: #626B60;
            font-size: 12px;
          }
          .dpb-table tbody tr:last-child td { border-bottom: 0; }
          .dpb-progress {
            display: flex;
            align-items: center;
            gap: 12px;
            min-width: 155px;
          }
          .dpb-track {
            flex: 1;
            height: 12px;
            overflow: hidden;
            border-radius: 20px;
            background: #E9E7E0;
          }
          .dpb-fill {
            height: 100%;
            border-radius: inherit;
            background: #5A734E;
          }
          .dpb-percent {
            min-width: 38px;
            color: #28352C;
            font-size: 13px;
            font-weight: 800;
          }
          .dpb-actions {
            display: flex;
            justify-content: center;
            gap: 8px;
          }
          .dpb-icon-btn {
            width: 42px;
            height: 42px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border: 0;
            border-radius: 12px;
            cursor: pointer;
          }
          .dpb-edit { background: #EBECE5; color: #526D48; }
          .dpb-edit:hover { background: #DDE4D6; }
          .dpb-delete { background: #F9DFDF; color: #CB3E36; }
          .dpb-delete:hover { background: #F4CCCC; }
          .dpb-empty {
            padding: 35px !important;
            text-align: center;
          }
          .dpb-back {
            margin-bottom: 20px;
            padding: 9px 14px;
            border: 1px solid #DCDDD3;
            border-radius: 10px;
            background: white;
            color: #526D48;
            font: inherit;
            font-size: 12px;
            cursor: pointer;
          }
          .dpb-modal-bg {
            position: fixed;
            inset: 0;
            z-index: 2000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 18px;
            background: rgba(24,36,25,.48);
          }
          .dpb-modal {
            width: 100%;
            max-width: 460px;
            padding: 25px;
            border-radius: 20px;
            background: white;
            box-shadow: 0 20px 60px rgba(0,0,0,.16);
          }
          .dpb-modal-head {
            display: flex;
            justify-content: space-between;
            gap: 12px;
            margin-bottom: 20px;
          }
          .dpb-modal-head h2 { margin: 0; font-size: 19px; }
          .dpb-close {
            width: 32px;
            height: 32px;
            border: 0;
            border-radius: 9px;
            background: #F2F3EE;
            cursor: pointer;
          }
          .dpb-form { display: grid; gap: 15px; }
          .dpb-field { display: grid; gap: 7px; }
          .dpb-field label {
            font-size: 12px;
            font-weight: 700;
            color: #4F5D4B;
          }
          .dpb-field input {
            width: 100%;
            height: 43px;
            padding: 0 12px;
            border: 1px solid #E2E5DC;
            border-radius: 10px;
            outline: none;
            font: inherit;
            font-size: 13px;
          }
          .dpb-modal-actions {
            display: flex;
            justify-content: flex-end;
            gap: 10px;
            margin-top: 7px;
          }
          .dpb-cancel, .dpb-save {
            min-height: 41px;
            padding: 0 15px;
            border-radius: 10px;
            font: inherit;
            font-size: 12px;
            font-weight: 700;
            cursor: pointer;
          }
          .dpb-cancel {
            border: 1px solid #E2E5DC;
            background: white;
            color: #52614E;
          }
          .dpb-save {
            display: inline-flex;
            align-items: center;
            gap: 7px;
            border: 0;
            background: #5A734E;
            color: white;
          }
          @media (max-width: 650px) {
            .dpb-page { padding: 22px 14px; }
            .dpb-page h1 { font-size: 23px; }
            .dpb-profile { padding: 18px; gap: 14px; }
            .dpb-avatar { width: 65px; height: 65px; }
            .dpb-card { padding: 8px; border-radius: 16px; }
          }
        `}</style>

        <h1>Detail Progres Belajar</h1>

        <button
          className="dpb-back"
          onClick={() => onNavigate?.("Progres Belajar")}
        >
          ← Kembali ke daftar santri
        </button>

        <section className="dpb-profile">
          <div className="dpb-avatar">
            <UserRound size={42} strokeWidth={1.5} />
          </div>
          <div>
            <h2>{santri?.nama || "Santri"}</h2>
            <p>NIS: {santri?.id || "-"}</p>
            <p>Kelas: {santri?.kelas || "-"}</p>
          </div>
        </section>

        <section className="dpb-card">
          <div className="dpb-scroll">
            <table className="dpb-table">
              <thead>
                <tr>
                  <th style={{ width: "6%" }}>No</th>
                  <th style={{ width: "16%" }}>Tanggal</th>
                  <th style={{ width: "18%" }}>Mata Pelajaran</th>
                  <th style={{ width: "22%" }}>Progres</th>
                  <th style={{ width: "20%" }}>Catatan</th>
                  <th style={{ width: "18%" }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {daftarProgres.length > 0 ? (
                  daftarProgres.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}.</td>
                      <td>{item.tanggal}</td>
                      <td>{item.pelajaran}</td>
                      <td>
                        <div className="dpb-progress">
                          <div className="dpb-track">
                            <div
                              className="dpb-fill"
                              style={{
                                width: `${Math.min(
                                  100,
                                  Math.max(0, Number(item.progres) || 0)
                                )}%`,
                              }}
                            />
                          </div>
                          <span className="dpb-percent">
                            {item.progres}%
                          </span>
                        </div>
                      </td>
                      <td>{item.catatan}</td>
                      <td>
                        <div className="dpb-actions">
                          <button
                            className="dpb-icon-btn dpb-edit"
                            title="Edit progres"
                            aria-label="Edit progres"
                            onClick={() => bukaEdit(item)}
                          >
                            <Pencil size={19} />
                          </button>
                          <button
                            className="dpb-icon-btn dpb-delete"
                            title="Hapus progres"
                            aria-label="Hapus progres"
                            onClick={() => hapusProgres(item.id)}
                          >
                            <Trash2 size={19} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="dpb-empty">
                      Belum ada catatan progres belajar.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {dataEdit && (
          <div
            className="dpb-modal-bg"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) setDataEdit(null);
            }}
          >
            <section
              className="dpb-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="dpb-modal-title"
            >
              <div className="dpb-modal-head">
                <h2 id="dpb-modal-title">Edit Progres Belajar</h2>
                <button
                  className="dpb-close"
                  aria-label="Tutup"
                  onClick={() => setDataEdit(null)}
                >
                  <X size={18} />
                </button>
              </div>

              <form className="dpb-form" onSubmit={simpanEdit}>
                <div className="dpb-field">
                  <label htmlFor="dpb-tanggal">Tanggal (DD/MM/YYYY)</label>
                  <input
                    id="dpb-tanggal"
                    type="text"
                    value={dataEdit.tanggal}
                    onChange={(e) =>
                      setDataEdit({
                        ...dataEdit,
                        tanggal: e.target.value,
                      })
                    }
                    required
                  />
                  {!tanggalValid(dataEdit.tanggal) && (
                    <span style={{ color: "#CB3E36", fontSize: 11 }}>
                      Isi tanggal dengan format DD/MM/YYYY.
                    </span>
                  )}
                </div>

                <div className="dpb-field">
                  <label htmlFor="dpb-pelajaran">Mata Pelajaran</label>
                  <input
                    id="dpb-pelajaran"
                    value={dataEdit.pelajaran}
                    onChange={(e) =>
                      setDataEdit({
                        ...dataEdit,
                        pelajaran: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="dpb-field">
                  <label htmlFor="dpb-progres">Progres (%)</label>
                  <input
                    id="dpb-progres"
                    type="number"
                    min="0"
                    max="100"
                    value={dataEdit.progres}
                    onChange={(e) =>
                      setDataEdit({
                        ...dataEdit,
                        progres: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="dpb-field">
                  <label htmlFor="dpb-catatan">Catatan</label>
                  <input
                    id="dpb-catatan"
                    value={dataEdit.catatan}
                    onChange={(e) =>
                      setDataEdit({
                        ...dataEdit,
                        catatan: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="dpb-modal-actions">
                  <button
                    type="button"
                    className="dpb-cancel"
                    onClick={() => setDataEdit(null)}
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="dpb-save"
                    disabled={
                      !tanggalValid(dataEdit.tanggal) ||
                      !dataEdit.pelajaran.trim() ||
                      !dataEdit.catatan.trim() ||
                      dataEdit.progres === "" ||
                      Number(dataEdit.progres) < 0 ||
                      Number(dataEdit.progres) > 100
                    }
                  >
                    <Save size={16} />
                    Simpan
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