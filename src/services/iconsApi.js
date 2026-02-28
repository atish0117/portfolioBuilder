export const fetchAdminIcons = async (skill) => {
  if (!skill) return []

  try {
    const res = await fetch(`/api/admin/icon/${skill}`)

    if (!res.ok) return []

    const data = await res.json()
    return data.map(i => i.iconUrl)
  } catch {
    return []
  }
}


// todo: ye mai bad me use kruga performance better krne ke liy , ye adminicon api hai
  /* import axios from "./axios"

export const updateSkillsApi = (skills) =>
  axios.put("/skills", { skills })

export const fetchIconsBySkill = (skill) =>
  axios.get(`/admin/icon/${skill}`)

export const uploadAdminIconApi = (formData) =>
  axios.post("/admin/icon", formData)

export const deleteAdminIconApi = (id) =>
  axios.delete(`/admin/icon/${id}`)

export const getAllAdminIconsApi = () =>
  axios.get("/admin/icons") */
