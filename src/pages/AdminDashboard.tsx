import React, { useEffect, useState } from 'react';

// Simple tab navigation
const TABS = ['Courses', 'Blogs', 'Community Links'] as const;
type Tab = typeof TABS[number];

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('Courses');
  const [courses, setCourses] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [links, setLinks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [token] = useState(localStorage.getItem('token'));

  // Fetch data for each tab
  useEffect(() => {
    setError('');
    setLoading(true);
    let url = '';
    if (activeTab === 'Courses') url = '/api/courses';
    if (activeTab === 'Blogs') url = '/api/blog';
    if (activeTab === 'Community Links') url = '/api/community-links';
    fetch(url, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => {
        if (!data.success) throw new Error(data.message);
        if (activeTab === 'Courses') setCourses(data.data || []);
        if (activeTab === 'Blogs') setBlogs(data.data || []);
        if (activeTab === 'Community Links') setLinks(data.data || []);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [activeTab, token]);

  // Render table for each tab
  const renderTable = () => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-600">{error}</div>;
    if (activeTab === 'Courses') {
      return (
        <table className="w-full border mt-4">
          <thead><tr><th>Title</th><th>Category</th><th>Actions</th></tr></thead>
          <tbody>
            {courses.map((c: any) => (
              <tr key={c.id}><td>{c.title}</td><td>{c.category}</td><td>Edit | Delete</td></tr>
            ))}
          </tbody>
        </table>
      );
    }
    if (activeTab === 'Blogs') {
      return (
        <table className="w-full border mt-4">
          <thead><tr><th>Title</th><th>Excerpt</th><th>Actions</th></tr></thead>
          <tbody>
            {blogs.map((b: any) => (
              <tr key={b.id}><td>{b.title}</td><td>{b.excerpt}</td><td>Edit | Delete</td></tr>
            ))}
          </tbody>
        </table>
      );
    }
    if (activeTab === 'Community Links') {
      return (
        <table className="w-full border mt-4">
          <thead><tr><th>Name</th><th>URL</th><th>Actions</th></tr></thead>
          <tbody>
            {links.map((l: any) => (
              <tr key={l.id}><td>{l.name}</td><td>{l.url}</td><td>Edit | Delete</td></tr>
            ))}
          </tbody>
        </table>
      );
    }
    return null;
  };

  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="flex space-x-4 mb-6">
        {TABS.map(tab => (
          <button
            key={tab}
            className={`px-4 py-2 rounded ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {renderTable()}
      {/* Add/Edit/Delete forms can be added here for each tab */}
    </div>
  );
};

export default AdminDashboard; 