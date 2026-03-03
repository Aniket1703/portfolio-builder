import { motion } from 'framer-motion';
import {
  User,
  Briefcase,
  GraduationCap,
  FolderKanban,
  Code,
  Mail,
  CheckCircle,
} from 'lucide-react';

const Sidebar = ({ activeSection, setActiveSection, portfolio }) => {
  const sections = [
    {
      id: 'about',
      name: 'About',
      icon: User,
      completed: !!portfolio?.personalInfo?.bio,
    },
    {
      id: 'skills',
      name: 'Skills',
      icon: Code,
      completed: portfolio?.skills?.length > 0,
    },
    {
      id: 'experience',
      name: 'Experience',
      icon: Briefcase,
      completed: portfolio?.experience?.length > 0,
    },
    {
      id: 'education',
      name: 'Education',
      icon: GraduationCap,
      completed: portfolio?.education?.length > 0,
    },
    {
      id: 'projects',
      name: 'Projects',
      icon: FolderKanban,
      completed: portfolio?.projects?.length > 0,
    },
    {
      id: 'contact',
      name: 'Contact',
      icon: Mail,
      completed: !!portfolio?.contact?.email,
    },
  ];

  const completedCount = sections.filter((s) => s.completed).length;
  const completionPercentage = Math.round((completedCount / sections.length) * 100);

  return (
    <aside className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-6">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm font-bold text-blue-600">
              {completionPercentage || 0}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage}%` }}
              transition={{ duration: 0.5 }}
              className="bg-blue-600 h-2 rounded-full"
            />
          </div>
        </div>

        {/* Sections */}
        <nav className="space-y-1">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;

            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5" />
                  <span>{section.name}</span>
                </div>
                {section.completed && (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;