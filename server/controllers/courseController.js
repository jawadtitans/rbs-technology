import pool from '../config/database.js';

export const getAllCourses = async (req, res) => {
  try {
    const { category, type, language, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    let query = `
      SELECT 
        c.*,
        cat.name as category_name,
        cat.name_dari as category_name_dari,
        cat.slug as category_slug,
        u.full_name as teacher_name,
        u.bio as teacher_bio,
        u.avatar as teacher_avatar,
        u.email as teacher_email
      FROM courses c
      JOIN categories cat ON c.category_id = cat.id
      JOIN users u ON c.teacher_id = u.id
      WHERE c.is_active = true
    `;

    const params = [];

    if (category) {
      query += ' AND cat.slug = ?';
      params.push(category);
    }

    if (type) {
      query += ' AND c.type = ?';
      params.push(type);
    }

    if (language) {
      query += ' AND (c.language = ? OR c.language = "both")';
      params.push(language);
    }

    query += ' ORDER BY c.created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const [courses] = await pool.execute(query, params);

    // Get total count for pagination
    let countQuery = `
      SELECT COUNT(*) as total
      FROM courses c
      JOIN categories cat ON c.category_id = cat.id
      WHERE c.is_active = true
    `;

    const countParams = [];
    if (category) {
      countQuery += ' AND cat.slug = ?';
      countParams.push(category);
    }
    if (type) {
      countQuery += ' AND c.type = ?';
      countParams.push(type);
    }
    if (language) {
      countQuery += ' AND (c.language = ? OR c.language = "both")';
      countParams.push(language);
    }

    const [countResult] = await pool.execute(countQuery, countParams);
    const total = countResult[0].total;

    res.json({
      success: true,
      data: {
        courses,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    const [courses] = await pool.execute(`
      SELECT 
        c.*,
        cat.name as category_name,
        cat.name_dari as category_name_dari,
        cat.slug as category_slug,
        u.full_name as teacher_name,
        u.bio as teacher_bio,
        u.avatar as teacher_avatar,
        u.email as teacher_email
      FROM courses c
      JOIN categories cat ON c.category_id = cat.id
      JOIN users u ON c.teacher_id = u.id
      WHERE c.id = ? AND c.is_active = true
    `, [id]);

    if (courses.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.json({
      success: true,
      data: { course: courses[0] }
    });
  } catch (error) {
    console.error('Get course error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const createCourse = async (req, res) => {
  try {
    const {
      title,
      title_dari,
      description,
      description_dari,
      video_url,
      thumbnail,
      category_id,
      teacher_id,
      type,
      price,
      certificate,
      duration_hours,
      level,
      language
    } = req.body;

    const [result] = await pool.execute(`
      INSERT INTO courses (
        title, title_dari, description, description_dari, video_url, thumbnail,
        category_id, teacher_id, type, price, certificate, duration_hours, level, language
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      title, title_dari, description, description_dari, video_url, thumbnail,
      category_id, teacher_id, type, price || 0, certificate || false,
      duration_hours || 0, level || 'beginner', language || 'en'
    ]);

    // Get created course
    const [courses] = await pool.execute(`
      SELECT 
        c.*,
        cat.name as category_name,
        u.full_name as teacher_name
      FROM courses c
      JOIN categories cat ON c.category_id = cat.id
      JOIN users u ON c.teacher_id = u.id
      WHERE c.id = ?
    `, [result.insertId]);

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: { course: courses[0] }
    });
  } catch (error) {
    console.error('Create course error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = req.body;

    // Build dynamic update query
    const fields = Object.keys(updateFields);
    const values = Object.values(updateFields);
    
    if (fields.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No fields to update'
      });
    }

    const setClause = fields.map(field => `${field} = ?`).join(', ');
    values.push(id);

    await pool.execute(
      `UPDATE courses SET ${setClause} WHERE id = ?`,
      values
    );

    // Get updated course
    const [courses] = await pool.execute(`
      SELECT 
        c.*,
        cat.name as category_name,
        u.full_name as teacher_name
      FROM courses c
      JOIN categories cat ON c.category_id = cat.id
      JOIN users u ON c.teacher_id = u.id
      WHERE c.id = ?
    `, [id]);

    if (courses.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.json({
      success: true,
      message: 'Course updated successfully',
      data: { course: courses[0] }
    });
  } catch (error) {
    console.error('Update course error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.execute(
      'UPDATE courses SET is_active = false WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.json({
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (error) {
    console.error('Delete course error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const enrollInCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.id;

    // Check if course exists and is active
    const [courses] = await pool.execute(
      'SELECT id, type, price FROM courses WHERE id = ? AND is_active = true',
      [courseId]
    );

    if (courses.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Check if already enrolled
    const [enrollments] = await pool.execute(
      'SELECT id FROM course_enrollments WHERE user_id = ? AND course_id = ?',
      [userId, courseId]
    );

    if (enrollments.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Already enrolled in this course'
      });
    }

    // For paid courses, you would typically integrate with a payment processor here
    // For now, we'll allow free enrollment

    await pool.execute(
      'INSERT INTO course_enrollments (user_id, course_id) VALUES (?, ?)',
      [userId, courseId]
    );

    // Update enrollment count
    await pool.execute(
      'UPDATE courses SET enrollment_count = enrollment_count + 1 WHERE id = ?',
      [courseId]
    );

    res.status(201).json({
      success: true,
      message: 'Successfully enrolled in course'
    });
  } catch (error) {
    console.error('Enroll course error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};