import { useForm, useFieldArray } from 'react-hook-form';
import { usePortfolio } from '../../../hooks/usePortfolio';
import { Save, Plus, Trash2, Search, X, ChevronDown } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

const IT_SKILLS = [
  // Frontend
  { name: 'React', devicon: 'react' },
  { name: 'Vue.js', devicon: 'vuejs' },
  { name: 'Angular', devicon: 'angularjs' },
  { name: 'Next.js', devicon: 'nextjs' },
  { name: 'Nuxt.js', devicon: 'nuxtjs' },
  { name: 'Svelte', devicon: 'svelte' },
  { name: 'HTML5', devicon: 'html5' },
  { name: 'CSS3', devicon: 'css3' },
  { name: 'JavaScript', devicon: 'javascript' },
  { name: 'TypeScript', devicon: 'typescript' },
  { name: 'Tailwind CSS', devicon: 'tailwindcss' },
  { name: 'Bootstrap', devicon: 'bootstrap' },
  { name: 'Sass', devicon: 'sass' },
  { name: 'jQuery', devicon: 'jquery' },
  { name: 'Redux', devicon: 'redux' },
  { name: 'Webpack', devicon: 'webpack' },
  { name: 'Vite', devicon: 'vitejs' },
  { name: 'Storybook', devicon: 'storybook' },
  { name: 'Three.js', devicon: 'threejs' },
  // Backend
  { name: 'Node.js', devicon: 'nodejs' },
  { name: 'Express.js', devicon: 'express' },
  { name: 'Python', devicon: 'python' },
  { name: 'Django', devicon: 'django' },
  { name: 'Flask', devicon: 'flask' },
  { name: 'FastAPI', devicon: 'fastapi' },
  { name: 'Java', devicon: 'java' },
  { name: 'Spring Boot', devicon: 'spring' },
  { name: 'PHP', devicon: 'php' },
  { name: 'Laravel', devicon: 'laravel' },
  { name: 'Ruby', devicon: 'ruby' },
  { name: 'Ruby on Rails', devicon: 'rails' },
  { name: 'Go', devicon: 'go' },
  { name: 'Rust', devicon: 'rust' },
  { name: 'C', devicon: 'c' },
  { name: 'C++', devicon: 'cplusplus' },
  { name: 'C#', devicon: 'csharp' },
  { name: '.NET', devicon: 'dot-net' },
  { name: 'Kotlin', devicon: 'kotlin' },
  { name: 'Swift', devicon: 'swift' },
  { name: 'Scala', devicon: 'scala' },
  { name: 'Elixir', devicon: 'elixir' },
  { name: 'GraphQL', devicon: 'graphql' },
  { name: 'NestJS', devicon: 'nestjs' },
  // Database
  { name: 'MySQL', devicon: 'mysql' },
  { name: 'PostgreSQL', devicon: 'postgresql' },
  { name: 'MongoDB', devicon: 'mongodb' },
  { name: 'Redis', devicon: 'redis' },
  { name: 'SQLite', devicon: 'sqlite' },
  { name: 'Oracle', devicon: 'oracle' },
  { name: 'Microsoft SQL Server', devicon: 'microsoftsqlserver' },
  { name: 'Firebase', devicon: 'firebase' },
  { name: 'Supabase', devicon: 'supabase' },
  { name: 'Elasticsearch', devicon: 'elasticsearch' },
  { name: 'Cassandra', devicon: 'cassandra' },
  // DevOps & Cloud
  { name: 'Docker', devicon: 'docker' },
  { name: 'Kubernetes', devicon: 'kubernetes' },
  { name: 'AWS', devicon: 'amazonwebservices' },
  { name: 'Google Cloud', devicon: 'googlecloud' },
  { name: 'Azure', devicon: 'azure' },
  { name: 'Terraform', devicon: 'terraform' },
  { name: 'Ansible', devicon: 'ansible' },
  { name: 'Jenkins', devicon: 'jenkins' },
  { name: 'GitHub Actions', devicon: 'githubactions' },
  { name: 'CircleCI', devicon: 'circleci' },
  { name: 'Nginx', devicon: 'nginx' },
  { name: 'Linux', devicon: 'linux' },
  { name: 'Ubuntu', devicon: 'ubuntu' },
  { name: 'Bash', devicon: 'bash' },
  { name: 'Heroku', devicon: 'heroku' },
  { name: 'Vercel', devicon: 'vercel' },
  { name: 'Netlify', devicon: 'netlify' },
  { name: 'DigitalOcean', devicon: 'digitalocean' },
  // Mobile
  { name: 'React Native', devicon: 'react' },
  { name: 'Flutter', devicon: 'flutter' },
  { name: 'Android', devicon: 'android' },
  { name: 'Ionic', devicon: 'ionic' },
  { name: 'Xamarin', devicon: 'xamarin' },
  // QA & Testing
  { name: 'Jest', devicon: 'jest' },
  { name: 'Cypress', devicon: 'cypressio' },
  { name: 'Selenium', devicon: 'selenium' },
  { name: 'Playwright', devicon: 'playwright' },
  { name: 'Mocha', devicon: 'mocha' },
  { name: 'Jasmine', devicon: 'jasmine' },
  { name: 'Pytest', devicon: 'pytest' },
  // Tools
  { name: 'Git', devicon: 'git' },
  { name: 'GitHub', devicon: 'github' },
  { name: 'GitLab', devicon: 'gitlab' },
  { name: 'Bitbucket', devicon: 'bitbucket' },
  { name: 'Jira', devicon: 'jira' },
  { name: 'Confluence', devicon: 'confluence' },
  { name: 'Figma', devicon: 'figma' },
  { name: 'Sketch', devicon: 'sketch' },
  { name: 'Adobe XD', devicon: 'xd' },
  { name: 'VS Code', devicon: 'vscode' },
  { name: 'IntelliJ IDEA', devicon: 'intellij' },
  { name: 'Vim', devicon: 'vim' },
  { name: 'Postman', devicon: 'postman' },
  { name: 'Jupyter', devicon: 'jupyter' },
  { name: 'npm', devicon: 'npm' },
  { name: 'Yarn', devicon: 'yarn' },
  // Data & AI/ML
  { name: 'TensorFlow', devicon: 'tensorflow' },
  { name: 'PyTorch', devicon: 'pytorch' },
  { name: 'Pandas', devicon: 'pandas' },
  { name: 'NumPy', devicon: 'numpy' },
  { name: 'scikit-learn', devicon: 'scikitlearn' },
  { name: 'OpenCV', devicon: 'opencv' },
  { name: 'Apache Kafka', devicon: 'apachekafka' },
  { name: 'Apache Spark', devicon: 'apachespark' },
  // Other languages
  { name: 'R', devicon: 'r' },
  { name: 'Dart', devicon: 'dart' },
  { name: 'Lua', devicon: 'lua' },
  { name: 'Perl', devicon: 'perl' },
  { name: 'Haskell', devicon: 'haskell' },
  { name: 'MATLAB', devicon: 'matlab' },
  { name: 'Markdown', devicon: 'markdown' },
];

const getDeviconUrl = (devicon) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${devicon}/${devicon}-original.svg`;
const getFallbackUrl = (devicon) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${devicon}/${devicon}-plain.svg`;

const SkillIcon = ({ devicon, name, size = 'md' }) => {
  const [src, setSrc] = useState(getDeviconUrl(devicon));
  const [failed, setFailed] = useState(false);
  const triedFallback = useRef(false);
  const sizeClass = size === 'sm' ? 'w-5 h-5' : 'w-7 h-7';
  if (failed) {
    return (
      <div className={`${sizeClass} rounded bg-blue-100 flex items-center justify-center flex-shrink-0`}>
        <span className="text-blue-600 font-bold text-xs">{name?.[0]?.toUpperCase()}</span>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={name}
      className={`${sizeClass} object-contain flex-shrink-0`}
      onError={() => {
        if (!triedFallback.current) {
          triedFallback.current = true;
          setSrc(getFallbackUrl(devicon));
        } else {
          setFailed(true);
        }
      }}
    />
  );
};

const SkillSearchDropdown = ({ onSelect, existingSkills = [] }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const filtered = query.trim().length === 0
    ? IT_SKILLS.slice(0, 30)
    : IT_SKILLS.filter((s) => s.name.toLowerCase().includes(query.toLowerCase())).slice(0, 20);

  const existingNames = existingSkills.map((s) => s.name?.toLowerCase());

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (skill) => {
    onSelect({ name: skill.name, logo: getDeviconUrl(skill.devicon), devicon: skill.devicon });
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <div
        className="flex items-center gap-2 px-3 py-2.5 bg-white border-2 border-dashed border-blue-300 rounded-lg cursor-text hover:border-blue-400 transition-colors"
        onClick={() => { setIsOpen(true); inputRef.current?.focus(); }}
      >
        <Search className="w-4 h-4 text-blue-400 flex-shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setIsOpen(true); }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search and add a skill (e.g. React, Docker, Selenium...)"
          className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
        />
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="px-4 py-6 text-center text-sm text-gray-400">No skills found for "{query}"</div>
          ) : (
            <>
              {query.trim() === '' && (
                <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100 sticky top-0 bg-white">
                  Popular Skills
                </div>
              )}
              {filtered.map((skill) => {
                const alreadyAdded = existingNames.includes(skill.name.toLowerCase());
                return (
                  <button
                    key={skill.name}
                    type="button"
                    onClick={() => !alreadyAdded && handleSelect(skill)}
                    disabled={alreadyAdded}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors ${
                      alreadyAdded ? 'opacity-40 cursor-not-allowed bg-gray-50' : 'hover:bg-blue-50 cursor-pointer'
                    }`}
                  >
                    <SkillIcon devicon={skill.devicon} name={skill.name} size="sm" />
                    <span className="text-sm text-gray-800 flex-1">{skill.name}</span>
                    {alreadyAdded && <span className="text-xs text-gray-400">Added</span>}
                  </button>
                );
              })}
            </>
          )}
        </div>
      )}
    </div>
  );
};

const SkillCategoryBlock = ({ categoryIndex, register, control, setValue, watch, remove: removeCategory }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `skills.${categoryIndex}.items`,
  });

  const skills = watch(`skills.${categoryIndex}.items`) || [];

  const handleAddSkill = (skill) => {
    append({ name: skill.name, logo: skill.logo, devicon: skill.devicon });
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-4">
      <div className="flex items-center gap-3">
        <input
          type="text"
          {...register(`skills.${categoryIndex}.title`, { required: true })}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          placeholder="Category name (e.g. Frontend, DevOps, QA)"
        />
        <button
          type="button"
          onClick={() => removeCategory(categoryIndex)}
          className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          title="Remove category"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, idx) => (
            <div
              key={idx}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full shadow-sm group"
            >
              {skill.devicon ? (
                <SkillIcon devicon={skill.devicon} name={skill.name} size="sm" />
              ) : skill.logo ? (
                <img src={skill.logo} alt={skill.name} className="w-5 h-5 object-contain" />
              ) : (
                <div className="w-5 h-5 rounded bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-xs">{skill.name?.[0]}</span>
                </div>
              )}
              <span className="text-sm text-gray-700">{skill.name}</span>
              <button
                type="button"
                onClick={() => remove(idx)}
                className="ml-1 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      <SkillSearchDropdown onSelect={handleAddSkill} existingSkills={skills} />

      {skills.length === 0 && (
        <p className="text-xs text-gray-400 text-center">Search above to add skills</p>
      )}
    </div>
  );
};

 const SkillsForm = () => {
  const { portfolio, updateSection } = usePortfolio();

  const { register, control, handleSubmit, setValue, watch } = useForm({
    defaultValues: { skills: portfolio?.skills || [] },
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'skills' });

  useEffect(() => {
    if (portfolio?.skills) setValue('skills', portfolio.skills);
  }, [portfolio, setValue]);

  const onSubmit = async (data) => {
    await updateSection.mutateAsync({ sectionName: 'skills', sectionData: data.skills });
  };

  const totalSkills = fields.reduce((acc, _, idx) => {
    const items = watch(`skills.${idx}.items`) || [];
    return acc + items.length;
  }, 0);

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Skills</h2>
          <p className="text-sm text-gray-500 mt-1">
            {totalSkills} skill{totalSkills !== 1 ? 's' : ''} across {fields.length} categor{fields.length !== 1 ? 'ies' : 'y'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {fields.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
            <p className="text-gray-400 text-sm mb-3">No skill categories yet</p>
            <button type="button" onClick={() => append({ title: '', items: [] })} className="btn-secondary text-sm">
              <Plus className="w-4 h-4 mr-1.5" />
              Add your first category
            </button>
          </div>
        )}

        {fields.map((field, categoryIndex) => (
          <SkillCategoryBlock
            key={field.id}
            categoryIndex={categoryIndex}
            register={register}
            control={control}
            setValue={setValue}
            watch={watch}
            remove={remove}
          />
        ))}

        {fields.length > 0 && (
          <button
            type="button"
            onClick={() => append({ title: '', items: [] })}
            className="btn-secondary w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Skill Category
          </button>
        )}

        <button type="submit" disabled={updateSection.isLoading} className="btn-primary w-full sm:w-auto">
          <Save className="w-4 h-4 mr-2" />
          {updateSection.isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default SkillsForm;