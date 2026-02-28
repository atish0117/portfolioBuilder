import { useEffect, useState } from "react"
import api from "../../services/api"
import toast from "react-hot-toast"

const AdminSkillIcons = () => {
  const [icons, setIcons] = useState([])
  const [skillKey, setSkillKey] = useState("")
  const [file, setFile] = useState(null)

  const [editing, setEditing] = useState(null)
  const [editSkill, setEditSkill] = useState("")
  const [editLabel, setEditLabel] = useState("")

  /* ---------------- LOAD ---------------- */
  const loadIcons = async () => {
    try {
      const res = await api.get("/api/admin/icons")
      setIcons(res.data)
    } catch {
      toast.error("Failed to load icons")
    }
  }

  useEffect(() => {
    loadIcons()
  }, [])

  /* ---------------- UPLOAD ---------------- */
  const upload = async () => {
    if (!file || !skillKey) {
      toast.error("Skill + file required")
      return
    }

    const form = new FormData()
    form.append("icon", file)
    form.append("skillKey", skillKey)

    try {
      await api.post("/api/admin/icon", form)
      toast.success("Icon uploaded")
      setFile(null)
      setSkillKey("")
      loadIcons()
    } catch {
      toast.error("Upload failed")
    }
  }

  /* ---------------- DELETE ---------------- */
  const remove = async (id) => {
    try {
      await api.delete(`/api/admin/icon/${id}`)
      toast.success("Deleted")
      loadIcons()
    } catch {
      toast.error("Delete failed")
    }
  }

  /* ---------------- EDIT OPEN ---------------- */
  const openEdit = (icon) => {
    setEditing(icon._id)
    setEditSkill(icon.skillKey)
    setEditLabel(icon.label || "")
  }

  /* ---------------- UPDATE ---------------- */
  const saveEdit = async (id) => {
    try {
      await api.put(`/api/admin/icon/${id}`, {
        skillKey: editSkill,
        label: editLabel
      })

      toast.success("Updated")
      setEditing(null)
      loadIcons()
    } catch {
      toast.error("Update failed")
    }
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Skill Icons Manager</h1>

      {/* UPLOAD */}
      <div className="flex gap-3 items-center">
        <input
          value={skillKey}
          onChange={(e) => setSkillKey(e.target.value)}
          placeholder="Skill key (react)"
          className="input-field"
        />

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button onClick={upload} className="btn-primary">
          Upload
        </button>
      </div>

      {/* ICON GRID */}
      <div className="grid grid-cols-6 gap-4">
        {icons.map((icon) => (
          <div key={icon._id} className="border p-3 rounded-lg">

            <img src={icon.iconUrl} className="w-12 h-12 mb-2" />

            {/* EDIT MODE */}
            {editing === icon._id ? (
              <>
                <input
                  value={editSkill}
                  onChange={(e) => setEditSkill(e.target.value)}
                  className="input-field mb-1"
                />

                <input
                  value={editLabel}
                  onChange={(e) => setEditLabel(e.target.value)}
                  className="input-field mb-1"
                />

                <button
                  onClick={() => saveEdit(icon._id)}
                  className="btn-primary w-full"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <p className="text-xs">{icon.skillKey}</p>
                <p className="text-xs text-gray-500">{icon.label}</p>

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => openEdit(icon)}
                    className="text-blue-500 text-xs"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => remove(icon._id)}
                    className="text-red-500 text-xs"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminSkillIcons
