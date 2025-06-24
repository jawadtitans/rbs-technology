import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LogIn, 
  LogOut, 
  Plus, 
  Edit3, 
  Trash2, 
  Book, 
  FileText,
  User,
  Award,
  DollarSign
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAdmin, Course, BlogPost } from '../contexts/AdminContext';

const Admin: React.FC = () => {
  const { 
    isAdmin, 
    courses, 
    blogPosts, 
    login, 
    logout, 
    addCourse, 
    updateCourse, 
    deleteCourse,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost
  } = useAdmin();

  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [activeTab, setActiveTab] = useState<'courses' | 'blog'>('courses');
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [showPostForm, setShowPostForm] = useState(false);

  const [courseForm, setCourseForm] = useState({
    title: '',
    description: '',
    videoUrl: '',
    category: 'programming',
    type: 'free' as 'free' | 'paid',
    certificate: false,
    teacher: {
      name: '',
      bio: '',
      avatar: ''
    }
  });

  const [postForm, setPostForm] = useState({
    title: '',
    content: '',
    excerpt: '',
    image: '',
    language: 'en' as 'en' | 'dari'
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(loginForm.username, loginForm.password)) {
      toast.success('Welcome to RBS-Technology Admin Panel!');
      setLoginForm({ username: '', password: '' });
    } else {
      toast.error('Invalid credentials. Try username: admin, password: rbs2024');
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  const handleCourseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCourse) {
      updateCourse(editingCourse.id, courseForm);
      toast.success('Course updated successfully!');
    } else {
      addCourse(courseForm);
      toast.success('Course added successfully!');
    }
    resetCourseForm();
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const postData = {
      ...postForm,
      date: new Date().toISOString().split('T')[0]
    };
    
    if (editingPost) {
      updateBlogPost(editingPost.id, postData);
      toast.success('Blog post updated successfully!');
    } else {
      addBlogPost(postData);
      toast.success('Blog post added successfully!');
    }
    resetPostForm();
  };

  const resetCourseForm = () => {
    setCourseForm({
      title: '',
      description: '',
      videoUrl: '',
      category: 'programming',
      type: 'free',
      certificate: false,
      teacher: { name: '', bio: '', avatar: '' }
    });
    setEditingCourse(null);
    setShowCourseForm(false);
  };

  const resetPostForm = () => {
    setPostForm({
      title: '',
      content: '',
      excerpt: '',
      image: '',
      language: 'en'
    });
    setEditingPost(null);
    setShowPostForm(false);
  };

  const startEditCourse = (course: Course) => {
    setCourseForm(course);
    setEditingCourse(course);
    setShowCourseForm(true);
  };

  const startEditPost = (post: BlogPost) => {
    setPostForm({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      image: post.image,
      language: post.language
    });
    setEditingPost(post);
    setShowPostForm(true);
  };

  const handleDeleteCourse = (id: string) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      deleteCourse(id);
      toast.success('Course deleted successfully');
    }
  };

  const handleDeletePost = (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      deleteBlogPost(id);
      toast.success('Blog post deleted successfully');
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full space-y-8"
        >
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
              Admin Login
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Access the RBS-Technology admin panel
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                  className="relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Username"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  className="relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <LogIn className="h-5 w-5 mr-2" />
                Sign In
              </button>
            </div>
            
            <div className="mt-4 p-4 bg-blue-50 rounded-md">
              <p className="text-sm text-blue-700">
                <strong>Demo Credentials:</strong><br />
                Username: admin<br />
                Password: rbs2024
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab('courses')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'courses'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Book className="h-4 w-4 inline mr-2" />
                Courses Management
              </button>
              <button
                onClick={() => setActiveTab('blog')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'blog'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <FileText className="h-4 w-4 inline mr-2" />
                Blog Management
              </button>
            </nav>
          </div>

          {/* Courses Tab */}
          {activeTab === 'courses' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Courses</h2>
                <button
                  onClick={() => setShowCourseForm(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Course</span>
                </button>
              </div>

              {/* Course Form Modal */}
              {showCourseForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-4">
                        {editingCourse ? 'Edit Course' : 'Add New Course'}
                      </h3>
                      <form onSubmit={handleCourseSubmit} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                          <input
                            type="text"
                            value={courseForm.title}
                            onChange={(e) => setCourseForm({...courseForm, title: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                          <textarea
                            value={courseForm.description}
                            onChange={(e) => setCourseForm({...courseForm, description: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={3}
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Video URL</label>
                          <input
                            type="url"
                            value={courseForm.videoUrl}
                            onChange={(e) => setCourseForm({...courseForm, videoUrl: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select
                              value={courseForm.category}
                              onChange={(e) => setCourseForm({...courseForm, category: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="programming">Programming</option>
                              <option value="english">English</option>
                              <option value="itBasics">IT Basics</option>
                            </select>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                            <select
                              value={courseForm.type}
                              onChange={(e) => setCourseForm({...courseForm, type: e.target.value as 'free' | 'paid'})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="free">Free</option>
                              <option value="paid">Paid</option>
                            </select>
                          </div>
                        </div>
                        
                        <div>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={courseForm.certificate}
                              onChange={(e) => setCourseForm({...courseForm, certificate: e.target.checked})}
                              className="mr-2"
                            />
                            <span className="text-sm font-medium text-gray-700">Certificate Available</span>
                          </label>
                        </div>
                        
                        <div className="border-t pt-4">
                          <h4 className="font-medium text-gray-900 mb-3">Teacher Information</h4>
                          <div className="space-y-3">
                            <input
                              type="text"
                              placeholder="Teacher Name"
                              value={courseForm.teacher.name}
                              onChange={(e) => setCourseForm({
                                ...courseForm,
                                teacher: {...courseForm.teacher, name: e.target.value}
                              })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              required
                            />
                            <input
                              type="text"
                              placeholder="Teacher Bio"
                              value={courseForm.teacher.bio}
                              onChange={(e) => setCourseForm({
                                ...courseForm,
                                teacher: {...courseForm.teacher, bio: e.target.value}
                              })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              required
                            />
                            <input
                              type="url"
                              placeholder="Teacher Avatar URL"
                              value={courseForm.teacher.avatar}
                              onChange={(e) => setCourseForm({
                                ...courseForm,
                                teacher: {...courseForm.teacher, avatar: e.target.value}
                              })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="flex justify-end space-x-3 pt-4">
                          <button
                            type="button"
                            onClick={resetCourseForm}
                            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                          >
                            {editingCourse ? 'Update' : 'Add'} Course
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )}

              {/* Courses List */}
              <div className="space-y-4">
                {courses.map((course) => (
                  <div key={course.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
                        <p className="text-gray-600 mt-1">{course.description}</p>
                        <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                          <span className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            {course.teacher.name}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            course.type === 'free' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {course.type}
                          </span>
                          {course.certificate && (
                            <span className="flex items-center text-yellow-600">
                              <Award className="h-4 w-4 mr-1" />
                              Certificate
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={() => startEditCourse(course)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteCourse(course.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Blog Tab */}
          {activeTab === 'blog' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Blog Posts</h2>
                <button
                  onClick={() => setShowPostForm(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Post</span>
                </button>
              </div>

              {/* Blog Post Form Modal */}
              {showPostForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-4">
                        {editingPost ? 'Edit Blog Post' : 'Add New Blog Post'}
                      </h3>
                      <form onSubmit={handlePostSubmit} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                          <input
                            type="text"
                            value={postForm.title}
                            onChange={(e) => setPostForm({...postForm, title: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
                          <textarea
                            value={postForm.excerpt}
                            onChange={(e) => setPostForm({...postForm, excerpt: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={2}
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                          <textarea
                            value={postForm.content}
                            onChange={(e) => setPostForm({...postForm, content: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={6}
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                          <input
                            type="url"
                            value={postForm.image}
                            onChange={(e) => setPostForm({...postForm, image: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                          <select
                            value={postForm.language}
                            onChange={(e) => setPostForm({...postForm, language: e.target.value as 'en' | 'dari'})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="en">English</option>
                            <option value="dari">Dari</option>
                          </select>
                        </div>
                        
                        <div className="flex justify-end space-x-3 pt-4">
                          <button
                            type="button"
                            onClick={resetPostForm}
                            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                          >
                            {editingPost ? 'Update' : 'Add'} Post
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )}

              {/* Blog Posts List */}
              <div className="space-y-4">
                {blogPosts.map((post) => (
                  <div key={post.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
                        <p className="text-gray-600 mt-1">{post.excerpt}</p>
                        <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            post.language === 'en' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {post.language === 'en' ? 'English' : 'Dari'}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={() => startEditPost(post)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;