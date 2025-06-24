import pool from '../config/database.js';

export const getAllCategories = async (req, res) => {
  try {
    const [categories] = await pool.execute(`
      SELECT 
        c.*,
        COUNT(co.id) as course_count
      FROM categories c
      LEFT JOIN courses co ON c.id = co.category_id AND co.is_active = true
      WHERE c.is_active = true
      GROUP BY c.id
      ORDER BY c.name
    `);

    res.json({
      success: true,
      data: { categories }
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const [categories] = await pool.execute(`
      SELECT 
        c.*,
        COUNT(co.id) as course_count
      FROM categories c
      LEFT JOIN courses co ON c.id = co.category_id AND co.is_active = true
      WHERE c.id = ? AND c.is_active = true
      GROUP BY c.id
    `, [id]);

    if (categories.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    res.json({
      success: true,
      data: { category: categories[0] }
    });
  } catch (error) {
    console.error('Get category error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const createCategory = async (req, res) => {
  try {
    const {
      name,
      name_dari,
      slug,
      description,
      description_dari,
      icon,
      color
    } = req.body;

    const [result] = await pool.execute(`
      INSERT INTO categories (name, name_dari, slug, description, description_dari, icon, color)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [name, name_dari, slug, description, description_dari, icon, color]);

    // Get created category
    const [categories] = await pool.execute(
      'SELECT * FROM categories WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: { category: categories[0] }
    });
  } catch (error) {
    console.error('Create category error:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({
        success: false,
        message: 'A category with this slug already exists'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = req.body;

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
      `UPDATE categories SET ${setClause} WHERE id = ?`,
      values
    );

    // Get updated category
    const [categories] = await pool.execute(
      'SELECT * FROM categories WHERE id = ?',
      [id]
    );

    if (categories.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    res.json({
      success: true,
      message: 'Category updated successfully',
      data: { category: categories[0] }
    });
  } catch (error) {
    console.error('Update category error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if category has courses
    const [courses] = await pool.execute(
      'SELECT COUNT(*) as count FROM courses WHERE category_id = ? AND is_active = true',
      [id]
    );

    if (courses[0].count > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete category with active courses'
      });
    }

    const [result] = await pool.execute(
      'UPDATE categories SET is_active = false WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    res.json({
      success: true,
      message: 'Category deleted successfully'
    });
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};