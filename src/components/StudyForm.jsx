import { useEffect, useState } from "react"

function StudyForm({ onAddStudy, onUpdateStudy, editingStudy }) {
  const [course, setCourse] = useState("")
  const [topic, setTopic] = useState("")
  const [date, setDate] = useState("")
  const [status, setStatus] = useState("Bekliyor")

  useEffect(() => {
    if (editingStudy) {
      setCourse(editingStudy.course)
      setTopic(editingStudy.topic)
      setDate(editingStudy.date)
      setStatus(editingStudy.status)
    }
  }, [editingStudy])

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!course.trim() || !topic.trim() || !date) {
      alert("Lütfen tüm alanları doldurun.")
      return
    }

    if (editingStudy) {
      const updatedStudy = {
        id: editingStudy.id,
        course,
        topic,
        date,
        status,
      }

      onUpdateStudy(updatedStudy)
    } else {
      const newStudy = {
        id: Date.now(),
        course,
        topic,
        date,
        status,
      }

      onAddStudy(newStudy)
    }

    setCourse("")
    setTopic("")
    setDate("")
    setStatus("Bekliyor")
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body p-4">
        <h3 className="h5 fw-bold mb-4">
          {editingStudy ? "Çalışma Görevini Düzenle" : "Yeni Çalışma Görevi"}
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Ders Adı</label>
              <input
                type="text"
                className="form-control"
                placeholder="Örn: Matematik"
                value={course}
                onChange={(event) => setCourse(event.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Konu</label>
              <input
                type="text"
                className="form-control"
                placeholder="Örn: Türev çalışması"
                value={topic}
                onChange={(event) => setTopic(event.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Çalışma Tarihi</label>
              <input
                type="date"
                className="form-control"
                value={date}
                onChange={(event) => setDate(event.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Durum</label>
              <select
                className="form-select"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
              >
                <option value="Bekliyor">Bekliyor</option>
                <option value="Devam Ediyor">Devam Ediyor</option>
                <option value="Tamamlandı">Tamamlandı</option>
              </select>
            </div>

            <div className="col-12">
              <button
                type="submit"
                className={
                  editingStudy ? "btn btn-warning" : "btn btn-primary"
                }
              >
                {editingStudy ? "Görevi Güncelle" : "Görev Ekle"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default StudyForm