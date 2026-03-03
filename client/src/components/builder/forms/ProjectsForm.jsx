import { useFieldArray, useForm } from 'react-hook-form';
import { usePortfolio } from '../../../hooks/usePortfolio';
import ImageUpload from '../../common/ImageUpload';
import { Save, Plus, Trash2 } from 'lucide-react';
import { useEffect } from 'react';

const ProjectsForm = () => {
  const { portfolio, updateSection } = usePortfolio();

  const { register, control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      projects: portfolio?.projects || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'projects',
  });

  useEffect(() => {
    if (portfolio?.projects) {
      setValue('projects', portfolio.projects);
    }
  }, [portfolio, setValue]);

  const onSubmit = async (data) => {
    await updateSection.mutateAsync({
      sectionName: 'projects',
      sectionData: data.projects,
    });
  };

  const addProject = () => {
    append({
      title: '',
      description: '',
      image: '',
      tags: [],
      githubUrl: '',
      liveUrl: '',
      order: fields.length,
    });
  };

  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Projects Section</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {fields.map((field, index) => {
          const image = watch(`projects.${index}.image`);
          const tags = watch(`projects.${index}.tags`) || [];

          return (
            <div key={field.id} className="p-6 bg-gray-50 rounded-lg space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Project #{index + 1}
                </h3>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              {/* Project Image */}
              <ImageUpload
                label="Project Image"
                value={image}
                onChange={(url) => setValue(`projects.${index}.image`, url)}
                folder="portfolio-projects"
              />

              {/* Title */}
              <div>
                <label className="label">Project Title *</label>
                <input
                  type="text"
                  {...register(`projects.${index}.title`, { required: true })}
                  className="input-field"
                  placeholder="E-commerce Platform"
                />
              </div>

              {/* Description */}
              <div>
                <label className="label">Description *</label>
                <textarea
                  {...register(`projects.${index}.description`, { required: true })}
                  className="input-field min-h-[120px]"
                  placeholder="Describe what the project does, technologies used, and your role..."
                />
              </div>

              {/* Tags */}
              <div>
                <label className="label">Tags (Comma separated)</label>
                <input
                  type="text"
                  value={tags.join(', ')}
                  onChange={(e) => {
                    const tagsArray = e.target.value
                      .split(',')
                      .map((t) => t.trim())
                      .filter((t) => t);
                    setValue(`projects.${index}.tags`, tagsArray);
                  }}
                  className="input-field"
                  placeholder="React, Node.js, MongoDB, Express"
                />
                {tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* GitHub URL */}
                <div>
                  <label className="label">GitHub URL</label>
                  <input
                    type="url"
                    {...register(`projects.${index}.githubUrl`)}
                    className="input-field"
                    placeholder="https://github.com/username/project"
                  />
                </div>

                {/* Live URL */}
                <div>
                  <label className="label">Live Demo URL</label>
                  <input
                    type="url"
                    {...register(`projects.${index}.liveUrl`)}
                    className="input-field"
                    placeholder="https://project-demo.com"
                  />
                </div>
              </div>
            </div>
          );
        })}

        <button type="button" onClick={addProject} className="btn-secondary w-full">
          <Plus className="w-5 h-5 mr-2" />
          Add Project
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

export default ProjectsForm;