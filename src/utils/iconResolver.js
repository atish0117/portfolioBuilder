import { LOCAL_SKILL_ICON_MAP, SKILL_ALIASES } from "./skillIcons"
import { fetchAdminIcons } from "../services/iconsApi"
// normalize
const normalize = (str = '') => str.toLowerCase().replace(/[^a-z0-9]/g, '')

/* LOCAL ICON MATCH (SYNC) */

export const matchLocalIcons = (skillName = '') => {
  if (!skillName) return []

  const normalized = normalize(skillName)

  // direct
  if (LOCAL_SKILL_ICON_MAP[normalized]) {
    return LOCAL_SKILL_ICON_MAP[normalized]
  }

  // alias
let matchedIcons = []

for (const [key, aliases] of Object.entries(SKILL_ALIASES)) {
  if (aliases.map(normalize).includes(normalized)) {
    matchedIcons = [
      ...matchedIcons,
      ...(LOCAL_SKILL_ICON_MAP[key] || [])
    ]
  }
}

  if (matchedIcons.length) {
  return matchedIcons
}
}

/* FINAL ICON FOR PUBLIC PORTFOLIO */
export const getFinalSkillIcon =async (skill) => {
  // user selected icon
  if (skill.icon) return skill.icon

  // local fallback (first icon)
  const local = matchLocalIcons(skill.name)
  if (local.length) return local[0]

  // admin icons fallback (first icon)
  // const admin = await fetchAdminIcons(skill.name)
  // if (admin.length) return admin[0]

  // dicebear fallback
  const seed = encodeURIComponent(skill.name || 'Skill')
  return `https://api.dicebear.com/9.x/initials/svg?seed=${seed}`
}
