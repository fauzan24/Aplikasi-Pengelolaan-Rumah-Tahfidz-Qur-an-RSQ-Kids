import {
	Bell,
	BookOpen,
	CalendarDays,
	CheckCircle2,
	LogOut,
	Wallet,
} from "lucide-react";

const aktivitasSantri = [
	{ tanggal: "15 Okt 2026", materi: "Surah Al-Mulk ayat 1-5", nilai: "Sangat baik" },
	{ tanggal: "13 Okt 2026", materi: "Murajaah Juz 30", nilai: "Baik" },
	{ tanggal: "10 Okt 2026", materi: "Surah An-Naba ayat 1-10", nilai: "Baik" },
];

export default function DashboardWalisantri({ pengguna, onLogout }) {
	return (
		<main className="dw-page">
			<style>{`
				.dw-page { min-height: 100vh; background: #FBF9F3; color: #28352C; font-family: 'Plus Jakarta Sans', sans-serif; }
				.dw-page *, .dw-page *::before, .dw-page *::after { box-sizing: border-box; }
				.dw-topbar { height: 72px; display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 0 5vw; border-bottom: 1px solid #E8E6DE; background: #fff; }
				.dw-brand { display: flex; align-items: center; gap: 10px; font-size: 14px; font-weight: 800; }
				.dw-brand-mark { width: 36px; height: 36px; display: grid; place-items: center; border-radius: 9px; background: #EFF3EA; color: #5A734E; }
				.dw-user { display: flex; align-items: center; gap: 12px; }
				.dw-user-name { font-size: 11px; font-weight: 700; }
				.dw-user-role { margin-top: 3px; color: #838B82; font-size: 10px; }
				.dw-logout { display: inline-flex; align-items: center; gap: 7px; padding: 8px 11px; border: 1px solid #E2E0D6; border-radius: 8px; background: #fff; color: #566752; font: inherit; font-size: 11px; cursor: pointer; }
				.dw-content { width: min(1080px, calc(100% - 48px)); margin: 0 auto; padding: 34px 0 48px; }
				.dw-heading { margin-bottom: 24px; }
				.dw-heading h1 { margin: 0 0 6px; font-size: 26px; font-weight: 800; }
				.dw-heading p { margin: 0; color: #879085; font-size: 12px; line-height: 1.6; }
				.dw-grid { display: grid; grid-template-columns: minmax(0, 1.4fr) minmax(250px, .8fr); gap: 16px; }
				.dw-panel { min-width: 0; padding: 20px; border: 1px solid #E9E6DD; border-radius: 12px; background: #fff; }
				.dw-panel h2 { margin: 0 0 17px; font-size: 15px; font-weight: 800; }
				.dw-child { display: flex; align-items: center; gap: 14px; }
				.dw-child-avatar { width: 48px; height: 48px; display: grid; place-items: center; flex: 0 0 auto; border-radius: 50%; background: #EFF3EA; color: #5A734E; font-size: 13px; font-weight: 800; }
				.dw-child strong { font-size: 13px; }
				.dw-child p { margin: 5px 0 0; color: #879085; font-size: 11px; }
				.dw-progress-label { display: flex; justify-content: space-between; gap: 12px; margin: 20px 0 8px; color: #6C7669; font-size: 11px; }
				.dw-progress-track { height: 9px; overflow: hidden; border-radius: 9px; background: #EDF0E7; }
				.dw-progress-fill { width: 64%; height: 100%; border-radius: inherit; background: #68835D; }
				.dw-stat { display: flex; align-items: center; gap: 13px; padding: 15px 0; border-bottom: 1px solid #ECEAE3; }
				.dw-stat:last-child { padding-bottom: 0; border-bottom: 0; }
				.dw-stat-icon { width: 36px; height: 36px; display: grid; place-items: center; flex: 0 0 auto; border-radius: 10px; background: #EFF3EA; color: #5A734E; }
				.dw-stat-icon.wallet { background: #F8F1E2; color: #B18A4C; }
				.dw-stat-text span { display: block; color: #879085; font-size: 10px; }
				.dw-stat-text strong { display: block; margin-top: 4px; font-size: 12px; }
				.dw-activity { grid-column: 1 / -1; }
				.dw-table-wrap { overflow-x: auto; }
				.dw-table { width: 100%; border-collapse: collapse; text-align: left; white-space: nowrap; }
				.dw-table th { padding: 11px 12px; background: #5A734E; color: #fff; font-size: 10px; }
				.dw-table td { padding: 13px 12px; border-bottom: 1px solid #ECEAE3; color: #5D685D; font-size: 11px; }
				.dw-table tr:last-child td { border-bottom: 0; }
				.dw-grade { color: #218365 !important; font-weight: 700; }
				@media (max-width: 700px) { .dw-grid { grid-template-columns: 1fr; } .dw-activity { grid-column: auto; } }
				@media (max-width: 520px) { .dw-topbar { height: 64px; padding: 0 14px; } .dw-brand { font-size: 12px; } .dw-user-name, .dw-user-role { display: none; } .dw-logout { padding: 8px; font-size: 0; } .dw-content { width: calc(100% - 28px); padding-top: 24px; } .dw-heading h1 { font-size: 22px; } .dw-panel { padding: 16px 13px; } }
			`}</style>

			<header className="dw-topbar">
				<div className="dw-brand">
					<span className="dw-brand-mark"><BookOpen size={20} /></span>
					Rumah Sahabat Qur'an
				</div>
				<div className="dw-user">
					<Bell size={18} color="#5A734E" aria-label="Notifikasi" />
					<div>
						<div className="dw-user-name">{pengguna?.nama ?? "Wali Santri"}</div>
						<div className="dw-user-role">Wali Santri</div>
					</div>
					<button type="button" className="dw-logout" onClick={onLogout}>
						<LogOut size={15} /> Keluar
					</button>
				</div>
			</header>

			<div className="dw-content">
				<section className="dw-heading">
					<h1>Selamat Datang, {pengguna?.nama ?? "Wali Santri"}</h1>
					<p>Pantau perkembangan belajar dan informasi administrasi ananda.</p>
				</section>

				<div className="dw-grid">
					<section className="dw-panel">
						<h2>Profil Santri</h2>
						<div className="dw-child">
							<div className="dw-child-avatar">AA</div>
							<div>
								<strong>Fauzan Najib Ali</strong>
								<p>NIS RSQ006 · Kelas Pagi A</p>
							</div>
						</div>
						<div className="dw-progress-label"><span>Progres belajar semester ini</span><strong>64%</strong></div>
						<div className="dw-progress-track"><div className="dw-progress-fill" /></div>
					</section>

					<section className="dw-panel">
						<h2>Informasi</h2>
						<div className="dw-stat">
							<div className="dw-stat-icon"><CheckCircle2 size={19} /></div>
							<div className="dw-stat-text"><span>Status belajar</span><strong>Aktif</strong></div>
						</div>
						<div className="dw-stat">
							<div className="dw-stat-icon wallet"><Wallet size={19} /></div>
							<div className="dw-stat-text"><span>Pembayaran SPP</span><strong>Oktober · Lunas</strong></div>
						</div>
						<div className="dw-stat">
							<div className="dw-stat-icon"><CalendarDays size={19} /></div>
							<div className="dw-stat-text"><span>Jadwal berikutnya</span><strong>Besok, 08.00</strong></div>
						</div>
					</section>

					<section className="dw-panel dw-activity">
						<h2>Aktivitas Belajar Terbaru</h2>
						<div className="dw-table-wrap">
							<table className="dw-table">
								<thead><tr><th>TANGGAL</th><th>MATERI</th><th>HASIL</th></tr></thead>
								<tbody>
									{aktivitasSantri.map((aktivitas) => (
										<tr key={aktivitas.tanggal}>
											<td>{aktivitas.tanggal}</td>
											<td>{aktivitas.materi}</td>
											<td className="dw-grade">{aktivitas.nilai}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</section>
				</div>
			</div>
		</main>
	);
}