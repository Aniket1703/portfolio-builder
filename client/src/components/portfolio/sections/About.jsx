import { motion } from "framer-motion";
import { Download, MapPin } from "lucide-react";

const About = ({ data }) => {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white pt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center lg:justify-end"
          >
            {data?.profilePhoto ? (
              <img
                src={data.profilePhoto}
                alt={data.name}
                className="w-64 h-64 lg:w-80 lg:h-80 rounded-full object-cover border-8 border-white shadow-2xl"
              />
            ) : (
              <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full bg-white bg-opacity-20 flex items-center justify-center border-8 border-white shadow-2xl">
                <span className="text-6xl font-bold text-white">
                  {data?.name?.[0] || "P"}
                </span>
              </div>
            )}
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-5xl lg:text-6xl font-bold mb-4">
              {data?.name || "Your Name"}
            </h1>
            <h2 className="text-2xl lg:text-3xl text-blue-200 mb-6">
              {data?.title || "Your Professional Title"}
            </h2>
            <p className="text-lg text-blue-100 mb-8 leading-relaxed">
              {data?.bio ||
                "Add your bio to tell visitors about yourself, your skills, and what you do."}
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              {data?.resume && (
                <a
                  href={data.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Resume
                </a>
              )}
              <a
                href="#contact"
                className="bg-blue-500 bg-opacity-20 backdrop-blur-sm border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-30 transition-colors"
              >
                Get In Touch
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default About;
