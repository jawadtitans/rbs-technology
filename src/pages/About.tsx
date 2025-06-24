import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Award, Users, Target, Eye } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import manImg from '../assets/images/man.jpg';

const About: React.FC = () => {
  const { t } = useLanguage();

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="py-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t('aboutTitle')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('aboutDescription')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-gray-600 mb-6">
                RBS-Technology was born from a vision to bridge the digital divide in Afghanistan. 
                Founded in 2024, we recognized the immense potential of Afghan youth and their 
                hunger for quality education and technological advancement.
              </p>
              <p className="text-gray-600 mb-6">
                Our mission is to provide accessible, high-quality education that empowers 
                individuals to build successful careers in the digital economy. We believe 
                that technology education should be available to everyone, regardless of 
                their background or circumstances.
              </p>
              <p className="text-gray-600">
                Through our comprehensive courses, community support, and industry partnerships, 
                we're not just teaching technology – we're building the future of Afghanistan's 
                digital landscape.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={manImg}
                alt="jawad Rahimi"
                className="rounded-xl shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white p-8 rounded-xl shadow-lg text-center"
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To democratize technology education and empower Afghan youth with the skills 
                needed to thrive in the digital economy.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-8 rounded-xl shadow-lg text-center"
            >
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600">
                To become the leading platform for technology education in Afghanistan, 
                fostering innovation and digital transformation across the region.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white p-8 rounded-xl shadow-lg text-center"
            >
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Values</h3>
              <p className="text-gray-600">
                Excellence in education, inclusivity, innovation, and commitment to 
                the growth and success of every individual in our community.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Co-founder Profile */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Co-Founder
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                <div className="text-center">
                  <img
                    src={manImg}
                    alt="Jawad Rahimi"
                    className="w-48 h-48 rounded-full mx-auto mb-6 shadow-lg"
                  />
                  <a
                    href="https://jawadrahimi.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors"
                  >
                    View Portfolio
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Jawad Rahimi</h3>
                  <p className="text-lg text-blue-600 mb-4">Co-Founder & Lead Developer</p>
                  <p className="text-gray-600 mb-4">
                    Jawad is a passionate full-stack developer and educator with extensive 
                    experience in modern web technologies. With a deep commitment to education 
                    and community development, he co-founded RBS-Technology to bridge the 
                    digital skills gap in Afghanistan.
                  </p>
                  <p className="text-gray-600 mb-6">
                    His expertise spans across React, Node.js, Python, and mobile development. 
                    Jawad believes in the power of technology to transform lives and is 
                    dedicated to making quality education accessible to everyone.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">React</span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Node.js</span>
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">Python</span>
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Flutter</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-200"></div>
              
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative flex items-center mb-8"
              >
                <div className="bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  1
                </div>
                <div className="ml-6">
                  <h3 className="text-lg font-semibold text-gray-900">2024 - Foundation</h3>
                  <p className="text-gray-600">RBS-Technology was founded with a mission to revolutionize tech education in Afghanistan.</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative flex items-center mb-8"
              >
                <div className="bg-teal-600 w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  2
                </div>
                <div className="ml-6">
                  <h3 className="text-lg font-semibold text-gray-900">2025 - Platform Launch</h3>
                  <p className="text-gray-600">Official launch of our comprehensive learning platform with multilingual support.</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative flex items-center mb-8"
              >
                <div className="bg-orange-600 w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  3
                </div>
                <div className="ml-6">
                  <h3 className="text-lg font-semibold text-gray-900">2025 - Community Growth</h3>
                  <p className="text-gray-600">Expanding our community and partnerships to reach more students across Afghanistan.</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative flex items-center"
              >
                <div className="bg-purple-600 w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  4
                </div>
                <div className="ml-6">
                  <h3 className="text-lg font-semibold text-gray-900">Future - Regional Expansion</h3>
                  <p className="text-gray-600">Plans to expand our impact across Central Asia and beyond.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;