function Header() {
  return (
    <header className="bg-primary text-white py-4 shadow-sm">
      <div className="container d-flex justify-content-between align-items-center">
        <div>
          <h1 className="fw-bold mb-1">StudyTrack</h1>
          <p className="mb-0">Ders ve Çalışma Planlayıcı</p>
        </div>

        <span className="badge bg-light text-primary fs-6">
          Çalışma Takip Sistemi
        </span>
      </div>
    </header>
  )
}

export default Header