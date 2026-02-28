import { matchLocalIcons } from "./iconResolver"
import { fetchAdminIcons } from "../services/iconsApi"

const iconCache = {}
const CACHE_TIME = 1000 * 60 * 10 // 10 min

export const getAllIconsForSkill = async (skillName) => {
  if (!skillName) return []

  const key = skillName.toLowerCase().trim()

  // cache
  if (iconCache[key] && Date.now() - iconCache[key].time < CACHE_TIME) {
    return iconCache[key].data
  }

  const localIcons = matchLocalIcons(skillName) || []

  let adminIcons = []
  try {
    adminIcons = await fetchAdminIcons(skillName)
  } catch {}

  const merged = [...new Set([...localIcons, ...adminIcons])]

  iconCache[key] = {
    data: merged,
    time: Date.now()
  }

  return merged
}
