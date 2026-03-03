import { Link } from 'react-router-dom';
import { usePortfolio } from '../hooks/usePortfolio';
import { motion } from 'framer-motion';
import {
  Edit,
  Eye,
  Globe,
  Plus,
  ExternalLink,
  BarChart3,
  Copy,
  CheckCircle,
} from 'lucide-react';
import Loader from '../components/common/Loader';
import { useState } from 'react';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { portfolio, isLoading, publishPortfolio } = usePortfolio();
  const [copied, setCopied] = useState(false);

  const portfolioUrl = portfolio
    ? `${window.location.origin}/portfolio/${portfolio.slug}`
    : '';

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(portfolioUrl);
    setCopied(true);
    toast.success('Portfolio URL copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTogglePublish = async () => {
    try {
      await publishPortfolio.mutateAsync(!portfolio.isPublished);
    } catch (error) {
      console.error('Toggle publish error:', error);
    }
  };

  if (isLoading) {
    return <Loader fullScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your portfolio</p>
        </div>

        {portfolio ? (
          <div className="space-y-6">
            {/* Portfolio Status Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {portfolio.personalInfo?.name || 'Your Portfolio'}
                    </h2>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        portfolio.isPublished
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {portfolio.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <p className="text-gray-600">
                    {portfolio.personalInfo?.title || 'Add your title in the builder'}
                  </p>

                  {/* Portfolio URL */}
                  {portfolio.isPublished && (
                    <div className="mt-4 flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                      <Globe className="w-5 h-5 text-gray-400" />
                      <code className="text-sm text-blue-600 flex-1 truncate">
                        {portfolioUrl}
                      </code>
                      <button
                        onClick={handleCopyUrl}
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        {copied ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <Copy className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link to="/builder" className="btn-primary">
                    <Edit className="w-5 h-5 mr-2" />
                    Edit Portfolio
                  </Link>
                  {portfolio.isPublished && (
                    <a
                      href={portfolioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary"
                    >
                      <ExternalLink className="w-5 h-5 mr-2" />
                      View Live
                    </a>
                  )}
                  <button
                    onClick={handleTogglePublish}
                    disabled={publishPortfolio.isLoading}
                    className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
                      portfolio.isPublished
                        ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                        : 'bg-green-100 text-green-800 hover:bg-green-200'
                    }`}
                  >
                    {portfolio.isPublished ? 'Unpublish' : 'Publish'}
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Views */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="card"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Views</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">
                      {portfolio.analytics?.views || 0}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Eye className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </motion.div>

              {/* Projects */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="card"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Projects</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">
                      {portfolio.projects?.length || 0}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </motion.div>

              {/* Skills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="card"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Skill Categories
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">
                      {portfolio.skills?.length || 0}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Globe className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="card"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link
                  to="/builder?section=about"
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
                >
                  <h4 className="font-medium text-gray-900">Edit About</h4>
                  <p className="text-sm text-gray-600 mt-1">Update your bio</p>
                </Link>
                <Link
                  to="/builder?section=projects"
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
                >
                  <h4 className="font-medium text-gray-900">Add Projects</h4>
                  <p className="text-sm text-gray-600 mt-1">Showcase your work</p>
                </Link>
                <Link
                  to="/builder?section=skills"
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
                >
                  <h4 className="font-medium text-gray-900">Update Skills</h4>
                  <p className="text-sm text-gray-600 mt-1">Add your expertise</p>
                </Link>
                <Link
                  to="/builder?section=experience"
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
                >
                  <h4 className="font-medium text-gray-900">Add Experience</h4>
                  <p className="text-sm text-gray-600 mt-1">Share your journey</p>
                </Link>
              </div>
            </motion.div>
          </div>
        ) : (
          // No Portfolio Created Yet
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card text-center py-12"
          >
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Plus className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Create Your Portfolio
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              You haven't created a portfolio yet. Get started now and showcase your
              work to the world!
            </p>
            <Link to="/builder" className="btn-primary inline-flex items-center">
              <Plus className="w-5 h-5 mr-2" />
              Create Portfolio
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;