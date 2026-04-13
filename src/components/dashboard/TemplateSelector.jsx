import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../store/slices/authSlice";
import toast from "react-hot-toast";
import { Palette, Zap, Sparkles, Camera, Leaf } from "lucide-react";
import { BiAdjust } from "react-icons/bi";
import { templateAPI } from "../../services/api";
import TemplateLoader from "../../components/ui/TemplateLoader";

const TemplateSelector = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [selectedTemplate, setSelectedTemplate] = useState(
    user?.selectedTemplate || "minimal",
  );
  const [templates, setTemplates] = useState();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  useEffect(() => {
    let mounted = true;
    const fetchTemplates = async () => {
      try {
        const res = await templateAPI.getPublicTemplates();
        if (mounted) setTemplates(res.data.templates || []);
      } catch (error) {
        toast.error("failed to load templates");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchTemplates();
    return () => (mounted = false);
  }, []);

  // Memoized template list (performance boost)
  const templateList = useMemo(() => templates, [templates]);

  const handleTemplateSelect = async (template) => {
    // 🚧 Coming soon
    if (!template.isActive) {
      toast.error("Template coming soon 🚧");
      return;
    }

    // 🔒 Premium lock
    if (template.isPremium && user?.plan !== "pro") {
      setShowUpgradeModal(true);
      return;
    }

    setSelectedTemplate(template.id);
    setSaving(true);

    try {
      await dispatch(updateProfile({ selectedTemplate: template.id })).unwrap();
      toast.success("Template updated successfully!");
    } catch (error) {
      toast.error("Failed to update template");
      setSelectedTemplate(user?.selectedTemplate || "minimal");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <TemplateLoader count={6} />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
          Choose Your Template
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Select a template that matches your style
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {templateList?.map((template) => {
          const isPremiumLocked = template.isPremium && user?.plan !== "pro";

          return (
            <motion.div
              key={template.id}
              className={`
                relative rounded-2xl p-4 border
                bg-white dark:bg-gray-900
                border-gray-200 dark:border-gray-700
                transition-all duration-300
                flex flex-col min-h-[250px]

                ${
                  isPremiumLocked || !template.isActive
                    ? "opacity-60 cursor-not-allowed"
                    : "cursor-pointer hover:shadow-xl hover:-translate-y-1"
                }

                ${
                  selectedTemplate === template.id
                    ? "ring-2 ring-purple-500"
                    : ""
                }
              `}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleTemplateSelect(template)}
            >
              <div className={isPremiumLocked ? "blur-sm" : ""}>
                {/* Image */}
                <img
                  src={template.previewImage}
                  alt={template.name}
                  loading="lazy"
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />

                <motion.div
                  className="
                  group relative rounded-2xl p-5 border mb-2
    bg-white dark:bg-gray-900
    border-gray-200 dark:border-gray-700
    transition-all duration-500
  "
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Content */}
                  <div className="relative z-10 space-y-3">
                    {/* Title */}
                    <h3
                      className="
        relative inline-block
        font-semibold text-lg
        text-gray-800 dark:text-white
        transition-all duration-300

        group-hover:text-primary-500
        group-hover:tracking-wide
      "
                    >
                      {template.name}

                      {/* Animated underline */}
                      <span
                        className="
          absolute left-0 -bottom-1 h-[2px] w-0
          bg-primary-500
          transition-all duration-300
          group-hover:w-full
        "
                      />
                    </h3>

                    {/* Description */}
                    <p
                      className="
        text-sm text-gray-500 dark:text-gray-400
        line-clamp-2
        transition-all duration-300

        group-hover:text-gray-700
        dark:group-hover:text-gray-200
        group-hover:-translate-y-1
      "
                    >
                      {template.description}
                    </p>
                  </div>
                  {/* Features */}
                  <div className="space-y-2">
                    {Array.isArray(template.features) &&
                      template.features.slice(0, 3).map((f, i) => (
                        <div
                          key={f}
                          className="flex items-center space-x-2 group/item cursor-default
          transition-all duration-300 hover:translate-x-1"
                        >
                          {/* Dot */}
                          <div
                            className="
            w-2 h-2 rounded-full 
            bg-gray-400 dark:bg-gray-600
            transition-all duration-300
            group-hover/item:bg-primary-500 group-hover/item:scale-125
          "
                          ></div>

                          {/* Text */}
                          <span
                            className="
            text-sm text-gray-600 dark:text-gray-400
            transition-all duration-300
            group-hover/item:text-gray-900 dark:group-hover/item:text-white
          "
                          >
                            {f}
                          </span>
                        </div>
                      ))}
                  </div>
                </motion.div>
              </div>

              {/* Premium */}
              {isPremiumLocked && (
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center rounded-2xl">
                  <span className="text-white text-2xl">🔒</span>
                  <p className="text-white text-sm">Premium</p>
                </div>
              )}

              {/* Coming Soon */}
              {!template.isActive && (
                <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                  Coming Soon
                </span>
              )}

{/* --- Bottom Section with Horizontal Line --- */}
  <div className="mt-auto p-2  border-t-4  rounded-lg border-purple-600/50 flex items-center justify-between">
    
    {/* Selected Status */}
    <div className="min-h-[20px]">
      {selectedTemplate === template.id && (
        <p className="text-green-500 text-sm font-medium flex items-center gap-1">
          <span>✓</span> Selected
        </p>
      )}
    </div>

    {/* Preview Button */}
    <button
      className="
        text-blue-500 text-sm font-medium 
        hover:text-blue-400 transition-colors
        px-3 py-1 rounded-lg bg-white/5
      "
      onClick={(e) => {
        e.stopPropagation();
        setPreviewTemplate(template);
      }}
    >
      Preview
    </button>
  </div>
            </motion.div>
          );
        })}
      </div>

      {/* Saving */}
      {saving && (
        <p className="text-center text-purple-500">Updating template...</p>
      )}

      {/* Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 w-full max-w-5xl h-[90vh] rounded-xl relative">
            <button
              className="absolute top-3 right-3 bg-black text-white px-2 py-1 rounded"
              onClick={() => setPreviewTemplate(null)}
            >
              ✕
            </button>

            <iframe
              src={`/preview/${previewTemplate.id}`}
              className="w-full h-full rounded-xl"
            />
          </div>
        </div>
      )}

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl text-center max-w-md w-full">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              Upgrade to Pro 🚀
            </h2>

            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Unlock premium templates
            </p>

            <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded">
              Upgrade Now
            </button>

            <button
              className="block mt-3 text-gray-500"
              onClick={() => setShowUpgradeModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6 bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 border-primary-200 dark:border-primary-800"
      >
        <div className="flex items-center space-x-3 mb-3">
          <div className="text-2xl">💡</div>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Template Features
          </h3>
        </div>
        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <li>• All templates are fully responsive and mobile-friendly</li>
          <li>• Dark/light mode support across all templates</li>
          <li>• SEO optimized for better search visibility</li>
          <li>• Fast loading with optimized performance</li>
          <li>• Easy customization through the dashboard</li>
        </ul>
      </motion.div>
    </div>
  );
};

export default TemplateSelector;
