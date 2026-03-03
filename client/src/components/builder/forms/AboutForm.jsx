import { useForm } from "react-hook-form";
import { usePortfolio } from "../../../hooks/usePortfolio";
import ImageUpload from "../../common/ImageUpload";
import { Save } from "lucide-react";
import { useEffect } from "react";

const AboutForm = () => {
  const { portfolio, updateSection } = usePortfolio();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: portfolio?.personalInfo || {},
  });

  const profilePhoto = watch("profilePhoto");

  useEffect(() => {
    if (portfolio?.personalInfo) {
      Object.keys(portfolio.personalInfo).forEach((key) => {
        setValue(key, portfolio.personalInfo[key]);
      });
    }
  }, [portfolio, setValue]);

  const onSubmit = async (data) => {
    await updateSection.mutateAsync({
      sectionName: "personalInfo",
      sectionData: data,
    });
  };

  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">About Section</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Profile Photo */}
        <ImageUpload
          label="Profile Photo"
          value={profilePhoto}
          onChange={(url) => setValue("profilePhoto", url)}
          folder="portfolio-profiles"
        />

        {/* Name */}
        <div>
          <label className="label">Full Name *</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="input-field"
            placeholder="John Doe"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Title */}
        <div>
          <label className="label">Professional Title *</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="input-field"
            placeholder="Full Stack Developer"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        {/* Bio */}
        <div>
          <label className="label">Bio *</label>
          <textarea
            {...register("bio", { required: "Bio is required" })}
            className="input-field min-h-[150px]"
            placeholder="Tell us about yourself, your skills, and what you're passionate about..."
          />
          {errors.bio && (
            <p className="mt-1 text-sm text-red-600">{errors.bio.message}</p>
          )}
        </div>

        {/* Resume URL */}
        <div>
          <label className="label">Resume URL (Optional)</label>
          <input
            type="url"
            {...register("resume")}
            className="input-field"
            placeholder="https://example.com/resume.pdf"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={updateSection.isLoading}
          className="btn-primary w-full sm:w-auto"
        >
          <Save className="w-5 h-5 mr-2" />
          {updateSection.isLoading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};
export default AboutForm;
