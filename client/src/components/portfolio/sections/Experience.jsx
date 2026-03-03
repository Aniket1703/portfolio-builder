import { motion } from 'framer-motion';
import { Calendar, Briefcase } from 'lucide-react';

const Experience = ({ data }) => {
  return (
    <section id="experience" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Experience</h2>
          <p className="text-xl text-gray-600">My professional journey</p>
        </motion.div>

        <div className="space-y-8">
          {data?.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 md:p-8"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Company Logo */}
                {exp.companyLogo && (
                  <div className="flex-shrink-0">
                    <img
                      src={exp.companyLogo}
                      alt={exp.company}
                      className="w-16 h-16 object-contain rounded-lg"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 className="text-2xl font-bold text-gray-900">{exp.role}</h3>
                    <div className="flex items-center text-gray-600 text-sm mt-2 sm:mt-0">
                      <Calendar className="w-4 h-4 mr-2" />
                      {exp.startDate} - {exp.endDate}
                    </div>
                  </div>

                  <div className="flex items-center text-blue-600 font-medium mb-4">
                    <Briefcase className="w-4 h-4 mr-2" />
                    {exp.company}
                  </div>

                  {exp.description && (
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {exp.description}
                    </p>
                  )}

                  {exp.skills?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
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

export default Experience;
