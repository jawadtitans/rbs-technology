import pool from '../config/database.js';

export const getAllBlogPosts = async (req, res) => {
  try {
    const { language, status = 'published', page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    let query = `
      SELECT 
        bp.*,
        u.full_name as author_name,
        u.avatar as author_avatar
      FROM blog_posts bp
      JOIN users u ON bp.author_id = u.id
      WHERE bp.status = ?
    `;

    const params = [status];

    if (language) {
      query += ' AND bp.language = ?';
      params.push(language);
    }

    query += ' ORDER BY bp.published_at DESC, bp.created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const [posts] = await pool.execute(query, params);

    // Get total count
    let countQuery = `
      SELECT COUNT(*) as total
      FROM blog_posts bp
      WHERE bp.status = ?
    `;

    const countParams = [status];
    if (language) {
      countQuery += ' AND bp.language = ?';
      countParams.push(language);
    }

    const [countResult] = await pool.execute(countQuery, countParams);
    const total = countResult[0].total;

    res.json({
      success: true,
      data: {
        posts,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get blog posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const getBlogPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const [posts] = await pool.execute(`
      SELECT 
        bp.*,
        u.full_name as author_name,
        u.avatar as author_avatar,
        u.bio as author_bio
      FROM blog_posts bp
      JOIN users u ON bp.author_id = u.id
      WHERE bp.id = ? AND bp.status = 'published'
    `, [id]);

    if (posts.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    // Increment views count
    await pool.execute(
      'UPDATE blog_posts SET views_count = views_count + 1 WHERE id = ?',
      [id]
    );

    res.json({
      success: true,
      data: { post: posts[0] }
    });
  } catch (error) {
    console.error('Get blog post error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const getBlogPostBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const [posts] = await pool.execute(`
      SELECT 
        bp.*,
        u.full_name as author_name,
        u.avatar as author_avatar,
        u.bio as author_bio
      FROM blog_posts bp
      JOIN users u ON bp.author_id = u.id
      WHERE bp.slug = ? AND bp.status = 'published'
    `, [slug]);

    if (posts.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    // Increment views count
    await pool.execute(
      'UPDATE blog_posts SET views_count = views_count + 1 WHERE id = ?',
      [posts[0].id]
    );

    res.json({
      success: true,
      data: { post: posts[0] }
    });
  } catch (error) {
    console.error('Get blog post by slug error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const createBlogPost = async (req, res) => {
  try {
    const {
      title,
      slug,
      content,
      excerpt,
      featured_image,
      language,
      status = 'draft',
      is_featured = false
    } = req.body;

    const authorId = req.user.id;
    const publishedAt = status === 'published' ? new Date() : null;

    const [result] = await pool.execute(`
      INSERT INTO blog_posts (
        title, slug, content, excerpt, featured_image, author_id,
        language, status, is_featured, published_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      title, slug, content, excerpt, featured_image, authorId,
      language, status, is_featured, publishedAt
    ]);

    // Get created post
    const [posts] = await pool.execute(`
      SELECT 
        bp.*,
        u.full_name as author_name
      FROM blog_posts bp
      JOIN users u ON bp.author_id = u.id
      WHERE bp.id = ?
    `, [result.insertId]);

    res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      data: { post: posts[0] }
    });
  } catch (error) {
    console.error('Create blog post error:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({
        success: false,
        message: 'A blog post with this slug already exists'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const updateBlogPost = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = req.body;

    // If status is being changed to published, set published_at
    if (updateFields.status === 'published' && !updateFields.published_at) {
      updateFields.published_at = new Date();
    }

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
      `UPDATE blog_posts SET ${setClause} WHERE id = ?`,
      values
    );

    // Get updated post
    const [posts] = await pool.execute(`
      SELECT 
        bp.*,
        u.full_name as author_name
      FROM blog_posts bp
      JOIN users u ON bp.author_id = u.id
      WHERE bp.id = ?
    `, [id]);

    if (posts.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    res.json({
      success: true,
      message: 'Blog post updated successfully',
      data: { post: posts[0] }
    });
  } catch (error) {
    console.error('Update blog post error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const deleteBlogPost = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.execute(
      'DELETE FROM blog_posts WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    res.json({
      success: true,
      message: 'Blog post deleted successfully'
    });
  } catch (error) {
    console.error('Delete blog post error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};