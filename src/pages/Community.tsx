import React from 'react';
import { motion } from 'framer-motion';
import { Users, MessageCircle, Calendar, Award, ExternalLink } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Community: React.FC = () => {
  const { t } = useLanguage();

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const socialPlatforms = [
    {
      name: 'Telegram',
      description: 'Join our Telegram community for daily discussions and support',
      members: '2,500+',
      icon: '📱',
      color: 'bg-blue-500',
      link: '#'
    },
    {
      name: 'Facebook',
      description: 'Connect with fellow learners and share your progress',
      members: '1,200+',
      icon: '👥',
      color: 'bg-blue-600',
      link: '#'
    },
    {
      name: 'Discord',
      description: 'Real-time chat and voice conversations with peers',
      members: '800+',
      icon: '💬',
      color: 'bg-indigo-600',
      link: '#'
    }
  ];

  const events = [
    {
      id: 1,
      title: 'Tech Meetup Kabul',
      date: '2025-01-15',
      time: '18:00',
      type: 'In-Person',
      description: 'Monthly tech meetup for developers and tech enthusiasts in Kabul'
    },
    {
      id: 2,
      title: 'Online Coding Workshop',
      date: '2025-01-22',
      time: '15:00',
      type: 'Virtual',
      description: 'Hands-on Python programming workshop for beginners'
    },
    {
      id: 3,
      title: 'Career Development Webinar',
      date: '2025-01-29',
      time: '19:00',
      type: 'Virtual',
      description: 'Tips and strategies for building a successful tech career'
    }
  ];

  const ambassadors = [
    {
      name: 'Ahmad Rahman',
      title: 'Community Ambassador - Kabul',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      contributions: 'Organizes local meetups and mentors new developers'
    },
    {
      name: 'Fatima Shah',
      title: 'Community Ambassador - Herat', 
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
      contributions: 'Leads women in tech initiatives and coding workshops'
    },
    {
      name: 'Omar Karimi',
      title: 'Community Ambassador - Mazar',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      contributions: 'Coordinates online events and provides technical support'
    }
  ];

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
              {t('joinOurCommunity')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('communitySubtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Social Platforms */}
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
              Join Our Platforms
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {socialPlatforms.map((platform, index) => (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div className={`w-16 h-16 ${platform.color} rounded-full flex items-center justify-center mx-auto mb-6 text-2xl`}>
                  {platform.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {platform.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {platform.description}
                </p>
                <div className="text-sm text-gray-500 mb-6">
                  {platform.members} members
                </div>
                <a
                  href={platform.link}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 inline-flex items-center space-x-2"
                >
                  <span>Join Now</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events */}
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
              Upcoming Events
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-3">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {event.title}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        event.type === 'Virtual' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {event.type}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">
                      {event.description}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>{event.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                      Register
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Community Ambassadors */}
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
              Community Ambassadors
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet our dedicated ambassadors who help build and nurture our community across Afghanistan.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {ambassadors.map((ambassador, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-8 text-center"
              >
                <img
                  src={ambassador.avatar}
                  alt={ambassador.name}
                  className="w-24 h-24 rounded-full mx-auto mb-6"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {ambassador.name}
                </h3>
                <p className="text-blue-600 font-medium mb-4">
                  {ambassador.title}
                </p>
                <p className="text-gray-600">
                  {ambassador.contributions}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Become Ambassador CTA */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Become a Community Ambassador
            </h2>
            <p className="text-xl text-orange-100 mb-8">
              Help us grow the tech community in your city and make a difference in people's lives.
            </p>
            <button className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              Apply Now
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Community;