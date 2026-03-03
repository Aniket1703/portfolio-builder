import { motion } from 'framer-motion';
import { Calendar, Award } from 'lucide-react';

const Education = ({ data }) => {
  return (
    <section id="education" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Education</h2>
          <p className="text-xl text-gray-600">My academic background</p>
        </motion.div>

        <div className="space-y-8">
          {data?.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 md:p-8"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* School Logo */}
                {edu.schoolLogo && (
                  <div className="flex-shrink-0">
                    <img
                      src={edu.schoolLogo}
                      alt={edu.school}
                      className="w-16 h-16 object-contain rounded-lg"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 className="text-2xl font-bold text-gray-900">{edu.degree}</h3>
                    <div className="flex items-center text-gray-600 text-sm mt-2 sm:mt-0">
                      <Calendar className="w-4 h-4 mr-2" />
                      {edu.startDate} - {edu.endDate}
                    </div>
                  </div>

                  <p className="text-blue-600 font-medium mb-2">{edu.school}</p>

                  {edu.grade && (
                    <div className="flex items-center text-gray-700 mb-4">
                      <Award className="w-4 h-4 mr-2" />
                      <span className="font-medium">Grade: {edu.grade}</span>
                    </div>
                  )}

                  {edu.description && (
                    <p className="text-gray-700 leading-relaxed">{edu.description}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;