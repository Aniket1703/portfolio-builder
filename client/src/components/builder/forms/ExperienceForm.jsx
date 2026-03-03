import { useFieldArray, useForm } from 'react-hook-form';
import { usePortfolio } from '../../../hooks/usePortfolio';
import ImageUpload from '../../common/ImageUpload';
import { Save, Plus, Trash2 } from 'lucide-react';
import { useEffect } from 'react';

const ExperienceForm = () => {
  const { portfolio, updateSection } = usePortfolio();

  const { register, control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      experience: portfolio?.experience || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'experience',
  });

  useEffect(() => {
    if (portfolio?.experience) {
      setValue('experience', portfolio.experience);
    }
  }, [portfolio, setValue]);

  const onSubmit = async (data) => {
    await updateSection.mutateAsync({
      sectionName: 'experience',
      sectionData: data.experience,
    });
  };

  const addExperience = () => {
    append({
      company: '',
      role: '',
      companyLogo: '',
      startDate: '',
      endDate: 'Present',
      description: '',
      skills: [],
      order: fields.length,
    });
  };

  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Experience Section</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {fields.map((field, index) => {
          const companyLogo = watch(`experience.${index}.companyLogo`);
          const skills = watch(`experience.${index}.skills`) || [];

          return (
            <div key={field.id} className="p-6 bg-gray-50 rounded-lg space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Experience #{index + 1}
                </h3>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              {/* Company Logo */}
              <ImageUpload
                label="Company Logo"
                value={companyLogo}
                onChange={(url) => setValue(`experience.${index}.companyLogo`, url)}
                folder="portfolio-companies"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Company */}
                <div>
                  <label className="label">Company Name *</label>
                  <input
                    type="text"
                    {...register(`experience.${index}.company`, {
                      required: true,
                    })}
                    className="input-field"
                    placeholder="Google"
                  />
                </div>

                {/* Role */}
                <div>
                  <label className="label">Role/Position *</label>
                  <input
                    type="text"
                    {...register(`experience.${index}.role`, { required: true })}
                    className="input-field"
                    placeholder="Senior Software Engineer"
                  />
                </div>

                {/* Start Date */}
                <div>
                  <label className="label">Start Date *</label>
                  <input
                    type="text"
                    {...register(`experience.${index}.startDate`, {
                      required: true,
                    })}
                    className="input-field"
                    placeholder="January 2023"
                  />
                </div>

                {/* End Date */}
                <div>
                  <label className="label">End Date</label>
                  <input
                    type="text"
                    {...register(`experience.${index}.endDate`)}
                    className="input-field"
                    placeholder="Present"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="label">Description</label>
                <textarea
                  {...register(`experience.${index}.description`)}
                  className="input-field min-h-[100px]"
                  placeholder="Describe your responsibilities and achievements..."
                />
              </div>

              {/* Skills */}
              <div>
                <label className="label">Skills (Comma separated)</label>
                <input
                  type="text"
                  value={skills.join(', ')}
                  onChange={(e) => {
                    const skillsArray = e.target.value
                      .split(',')
                      .map((s) => s.trim())
                      .filter((s) => s);
                    setValue(`experience.${index}.skills`, skillsArray);
                  }}
                  className="input-field"
                  placeholder="React, Node.js, MongoDB"
                />
                {skills.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        <button type="button" onClick={addExperience} className="btn-secondary w-full">
          <Plus className="w-5 h-5 mr-2" />
          Add Experience
        </button>

        <button
          type="submit"
          disabled={updateSection.isLoading}
          className="btn-primary w-full sm:w-auto"
        >
          <Save className="w-5 h-5 mr-2" />
          {updateSection.isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default ExperienceForm;