import { useEffect, useState } from "react"
import Header from "./components/Header"
import StudyForm from "./components/StudyForm"

function App() {
  const [studies, setStudies] = useState(() => {
    const savedStudies = localStorage.getItem("studies")

    return savedStudies ? JSON.parse(savedStudies) : []
  })

  const [editingStudy, setEditingStudy] = useState(null)

  useEffect(() => {
    localStorage.setItem("studies", JSON.stringify(studies))
  }, [studies])

  const addStudy = (newStudy) => {
    setStudies([...studies, newStudy])
  }

  const deleteStudy = (id) => {
    const updatedStudies = studies.filter((study) => study.id !== id)
    setStudies(updatedStudies)
  }

  const updateStudy = (updatedStudy) => {
    const updatedStudies = studies.map((study) =>
      study.id === updatedStudy.id ? updatedStudy : study
    )

    setStudies(updatedStudies)
    setEditingStudy(null)
  }

  const getStatusClass = (status) => {
    if (status === "Tamamlandı") {
      return "bg-success"
    }

    if (status === "Devam Ediyor") {
      return "bg-primary"
    }

    return "bg-secondary"
  }

  return (
    <div>
      <Header />

      <main className="container py-5">
        <div className="mb-4">
          <h2 className="fw-bold">Çalışma Planım</h2>
          <p className="text-secondary">
            Derslerini ve çalışma görevlerini buradan yönetebilirsin.
          </p>
        </div>

        <StudyForm
          onAddStudy={addStudy}
          onUpdateStudy={updateStudy}
          editingStudy={editingStudy}
        />

        <div className="mt-5">
          <h3 className="h4 fw-bold mb-3">Görevlerim</h3>

          {studies.length === 0 ? (
            <div className="alert alert-secondary">
              Henüz çalışma görevi eklenmedi.
            </div>
          ) : (
            <div className="row g-3">
              {studies.map((study) => (
                <div className="col-md-6" key={study.id}>
                  <div className="card h-100 shadow-sm">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h4 className="h5 fw-bold mb-0">{study.course}</h4>

                        <span className={`badge ${getStatusClass(study.status)}`}>
                          {study.status}
                        </span>
                      </div>

                      <p className="text-secondary mb-3">{study.topic}</p>

                      <p className="mb-3">
                        <strong>Çalışma Tarihi:</strong> {study.date}
                      </p>

                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => setEditingStudy(study)}
                      >
                        Düzenle
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteStudy(study.id)}
                      >
                        Sil
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App