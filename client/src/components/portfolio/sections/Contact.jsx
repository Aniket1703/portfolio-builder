import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Globe } from 'lucide-react';

const Contact = ({ data }) => {
  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: data?.email,
      href: data?.email ? `mailto:${data.email}` : null,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: data?.phone,
      href: data?.phone ? `tel:${data.phone}` : null,
    },
    {
      icon: MapPin,
      label: 'Location',
      value: data?.location,
      href: null,
    },
  ].filter((item) => item.value);

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      url: data?.social?.github,
      color: 'hover:text-gray-900',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      url: data?.social?.linkedin,
      color: 'hover:text-blue-600',
    },
    {
      icon: Twitter,
      label: 'Twitter',
      url: data?.social?.twitter,
      color: 'hover:text-blue-400',
    },
    {
      icon: Globe,
      label: 'Website',
      url: data?.social?.website,
      color: 'hover:text-green-600',
    },
  ].filter((item) => item.url);

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
          <p className="text-xl text-gray-600">
            Let's connect and build something amazing together
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Contact Information
              </h3>
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                const content = (
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{item.label}</p>
                      <p className="font-medium text-gray-900">{item.value}</p>
                    </div>
                  </div>
                );

                return item.href ? (
                  <a
                    key={index}
                    href={item.href}
                    className="block hover:bg-gray-50 p-4 rounded-lg transition-colors"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={index} className="p-4">
                    {content}
                  </div>
                );
              })}
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Follow Me Online
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all ${social.color} group`}
                    >
                      <Icon className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium">{social.label}</span>
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-12"
          >
            <h3 className="text-3xl font-bold mb-4">Ready to work together?</h3>
            <p className="text-blue-100 mb-8 text-lg">
              I'm always open to discussing new projects and opportunities.
            </p>
            {data?.email && (
              <a
                href={`mailto:${data.email}`}
                className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Send me an email
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;