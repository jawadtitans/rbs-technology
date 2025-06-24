import pool from '../config/database.js';
import fs from 'fs';
import path from 'path';

const createTables = async () => {
  try {
    console.log('🚀 Starting database migration...');

    // Create database if it doesn't exist
    const createDbQuery = `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'rbs_technology'} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`;
    await pool.execute(createDbQuery);
    console.log('✅ Database created/verified');

    // Users table
    const usersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        full_name VARCHAR(255) NOT NULL,
        role ENUM('admin', 'teacher', 'student') DEFAULT 'student',
        avatar VARCHAR(500),
        bio TEXT,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;

    // Categories table
    const categoriesTable = `
      CREATE TABLE IF NOT EXISTS categories (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        name_dari VARCHAR(255),
        slug VARCHAR(255) UNIQUE NOT NULL,
        description TEXT,
        description_dari TEXT,
        icon VARCHAR(100),
        color VARCHAR(50) DEFAULT 'blue',
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;

    // Courses table
    const coursesTable = `
      CREATE TABLE IF NOT EXISTS courses (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(500) NOT NULL,
        title_dari VARCHAR(500),
        description TEXT NOT NULL,
        description_dari TEXT,
        video_url VARCHAR(1000) NOT NULL,
        thumbnail VARCHAR(500),
        category_id INT NOT NULL,
        teacher_id INT NOT NULL,
        type ENUM('free', 'paid') DEFAULT 'free',
        price DECIMAL(10,2) DEFAULT 0.00,
        currency VARCHAR(10) DEFAULT 'USD',
        certificate BOOLEAN DEFAULT false,
        duration_hours INT DEFAULT 0,
        level ENUM('beginner', 'intermediate', 'advanced') DEFAULT 'beginner',
        language ENUM('en', 'dari', 'both') DEFAULT 'en',
        is_featured BOOLEAN DEFAULT false,
        is_active BOOLEAN DEFAULT true,
        enrollment_count INT DEFAULT 0,
        rating DECIMAL(3,2) DEFAULT 0.00,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
        FOREIGN KEY (teacher_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `;

    // Blog posts table
    const blogPostsTable = `
      CREATE TABLE IF NOT EXISTS blog_posts (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(500) NOT NULL,
        slug VARCHAR(500) UNIQUE NOT NULL,
        content LONGTEXT NOT NULL,
        excerpt TEXT,
        featured_image VARCHAR(500),
        author_id INT NOT NULL,
        language ENUM('en', 'dari') DEFAULT 'en',
        status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
        is_featured BOOLEAN DEFAULT false,
        views_count INT DEFAULT 0,
        published_at TIMESTAMP NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `;

    // Course enrollments table
    const enrollmentsTable = `
      CREATE TABLE IF NOT EXISTS course_enrollments (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        course_id INT NOT NULL,
        enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        progress DECIMAL(5,2) DEFAULT 0.00,
        completed_at TIMESTAMP NULL,
        certificate_issued BOOLEAN DEFAULT false,
        UNIQUE KEY unique_enrollment (user_id, course_id),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
      )
    `;

    // Contact messages table
    const contactMessagesTable = `
      CREATE TABLE IF NOT EXISTS contact_messages (
        id INT PRIMARY KEY AUTO_INCREMENT,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(500),
        message TEXT NOT NULL,
        status ENUM('new', 'read', 'replied', 'archived') DEFAULT 'new',
        ip_address VARCHAR(45),
        user_agent TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;

    // Newsletter subscriptions table
    const newsletterTable = `
      CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
        id INT PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR(255) UNIQUE NOT NULL,
        status ENUM('active', 'unsubscribed') DEFAULT 'active',
        subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        unsubscribed_at TIMESTAMP NULL
      )
    `;

    // Course reviews table
    const reviewsTable = `
      CREATE TABLE IF NOT EXISTS course_reviews (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        course_id INT NOT NULL,
        rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
        review TEXT,
        is_approved BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY unique_review (user_id, course_id),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
      )
    `;

    // Execute table creation
    const tables = [
      { name: 'users', query: usersTable },
      { name: 'categories', query: categoriesTable },
      { name: 'courses', query: coursesTable },
      { name: 'blog_posts', query: blogPostsTable },
      { name: 'course_enrollments', query: enrollmentsTable },
      { name: 'contact_messages', query: contactMessagesTable },
      { name: 'newsletter_subscriptions', query: newsletterTable },
      { name: 'course_reviews', query: reviewsTable }
    ];

    for (const table of tables) {
      await pool.execute(table.query);
      console.log(`✅ Table '${table.name}' created/verified`);
    }

    console.log('🎉 Database migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
};

createTables();