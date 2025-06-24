import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'dari';

const enTranslations = {
    // Navigation
    home: 'Home',
    about: 'About',
    courses: 'Courses',
    store: 'Store',
    blog: 'Blog',
    community: 'Community',
    contact: 'Contact',
    
    // Homepage
    heroTitle: 'Smart Learning. Digital Growth. Local Innovation.',
    heroSubtitle: "Empowering Afghanistan's youth through technology, education, and digital transformation.",
    exploreCourses: 'Explore Courses',
    shopNow: 'Shop Now',
    joinCommunity: 'Join Community',
    watchIntro: 'Watch Our Introduction',
    heroSliderSub1: "Building the future through technology education and digital innovation",
    heroSliderSub2: "Join thousands of students transforming their careers with cutting-edge skills",

    // Why Choose RBS
    whyChooseRBS: 'Why Choose RBS-Technology?',
    expertLedCourses: 'Expert-Led Courses',
    expertLedCoursesDesc: 'Learn from industry professionals with years of experience in technology and education.',
    certifiedLearning: 'Certified Learning',
    certifiedLearningDesc: 'Earn recognized certificates that validate your skills and boost your career prospects.',
    communitySupport: 'Community Support',
    communitySupportDesc: "Join a vibrant community of learners and professionals supporting each other's growth.",

    // Statistics
    studentsEnrolled: 'Students Enrolled',
    coursesAvailable: 'Courses Available',
    successRate: 'Success Rate',
    supportAvailable: 'Support Available',
    
    // Blog
    latestBlogPosts: 'Latest Blog Posts',
    blogSubtitle: 'Stay updated with the latest insights, tips, and news from the world of technology and education.',

    // Community
    joinOurCommunity: 'Join Our Community',
    communitySubtitle: "Connect with like-minded learners, share knowledge, and grow together in Afghanistan's largest tech community.",
    communityMembers: 'Community Members',
    monthlyEvents: 'Monthly Events',
    citiesCovered: 'Cities Covered',
    successStories: 'Success Stories',
    
    // About
    aboutTitle: 'About RBS-Technology',
    aboutDescription: 'Founded with a vision to revolutionize digital education in Afghanistan, RBS-Technology is your gateway to modern learning and technological advancement.',
    cofounderHeading: 'Message of Cofounder "Jawad Rahimi"',
    cofounderName: 'Jawad Rahimi',
    cofounderRole: 'Co-Founder & CEO of RBS-Technology',
    cofounderMessage: "Jawad Rahimi is a passionate full-stack developer, educator, and technology advocate from Afghanistan. His journey in the tech world began when he passed the Kankor Examination with the high score about 336.101 and as a fourth position of Daykundi province's position and successed in the Computer Science as a Software Engineer at Kabul University, where he continues his studies today with a strong focus on innovation and digital empowerment. Motivated by a deep commitment to education and social impact, Jawad co-founded RBS-Technology, a platform designed to bridge the digital skills gap for both girls and boys across Afghanistan. His goal is to create accessible learning opportunities, promote modern technological literacy, and inspire the next generation of Afghan developers and digital leaders. Through RBS-Technology, Jawad is building a smart and inclusive educational ecosystem that integrates e-learning, software development, and community-building, aiming to reshape the future of tech education in Afghanistan. As an active student and entrepreneur, he continues to lead by example — combining academic knowledge with real-world application to drive meaningful change in his country.",
    portfolioButton: 'View Portfolio',
    missionTitle: 'Our Mission',
    missionText: 'To democratize technology education and empower Afghan youth with the skills needed to thrive in the digital economy.',
    visionTitle: 'Our Vision',
    visionText: 'To become the leading platform for technology education in Afghanistan, fostering innovation and digital transformation across the region.',
    valuesTitle: 'Our Values',
    valuesText: 'Excellence in education, inclusivity, innovation, and commitment to the growth and success of every individual in our community.',
    
    // Courses
    coursesTitle: 'Our Courses',
    programming: 'Programming',
    english: 'English Courses',
    itBasics: 'IT Basics & Soft Skills',
    free: 'Free',
    paid: 'Paid',
    certificate: 'Certificate Available',
    
    // Store
    storeTitle: 'Our Products',
    comingSoon: 'Coming Soon!',
    comingSoonMessage: 'This product will be available soon. Stay tuned!',
    
    // Contact
    contactTitle: 'Contact Us',
    contactSubtitle: "Have questions or want to learn more about our programs? We'd love to hear from you!",
    sendMessageHeading: "Send us a Message",
    getInTouch: "Get in Touch",
    emailLabel: "Email",
    phoneLabel: "Phone",
    officeLabel: "Office",
    whatsappLabel: "WhatsApp",
    fullName: 'Full Name',
    email: 'Email',
    message: 'Message',
    sendMessage: 'Send Message',
    
    // Footer
    footerDescription: "Empowering Afghanistan's youth through technology, education, and digital transformation.",
    stayUpdated: "Stay Updated",
    newsletterSubtitle: "Subscribe to our newsletter and never miss the latest tech insights and educational content.",
    newsletter: 'Subscribe to Newsletter',
    subscribe: 'Subscribe',
    allRights: 'All rights reserved.',
};

type TranslationKeys = keyof typeof enTranslations;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKeys) => string;
}

const translations: { en: typeof enTranslations, dari: typeof enTranslations } = {
  en: enTranslations,
  dari: {
    // Navigation
    home: 'خانه',
    about: 'درباره ما',
    courses: 'کورس ها',
    store: 'فروشگاه',
    blog: ' بلاگ ها' ,
    community: 'انجمن',
    contact: 'تماس',
    
    // Homepage
    heroTitle: 'یادگیری هوشمند. رشد دیجیتال. نوآوری محلی.',
    heroSubtitle: 'تقویت جوانان افغانستان از طریق تکنولوژی، آموزش و تحول دیجیتال.',
    exploreCourses: 'دیدن کورس ها',
    shopNow: 'اکنون خرید کنید',
    joinCommunity: 'به انجمن بپیوندید',
    watchIntro: 'ویدیو معرفی ما را تماشا کنید',
    heroSliderSub1: "ساختن آینده از طریق آموزش فناوری و نوآوری دیجیتال",
    heroSliderSub2: "به هزاران دانشجو بپیوندید که با مهارت‌های پیشرفته، مسیر شغلی خود را متحول می‌کنند",

    // Why Choose RBS
    whyChooseRBS: 'چرا RBS-Technology را انتخاب کنیم؟',
    expertLedCourses: 'کورس‌های تخصصی',
    expertLedCoursesDesc: 'از متخصصان صنعت با سالها تجربه در تکنولوژی و آموزش بیاموزید.',
    certifiedLearning: 'یادگیری با گواهینامه',
    certifiedLearningDesc: 'گواهینamه‌های معتبر کسب کنید که مهارت‌های شما را تایید و چشم‌انداز شغلی شما را تقویت می‌کند.',
    communitySupport: 'پشتیبانی انجمن',
    communitySupportDesc: "به یک انجمن پویا از یادگیرندگان و متخصصان بپیوندید که از رشد یکدیگر حمایت می‌کنند.",
    
    // Statistics
    studentsEnrolled: "دانشجویان ثبت‌نام شده",
    coursesAvailable: "کورس‌های موجود",
    successRate: "نرخ موفقیت",
    supportAvailable: "پشتیبانی موجود",

    // Blog
    latestBlogPosts: "آخرین پست‌های وبلاگ",
    blogSubtitle: "با آخرین دیدگاه‌ها، نکات و اخبار دنیای تکنولوژی و آموزش به‌روز باشید.",

    // Community
    joinOurCommunity: "به انجمن ما بپیوندید",
    communitySubtitle: "با یادگیرندگان همفکر ارتباط برقرار کنید، دانش خود را به اشتراک بگذارید و در بزرگترین انجمن فناوری افغانستان با هم رشد کنید.",
    communityMembers: "اعضای انجمن",
    monthlyEvents: "رویدادهای ماهانه",
    citiesCovered: "شهرهای تحت پوشش",
    successStories: "داستان‌های موفقیت",

    // About
    aboutTitle: 'درباره RBS-Technology',
    aboutDescription: 'با چشم‌اندازی برای انقلاب در آموزش دیجیتال در افغانستان تأسیس شده، RBS-Technology دروازه شما به یادگیری مدرن و پیشرفت تکنولوژیکی است.',
    cofounderHeading: 'پیام مدیرعامل "جواد رحیمی"',
    cofounderName: 'جواد رحیمی',
    cofounderRole: 'هم‌بنیان‌گذار و مدیرعامل RBS-Technology',
    cofounderMessage: 'جواد رحیمی یک توسعه‌دهنده فول‌استک، مدرس و حامی تکنالوژی از افغانستان است. مسیر او در دنیای تکنالوژی با موفقیت در امتحان کانکور و کسب نمره عالی 336.101 و رتبه چهارم ولایت دایکندی آغاز شد و در رشته  کامپیوتر ساینس دانشگاه کابل به عنوان انجینری نرم‌افزار ادامه یافت. او هم‌اکنون با تمرکز بر نوآوری و توانمندسازی دیجیتال به تحصیل خود ادامه می‌دهد. با تعهد عمیق به آموزش و تأثیر اجتماعی، جواد RBS-Technology را با هدف پر کردن شکاف مهارت‌های دیجیتال برای دختران و پسران افغانستان تأسیس کرد. هدف او ایجاد فرصت‌های یادگیری در دسترس، ترویج سواد تکنالوژی مدرن و الهام‌بخشی به نسل آینده توسعه‌دهندگان و رهبران دیجیتال افغان است. از طریق RBS-Technology، جواد در حال ساخت یک اکوسیستم آموزشی هوشمند و فراگیر است که یادگیری الکترونیکی، توسعه نرم‌افزار و جامعه‌سازی را ادغام می‌کند تا آینده آموزش فناوری در افغانستان را بازآفرینی کند. او به عنوان یک دانشجو و کارآفرین فعال، با ترکیب دانش دانشگاهی و تجربه عملی، به رهبری تغییرات معنادار در کشورش ادامه می‌دهد.',
    portfolioButton: 'مشاهده پورتفولیو',
    missionTitle: 'ماموریت ما',
    missionText: 'دموکراتیک‌سازی آموزش فناوری و توانمندسازی جوانان افغان به ویژه دختران محروم از آموزش با مهارت‌های لازم برای موفقیت در اقتصاد دیجیتال.',
    visionTitle: 'چشم‌انداز ما',

    visionText: 'تبدیل شدن به برترین پلتفرم آموزش فناوری در افغانستان و ترویج نوآوری و تحول دیجیتال در سراسر منطقه.',
    valuesTitle: 'ارزش‌های ما',
    valuesText: 'برتری در آموزش، فراگیری، نوآوری و تعهد به رشد و موفقیت هر فرد در جامعه ما.',
    
    // Courses
    coursesTitle: 'دوره‌های ما',
    programming: 'برنامه‌نویسی',
    english: 'دوره‌های انگلیسی',
    itBasics: 'مبانی IT و مهارت‌های نرم',
    free: 'رایگان',
    paid: 'پولی',
    certificate: 'گواهی در دسترس',
    
    // Store
    storeTitle: 'محصولات ما',
    comingSoon: 'به زودی!',
    comingSoonMessage: 'این محصول به زودی در دسترس خواهد بود. منتظر بمانید!',
    
    // Contact
    contactTitle: 'تماس با ما',
    contactSubtitle: "سوالی دارید یا می‌خواهید درباره برنامه‌های ما بیشتر بدانید؟ خوشحال می‌شویم از شما بشنویم!",
    sendMessageHeading: "برای ما پیام بفرستید",
    getInTouch: "در تماس باشید",
    emailLabel: "ایمیل",
    phoneLabel: "تلفن",
    officeLabel: "دفتر",
    whatsappLabel: "واتساپ",
    fullName: 'نام کامل',
    email: 'ایمیل',
    message: 'پیام',
    sendMessage: 'ارسال پیام',
    
    // Footer
    footerDescription: "توانمندسازی جوانان افغانستان از طریق فناوری، آموزش و تحول دیجیتال.",
    stayUpdated: "به‌روز بمانید",
    newsletterSubtitle: "در خبرنامه ما عضو شوید و هرگز آخرین دیدگاه‌های فناوری و محتوای آموزشی را از دست ندهید.",
    newsletter: 'عضویت در خبرنامه',
    subscribe: 'عضویت',
    allRights: 'تمام حقوق محفوظ است.',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: TranslationKeys): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};