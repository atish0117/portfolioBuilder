import { useEffect, useState } from "react"
import { getAllIconsForSkill } from "../../utils/getSkillIcons"

const IconWheel = ({
  skillName,
  onSelect,
  onClose
}) => {
  const [icons, setIcons] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!skillName) return

    let active = true

    const load = async () => {
      setLoading(true)
      const data = await getAllIconsForSkill(skillName)

      if (active) {
        setIcons(data)
        setLoading(false)
      }
    }

    load()

    return () => {
      active = false
    }
  }, [skillName])

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-end md:items-center justify-center">

      <div className="bg-white dark:bg-dark-800 w-full md:w-[500px] h-[60vh] rounded-t-2xl md:rounded-xl p-4 overflow-auto">

        <div className="flex justify-between mb-3">
          <h3 className="font-bold">
            Choose icon for "{skillName}"
          </h3>

          <button onClick={onClose}>✕</button>
        </div>

        {loading && (
          <p className="text-center text-sm">Loading icons...</p>
        )}

        <div className="grid grid-cols-6 gap-3">
          {icons.map((icon, i) => (
            <button
              key={i}
              onClick={() => {
                onSelect(icon)
                onClose()
              }}
              className="p-2 border rounded-lg hover:bg-gray-100"
            >
              <img
                src={icon}
                className="w-8 h-8 mx-auto"
                loading="lazy"
              />
            </button>
          ))}
        </div>

        {!loading && icons.length === 0 && (
          <p className="text-xs text-center mt-4">
            No icons found. You can upload custom icon.
          </p>
        )}
      </div>
    </div>
  )
}

export default IconWheel
