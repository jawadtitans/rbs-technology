# RBS-Technology Backend API

A comprehensive Node.js backend API for the RBS-Technology educational platform with MySQL database integration.

## Features

- **Authentication & Authorization**: JWT-based auth with role-based access control
- **Course Management**: Full CRUD operations for courses with categories and teachers
- **Blog System**: Multi-language blog posts with rich content support
- **Contact System**: Contact form handling and newsletter subscriptions
- **User Management**: User profiles, enrollment tracking, and progress monitoring
- **Security**: Rate limiting, input validation, and SQL injection protection

## Tech Stack

- **Runtime**: Node.js with ES6 modules
- **Framework**: Express.js
- **Database**: MySQL with mysql2 driver
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: express-validator
- **Security**: Helmet, CORS, Rate limiting
- **Password Hashing**: bcryptjs

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

### Installation

1. **Clone and navigate to server directory**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=rbs_technology
   DB_USER=root
   DB_PASSWORD=your_password
   JWT_SECRET=your_super_secret_jwt_key_here
   PORT=5000
   ```

4. **Database Setup**
   ```bash
   # Create tables
   npm run migrate
   
   # Seed with sample data
   npm run seed
   ```

5. **Start the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Courses
- `GET /api/courses` - Get all courses (with filters)
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses` - Create course (teacher/admin)
- `PUT /api/courses/:id` - Update course (teacher/admin)
- `DELETE /api/courses/:id` - Delete course (admin)
- `POST /api/courses/:courseId/enroll` - Enroll in course (protected)

### Blog
- `GET /api/blog` - Get all blog posts
- `GET /api/blog/:id` - Get blog post by ID
- `GET /api/blog/slug/:slug` - Get blog post by slug
- `POST /api/blog` - Create blog post (admin)
- `PUT /api/blog/:id` - Update blog post (admin)
- `DELETE /api/blog/:id` - Delete blog post (admin)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create category (admin)
- `PUT /api/categories/:id` - Update category (admin)
- `DELETE /api/categories/:id` - Delete category (admin)

### Contact
- `POST /api/contact/message` - Send contact message
- `POST /api/contact/newsletter` - Subscribe to newsletter
- `GET /api/contact/messages` - Get all messages (admin)
- `PUT /api/contact/messages/:id/status` - Update message status (admin)

## Database Schema

### Users
- User authentication and profile management
- Role-based access (admin, teacher, student)
- Profile information and avatars

### Courses
- Course content with video URLs
- Multi-language support (English/Dari)
- Free/paid course types
- Certificate availability
- Teacher assignments and categories

### Blog Posts
- Multi-language blog system
- Rich content support
- Author information and publishing workflow
- View tracking and featured posts

### Categories
- Course categorization
- Multi-language category names
- Icon and color customization

### Contact & Newsletter
- Contact form submissions
- Newsletter subscription management
- Message status tracking

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt with salt rounds
- **Rate Limiting**: API request throttling
- **Input Validation**: Comprehensive request validation
- **SQL Injection Protection**: Parameterized queries
- **CORS Configuration**: Cross-origin request handling
- **Helmet Security**: HTTP security headers

## Default Admin Credentials

```
Email: admin@rbstechnology.com
Password: rbs2024
```

## Development

### Database Migration
```bash
npm run migrate
```

### Database Seeding
```bash
npm run seed
```

### Running in Development
```bash
npm run dev
```

## Production Deployment

1. Set `NODE_ENV=production` in your environment
2. Configure production database credentials
3. Set up proper CORS origins
4. Use a process manager like PM2
5. Set up SSL/TLS termination
6. Configure proper logging

## API Response Format

All API responses follow this consistent format:

```json
{
  "success": true|false,
  "message": "Response message",
  "data": {
    // Response data
  },
  "errors": [
    // Validation errors (if any)
  ]
}
```

## Error Handling

The API includes comprehensive error handling:
- Input validation errors
- Authentication/authorization errors
- Database connection errors
- Rate limiting errors
- Generic server errors

## Contributing

1. Follow the existing code structure
2. Add proper validation for new endpoints
3. Include error handling
4. Update documentation
5. Test thoroughly before submitting

## License

MIT License - see LICENSE file for details