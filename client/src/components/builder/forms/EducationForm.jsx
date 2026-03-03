import { useFieldArray, useForm } from 'react-hook-form';
import { usePortfolio } from '../../../hooks/usePortfolio';
import ImageUpload from '../../common/ImageUpload';
import { Save, Plus, Trash2 } from 'lucide-react';
import { useEffect } from 'react';

const EducationForm = () => {
  const { portfolio, updateSection } = usePortfolio();

  const { register, control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      education: portfolio?.education || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'education',
  });

  useEffect(() => {
    if (portfolio?.education) {
      setValue('education', portfolio.education);
    }
  }, [portfolio, setValue]);

  const onSubmit = async (data) => {
    await updateSection.mutateAsync({
      sectionName: 'education',
      sectionData: data.education,
    });
  };

  const addEducation = () => {
    append({
      school: '',
      degree: '',
      schoolLogo: '',
      startDate: '',
      endDate: '',
      grade: '',
      description: '',
      order: fields.length,
    });
  };

  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Education Section</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {fields.map((field, index) => {
          const schoolLogo = watch(`education.${index}.schoolLogo`);

          return (
            <div key={field.id} className="p-6 bg-gray-50 rounded-lg space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Education #{index + 1}
                </h3>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              {/* School Logo */}
              <ImageUpload
                label="School Logo"
                value={schoolLogo}
                onChange={(url) => setValue(`education.${index}.schoolLogo`, url)}
                folder="portfolio-schools"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* School */}
                <div className="md:col-span-2">
                  <label className="label">School/University *</label>
                  <input
                    type="text"
                    {...register(`education.${index}.school`, { required: true })}
                    className="input-field"
                    placeholder="Stanford University"
                  />
                </div>

                {/* Degree */}
                <div>
                  <label className="label">Degree *</label>
                  <input
                    type="text"
                    {...register(`education.${index}.degree`, { required: true })}
                    className="input-field"
                    placeholder="Bachelor of Computer Science"
                  />
                </div>

                {/* Grade */}
                <div>
                  <label className="label">Grade/CGPA</label>
                  <input
                    type="text"
                    {...register(`education.${index}.grade`)}
                    className="input-field"
                    placeholder="3.8 GPA"
                  />
                </div>

                {/* Start Date */}
                <div>
                  <label className="label">Start Date *</label>
                  <input
                    type="text"
                    {...register(`education.${index}.startDate`, { required: true })}
                    className="input-field"
                    placeholder="August 2018"
                  />
                </div>

                {/* End Date */}
                <div>
                  <label className="label">End Date *</label>
                  <input
                    type="text"
                    {...register(`education.${index}.endDate`, { required: true })}
                    className="input-field"
                    placeholder="May 2022"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="label">Description</label>
                <textarea
                  {...register(`education.${index}.description`)}
                  className="input-field min-h-[100px]"
                  placeholder="Relevant coursework, achievements, activities..."
                />
              </div>
            </div>
          );
        })}

        <button type="button" onClick={addEducation} className="btn-secondary w-full">
          <Plus className="w-5 h-5 mr-2" />
          Add Education
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

export default EducationForm;