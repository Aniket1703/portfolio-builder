import { useForm } from 'react-hook-form';
import { usePortfolio } from '../../../hooks/usePortfolio';
import { Save } from 'lucide-react';
import { useEffect } from 'react';

const ContactForm = () => {
  const { portfolio, updateSection } = usePortfolio();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: portfolio?.contact || {},
  });

  useEffect(() => {
    if (portfolio?.contact) {
      Object.keys(portfolio.contact).forEach((key) => {
        if (key === 'social') {
          Object.keys(portfolio.contact.social).forEach((socialKey) => {
            setValue(`social.${socialKey}`, portfolio.contact.social[socialKey]);
          });
        } else {
          setValue(key, portfolio.contact[key]);
        }
      });
    }
  }, [portfolio, setValue]);

  const onSubmit = async (data) => {
    await updateSection.mutateAsync({
      sectionName: 'contact',
      sectionData: data,
    });
  };

  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Section</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email */}
        <div>
          <label className="label">Email *</label>
          <input
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            className="input-field"
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="label">Phone</label>
          <input
            type="tel"
            {...register('phone')}
            className="input-field"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        {/* Location */}
        <div>
          <label className="label">Location</label>
          <input
            type="text"
            {...register('location')}
            className="input-field"
            placeholder="San Francisco, CA"
          />
        </div>

        {/* Social Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Social Links</h3>

          {/* GitHub */}
          <div>
            <label className="label">GitHub</label>
            <input
              type="url"
              {...register('social.github')}
              className="input-field"
              placeholder="https://github.com/username"
            />
          </div>

          {/* LinkedIn */}
          <div>
            <label className="label">LinkedIn</label>
            <input
              type="url"
              {...register('social.linkedin')}
              className="input-field"
              placeholder="https://linkedin.com/in/username"
            />
          </div>

          {/* Twitter */}
          <div>
            <label className="label">Twitter</label>
            <input
              type="url"
              {...register('social.twitter')}
              className="input-field"
              placeholder="https://twitter.com/username"
            />
          </div>

          {/* Website */}
          <div>
            <label className="label">Personal Website</label>
            <input
              type="url"
              {...register('social.website')}
              className="input-field"
              placeholder="https://yourwebsite.com"
            />
          </div>
        </div>

        {/* Submit Button */}
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

export default ContactForm;