import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { Sparkles, Zap, Globe, TrendingUp } from 'lucide-react';

const Home = () => { 
    const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Quick Setup',
      description: 'Create your portfolio in minutes with our intuitive builder',
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Custom URL',
      description: 'Get your own unique portfolio URL to share with everyone',
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Analytics',
      description: 'Track views and engagement on your portfolio',
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Professional Design',
      description: 'Beautiful, responsive templates that work on all devices',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Build Your Professional
              <br />
              <span className="text-yellow-300">Portfolio in 1 Minutes</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Showcase your skills, projects, and experience with a stunning portfolio
              website. No coding required.
            </p>
            { isAuthenticated ? 
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/dashboard"
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Get Started Free
                </Link>
              </div>
            :
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/register"
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Get Started Free
                </Link>
                <Link
                  to="/login"
                  className="bg-blue-500 bg-opacity-20 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-opacity-30 transition-colors"
                >
                  Sign In
                </Link>
              </div>
            }
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600">
              Powerful features to make your portfolio stand out
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Build Your Portfolio?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of professionals showcasing their work
            </p>
            {isAuthenticated ?
              <Link
                to="/dashboard"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-flex items-center"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Start Building Now
              </Link>
            :
              <Link
                to="/register"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-flex items-center"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Start Building Now
              </Link>
            }
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;