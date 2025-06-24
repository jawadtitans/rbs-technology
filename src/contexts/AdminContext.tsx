import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Course {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  category: string;
  type: 'free' | 'paid';
  certificate: boolean;
  teacher: {
    name: string;
    bio: string;
    avatar: string;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  image: string;
  date: string;
  language: 'en' | 'dari';
}

interface AdminContextType {
  isAdmin: boolean;
  courses: Course[];
  blogPosts: BlogPost[];
  login: (username: string, password: string) => boolean;
  logout: () => void;
  addCourse: (course: Omit<Course, 'id'>) => void;
  updateCourse: (id: string, course: Partial<Course>) => void;
  deleteCourse: (id: string) => void;
  addBlogPost: (post: Omit<BlogPost, 'id'>) => void;
  updateBlogPost: (id: string, post: Partial<BlogPost>) => void;
  deleteBlogPost: (id: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [courses, setCourses] = useState<Course[]>([
    {
      id: '1',
      title: 'Python Programming Fundamentals',
      description: 'Learn Python from scratch with practical examples and projects.',
      videoUrl: 'https://www.youtube.com/embed/rfscVS0vtbw',
      category: 'programming',
      type: 'free',
      certificate: true,
      teacher: {
        name: 'Ahmad Rahman',
        bio: 'Senior Software Developer with 5+ years experience',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'
      }
    },
    {
      id: '2',
      title: 'English for Beginners',
      description: 'Master English basics with interactive lessons and practice sessions.',
      videoUrl: 'https://www.youtube.com/embed/3i_HEzPHMOc',
      category: 'english',
      type: 'paid',
      certificate: true,
      teacher: {
        name: 'Sarah Johnson',
        bio: 'TESOL certified English instructor',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150'
      }
    },
    {
      id: '3',
      title: 'Web Development with React',
      description: 'Build modern web applications using React and JavaScript.',
      videoUrl: 'https://www.youtube.com/embed/Ke90Tje7VS0',
      category: 'programming',
      type: 'paid',
      certificate: true,
      teacher: {
        name: 'Jawad Rahimi',
        bio: 'Full-stack developer and RBS-Technology co-founder',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150'
      }
    }
  ]);

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([
    {
      id: '1',
      title: 'The Future of Tech Education in Afghanistan',
      content: 'Technology education is rapidly evolving in Afghanistan...',
      excerpt: 'Exploring how digital education is transforming learning opportunities for Afghan youth.',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '2024-12-20',
      language: 'en'
    },
    {
      id: '2',
      title: 'نقش تکنولوژی در آموزش',
      content: 'تکنولوژی نقش مهمی در بهبود کیفیت آموزش دارد...',
      excerpt: 'بررسی تأثیر مثبت تکنولوژی بر یادگیری و آموزش در افغانستان.',
      image: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '2024-12-19',
      language: 'dari'
    }
  ]);

  const login = (username: string, password: string): boolean => {
    // Simple authentication (in production, use proper authentication)
    if (username === 'admin' && password === 'rbs2024') {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
  };

  const addCourse = (course: Omit<Course, 'id'>) => {
    const newCourse = { ...course, id: Date.now().toString() };
    setCourses(prev => [...prev, newCourse]);
  };

  const updateCourse = (id: string, courseUpdate: Partial<Course>) => {
    setCourses(prev => prev.map(course => 
      course.id === id ? { ...course, ...courseUpdate } : course
    ));
  };

  const deleteCourse = (id: string) => {
    setCourses(prev => prev.filter(course => course.id !== id));
  };

  const addBlogPost = (post: Omit<BlogPost, 'id'>) => {
    const newPost = { ...post, id: Date.now().toString() };
    setBlogPosts(prev => [...prev, newPost]);
  };

  const updateBlogPost = (id: string, postUpdate: Partial<BlogPost>) => {
    setBlogPosts(prev => prev.map(post => 
      post.id === id ? { ...post, ...postUpdate } : post
    ));
  };

  const deleteBlogPost = (id: string) => {
    setBlogPosts(prev => prev.filter(post => post.id !== id));
  };

  return (
    <AdminContext.Provider value={{
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
    }}>
      {children}
    </AdminContext.Provider>
  );
};