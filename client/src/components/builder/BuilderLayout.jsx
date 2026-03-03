import { Link } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { usePortfolio } from '../../hooks/usePortfolio';
import toast from 'react-hot-toast';

const BuilderLayout = ({ children }) => {
  const { portfolio } = usePortfolio();

  // const handleSave = () => {
  //   toast.success('Changes saved automatically!');
  // };

  return (
    <div className="min-h-screen bg-white">
      {/* Builder Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              to="/dashboard"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Portfolio Builder</h1>
              <p className="text-sm text-gray-600">
                {portfolio?.slug || 'Creating...'}
              </p>
            </div>
          </div>

          {/* <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-500 hidden sm:block">
              Auto-saving enabled
            </span>
            <button
              onClick={handleSave}
              className="btn-secondary flex items-center"
            >
              <Save className="w-4 h-4 mr-2" />
              Save
            </button>
          </div> */}
        </div>
      </header>

      {/* Main Content */}
      {children}
    </div>
  );
};

export default BuilderLayout;