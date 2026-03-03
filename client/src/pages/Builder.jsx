import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePortfolio } from '../hooks/usePortfolio';
import BuilderLayout from '../components/builder/BuilderLayout';
import Sidebar from '../components/builder/Sidebar';
import LivePreview from '../components/builder/LivePreview';
import AboutForm from '../components/builder/forms/AboutForm';
import SkillsForm from '../components/builder/forms/SkillsForm';
import ExperienceForm from '../components/builder/forms/ExperienceForm';
import EducationForm from '../components/builder/forms/EducationForm';
import ProjectsForm from '../components/builder/forms/ProjectsForm';
import ContactForm from '../components/builder/forms/ContactForm';
import Loader from '../components/common/Loader';
import { motion } from 'framer-motion';

const Builder = () => {
  const [searchParams] = useSearchParams();
  const { portfolio, isLoading, createPortfolio } = usePortfolio();
  const [activeSection, setActiveSection] = useState('about');
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const section = searchParams.get('section');
    if (section) {
      setActiveSection(section);
    }
  }, [searchParams]);

  // Auto-create portfolio if doesn't exist
  useEffect(() => {
    if (!isLoading && !portfolio) {
      createPortfolio.mutate({});
    }
  }, [isLoading, portfolio]);

  if (isLoading || createPortfolio.isLoading) {
    return <Loader fullScreen />;
  }

  const renderForm = () => {
    switch (activeSection) {
      case 'about':
        return <AboutForm />;
      case 'skills':
        return <SkillsForm />;
      case 'experience':
        return <ExperienceForm />;
      case 'education':
        return <EducationForm />;
      case 'projects':
        return <ProjectsForm />;
      case 'contact':
        return <ContactForm />;
      default:
        return <AboutForm />;
    }
  };

  return (
    <BuilderLayout>
      <div className="flex h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          portfolio={portfolio}
        />

        {/* Main Content Area */}
        <div className="flex-1 overflow-hidden flex">
          {/* Form Section */}
          <div
            className={`${
              showPreview ? 'hidden lg:block lg:w-1/2' : 'w-full'
            } overflow-y-auto bg-gray-50`}
          >
            <div className="max-w-4xl mx-auto p-6">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                {renderForm()}
              </motion.div>
            </div>
          </div>

          {/* Preview Section */}
          <div
            className={`${
              showPreview ? 'w-full lg:w-1/2' : 'hidden'
            } border-l border-gray-200 bg-white overflow-y-auto`}
          >
            <LivePreview portfolio={portfolio} />
          </div>
        </div>

        {/* Mobile Preview Toggle */}
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="lg:hidden fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
        >
          {showPreview ? 'Edit' : 'Preview'}
        </button>
      </div>
    </BuilderLayout>
  );
};

export default Builder;