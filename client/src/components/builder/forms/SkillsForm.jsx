import { useFieldArray, useForm } from 'react-hook-form';
import { usePortfolio } from '../../../hooks/usePortfolio';
import ImageUpload from '../../common/ImageUpload';
import { Save, Plus, Trash2, GripVertical } from 'lucide-react';
import { useEffect } from 'react';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableSkillItem = ({ id, index, register, remove, watch, setValue }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const logo = watch(`items.${index}.logo`);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-start gap-3 p-4 bg-white border border-gray-200 rounded-lg"
    >
      <div {...attributes} {...listeners} className="cursor-move pt-2">
        <GripVertical className="w-5 h-5 text-gray-400" />
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          {...register(`items.${index}.name`, { required: true })}
          className="input-field"
          placeholder="Skill name (e.g., React JS)"
        />
        <ImageUpload
          value={logo}
          onChange={(url) => setValue(`items.${index}.logo`, url)}
          folder="portfolio-skills"
        />
      </div>

      <button
        type="button"
        onClick={() => remove(index)}
        className="text-red-600 hover:text-red-700 p-2"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
};

const SkillsForm = () => {
  const { portfolio, updateSection } = usePortfolio();

  const { register, control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      skills: portfolio?.skills || [],
    },
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'skills',
  });

  useEffect(() => {
    if (portfolio?.skills) {
      setValue('skills', portfolio.skills);
    }
  }, [portfolio, setValue]);

  const onSubmit = async (data) => {
    await updateSection.mutateAsync({
      sectionName: 'skills',
      sectionData: data.skills,
    });
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over.id);
      move(oldIndex, newIndex);
    }
  };

  const addSkillCategory = () => {
    append({
      title: '',
      items: [{ name: '', logo: '' }],
    });
  };

  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Skills Section</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {fields.map((field, categoryIndex) => (
          <div key={field.id} className="p-6 bg-gray-50 rounded-lg space-y-4">
            <div className="flex items-center justify-between">
              <input
                type="text"
                {...register(`skills.${categoryIndex}.title`, { required: true })}
                className="input-field flex-1"
                placeholder="Category Title (e.g., Frontend, Backend)"
              />
              <button
                type="button"
                onClick={() => remove(categoryIndex)}
                className="ml-3 text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            <SkillItems
              categoryIndex={categoryIndex}
              register={register}
              control={control}
              setValue={setValue}
              watch={watch}
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addSkillCategory}
          className="btn-secondary w-full"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Skill Category
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

const SkillItems = ({ categoryIndex, register, control, setValue, watch }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `skills.${categoryIndex}.items`,
  });

  return (
    <div className="space-y-3">
      {fields.map((field, itemIndex) => {
        const logo = watch(`skills.${categoryIndex}.items.${itemIndex}.logo`);

        return (
          <div
            key={field.id}
            className="flex items-start gap-3 p-4 bg-white border border-gray-200 rounded-lg"
          >
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                {...register(`skills.${categoryIndex}.items.${itemIndex}.name`, {
                  required: true,
                })}
                className="input-field"
                placeholder="Skill name"
              />
              <ImageUpload
                value={logo}
                onChange={(url) =>
                  setValue(`skills.${categoryIndex}.items.${itemIndex}.logo`, url)
                }
                folder="portfolio-skills"
              />
            </div>
            <button
              type="button"
              onClick={() => remove(itemIndex)}
              className="text-red-600 hover:text-red-700 p-2"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        );
      })}

      <button
        type="button"
        onClick={() => append({ name: '', logo: '' })}
        className="btn-secondary w-full"
      >
        <Plus className="w-5 h-5 mr-2" />
        Add Skill
      </button>
    </div>
  );
};

export default SkillsForm;
