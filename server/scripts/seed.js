import pool from '../config/database.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Create admin user
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'rbs2024', 12);
    
    const adminUser = `
      INSERT IGNORE INTO users (email, password, full_name, role, bio, avatar) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    
    await pool.execute(adminUser, [
      process.env.ADMIN_EMAIL || 'admin@rbstechnology.com',
      hashedPassword,
      'RBS Technology Admin',
      'admin',
      'Administrator of RBS Technology platform',
      'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150'
    ]);

    // Create sample teachers
    const teachers = [
      {
        email: 'ahmad.rahman@rbstechnology.com',
        name: 'Ahmad Rahman',
        bio: 'Senior Software Developer with 5+ years experience in Python and web development',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        email: 'sarah.johnson@rbstechnology.com',
        name: 'Sarah Johnson',
        bio: 'TESOL certified English instructor with expertise in business communication',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        email: 'jawad.rahimi@rbstechnology.com',
        name: 'Jawad Rahimi',
        bio: 'Full-stack developer and RBS-Technology co-founder specializing in React and Node.js',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150'
      }
    ];

    for (const teacher of teachers) {
      const teacherPassword = await bcrypt.hash('teacher123', 12);
      await pool.execute(
        `INSERT IGNORE INTO users (email, password, full_name, role, bio, avatar) VALUES (?, ?, ?, ?, ?, ?)`,
        [teacher.email, teacherPassword, teacher.name, 'teacher', teacher.bio, teacher.avatar]
      );
    }

    // Create categories
    const categories = [
      {
        name: 'Programming',
        name_dari: 'برنامه‌نویسی',
        slug: 'programming',
        description: 'Learn programming languages and software development',
        description_dari: 'زبان‌های برنامه‌نویسی و توسعه نرم‌افزار را یاد بگیرید',
        icon: 'Code',
        color: 'blue'
      },
      {
        name: 'English Courses',
        name_dari: 'دوره‌های انگلیسی',
        slug: 'english',
        description: 'Improve your English language skills',
        description_dari: 'مهارت‌های زبان انگلیسی خود را بهبود دهید',
        icon: 'Globe',
        color: 'green'
      },
      {
        name: 'IT Basics & Soft Skills',
        name_dari: 'مبانی IT و مهارت‌های نرم',
        slug: 'it-basics',
        description: 'Essential IT knowledge and professional skills',
        description_dari: 'دانش ضروری IT و مهارت‌های حرفه‌ای',
        icon: 'Monitor',
        color: 'purple'
      }
    ];

    for (const category of categories) {
      await pool.execute(
        `INSERT IGNORE INTO categories (name, name_dari, slug, description, description_dari, icon, color) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [category.name, category.name_dari, category.slug, category.description, category.description_dari, category.icon, category.color]
      );
    }

    // Get category and teacher IDs for courses
    const [categoryRows] = await pool.execute('SELECT id, slug FROM categories');
    const [teacherRows] = await pool.execute('SELECT id, email FROM users WHERE role = "teacher"');

    const categoryMap = {};
    categoryRows.forEach(cat => categoryMap[cat.slug] = cat.id);

    const teacherMap = {};
    teacherRows.forEach(teacher => teacherMap[teacher.email] = teacher.id);

    // Create sample courses
    const courses = [
      {
        title: 'Python Programming Fundamentals',
        title_dari: 'مبانی برنامه‌نویسی پایتون',
        description: 'Learn Python from scratch with practical examples and projects. Perfect for beginners who want to start their programming journey.',
        description_dari: 'پایتون را از صفر با مثال‌ها و پروژه‌های عملی یاد بگیرید. مناسب برای مبتدیان که می‌خواهند سفر برنامه‌نویسی خود را شروع کنند.',
        video_url: 'https://www.youtube.com/embed/rfscVS0vtbw',
        category_id: categoryMap['programming'],
        teacher_id: teacherMap['ahmad.rahman@rbstechnology.com'],
        type: 'free',
        certificate: true,
        duration_hours: 40,
        level: 'beginner'
      },
      {
        title: 'English for Beginners',
        title_dari: 'انگلیسی برای مبتدیان',
        description: 'Master English basics with interactive lessons and practice sessions. Build confidence in speaking and writing.',
        description_dari: 'مبانی انگلیسی را با درس‌های تعاملی و جلسات تمرین تسلط پیدا کنید. اعتماد به نفس در صحبت کردن و نوشتن بسازید.',
        video_url: 'https://www.youtube.com/embed/3i_HEzPHMOc',
        category_id: categoryMap['english'],
        teacher_id: teacherMap['sarah.johnson@rbstechnology.com'],
        type: 'paid',
        price: 99.99,
        certificate: true,
        duration_hours: 60,
        level: 'beginner'
      },
      {
        title: 'Web Development with React',
        title_dari: 'توسعه وب با React',
        description: 'Build modern web applications using React and JavaScript. Learn component-based architecture and state management.',
        description_dari: 'برنامه‌های وب مدرن با استفاده از React و JavaScript بسازید. معماری مبتنی بر کامپوننت و مدیریت state را یاد بگیرید.',
        video_url: 'https://www.youtube.com/embed/Ke90Tje7VS0',
        category_id: categoryMap['programming'],
        teacher_id: teacherMap['jawad.rahimi@rbstechnology.com'],
        type: 'paid',
        price: 149.99,
        certificate: true,
        duration_hours: 80,
        level: 'intermediate'
      }
    ];

    for (const course of courses) {
      await pool.execute(
        `INSERT IGNORE INTO courses (title, title_dari, description, description_dari, video_url, category_id, teacher_id, type, price, certificate, duration_hours, level) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [course.title, course.title_dari, course.description, course.description_dari, course.video_url, course.category_id, course.teacher_id, course.type, course.price, course.certificate, course.duration_hours, course.level]
      );
    }

    // Create sample blog posts
    const [adminRows] = await pool.execute('SELECT id FROM users WHERE role = "admin" LIMIT 1');
    const adminId = adminRows[0].id;

    const blogPosts = [
      {
        title: 'The Future of Tech Education in Afghanistan',
        slug: 'future-tech-education-afghanistan',
        content: 'Technology education is rapidly evolving in Afghanistan, opening new opportunities for young learners...',
        excerpt: 'Exploring how digital education is transforming learning opportunities for Afghan youth.',
        featured_image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
        language: 'en',
        status: 'published',
        published_at: new Date()
      },
      {
        title: 'نقش تکنولوژی در آموزش',
        slug: 'role-technology-education-dari',
        content: 'تکنولوژی نقش مهمی در بهبود کیفیت آموزش دارد و فرصت‌های جدیدی برای یادگیری فراهم می‌کند...',
        excerpt: 'بررسی تأثیر مثبت تکنولوژی بر یادگیری و آموزش در افغانستان.',
        featured_image: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=800',
        language: 'dari',
        status: 'published',
        published_at: new Date()
      }
    ];

    for (const post of blogPosts) {
      await pool.execute(
        `INSERT IGNORE INTO blog_posts (title, slug, content, excerpt, featured_image, author_id, language, status, published_at) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [post.title, post.slug, post.content, post.excerpt, post.featured_image, adminId, post.language, post.status, post.published_at]
      );
    }

    console.log('🎉 Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();