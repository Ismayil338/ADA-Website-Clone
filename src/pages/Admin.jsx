import React, { useState, useEffect } from 'react';

const ADMIN_PASSWORD = 'admin123';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('sb_faculty');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({});

  const tabs = [
    { id: 'sb_faculty', label: 'SB Faculty', endpoint: 'sb_faculty' },
    { id: 'site_faculty', label: 'SITE Faculty', endpoint: 'site_faculty' },
    { id: 'news', label: 'News', endpoint: 'news' },
    { id: 'events', label: 'Events', endpoint: 'events' },
    { id: 'programs', label: 'Programs', endpoint: 'programs' },
    { id: 'research', label: 'Research', endpoint: 'research' }
  ];

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [activeTab, isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setMessage({ type: '', text: '' });
    } else {
      setMessage({ type: 'error', text: 'Incorrect password' });
      setPassword('');
    }
  };

  const loadData = async () => {
    setLoading(true);
    setMessage({ type: '', text: '' });
    try {
      const tab = tabs.find(t => t.id === activeTab);
      const response = await fetch(`http://localhost:5000/${tab.endpoint}`);
      if (!response.ok) throw new Error('Failed to fetch data');
      const jsonData = await response.json();
      setData(Array.isArray(jsonData) ? jsonData : []);
    } catch (error) {
      setMessage({ type: 'error', text: `Error loading data: ${error.message}` });
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage({ type: '', text: '' });
    try {
      const tab = tabs.find(t => t.id === activeTab);
      const response = await fetch(`http://localhost:5000/${tab.endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to save data');
      const result = await response.json();
      setMessage({ type: 'success', text: result.message || 'Data saved successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: `Error saving data: ${error.message}` });
    } finally {
      setSaving(false);
    }
  };

  const handleAdd = () => {
    const tab = tabs.find(t => t.id === activeTab);
    let newItem = {};
    
    if (tab.id === 'sb_faculty' || tab.id === 'site_faculty') {
      newItem = {
        name: '',
        role: '',
        department: '',
        profile_url: '',
        image_url: '',
        source_page: ''
      };
    } else if (tab.id === 'news') {
      newItem = {
        id: Date.now(),
        title: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
        image_url: '',
        link: '',
        excerpt: ''
      };
    } else if (tab.id === 'events') {
      newItem = {
        id: Date.now(),
        title: '',
        type: '',
        date: new Date().toISOString().split('T')[0],
        image_url: '',
        link: '',
        location: ''
      };
    } else if (tab.id === 'programs') {
      newItem = {
        id: Date.now(),
        title: '',
        school_label: '',
        level: '',
        link: ''
      };
    } else if (tab.id === 'research') {
      newItem = {
        id: Date.now(),
        title: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
        image_url: '',
        link: '',
        description: ''
      };
    }
    
    setData([...data, newItem]);
    setEditingIndex(data.length);
    setFormData(newItem);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setFormData({ ...data[index] });
  };

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const newData = data.filter((_, i) => i !== index);
      setData(newData);
      setEditingIndex(null);
    }
  };

  const handleFormChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSaveEdit = () => {
    const newData = [...data];
    newData[editingIndex] = formData;
    setData(newData);
    setEditingIndex(null);
    setFormData({});
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setFormData({});
  };

  const renderForm = () => {
    if (editingIndex === null) return null;

    const tab = tabs.find(t => t.id === activeTab);
    const item = formData;

    if (tab.id === 'sb_faculty' || tab.id === 'site_faculty') {
      return (
        <div style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
          <h4>{editingIndex === data.length ? 'Add New' : 'Edit'} Faculty Member</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                value={item.name || ''}
                onChange={(e) => handleFormChange('name', e.target.value)}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
            <div>
              <label>Role:</label>
              <input
                type="text"
                value={item.role || ''}
                onChange={(e) => handleFormChange('role', e.target.value)}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
            <div>
              <label>Department:</label>
              <input
                type="text"
                value={item.department || ''}
                onChange={(e) => handleFormChange('department', e.target.value)}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
            <div>
              <label>Profile URL:</label>
              <input
                type="text"
                value={item.profile_url || ''}
                onChange={(e) => handleFormChange('profile_url', e.target.value)}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
            <div>
              <label>Image URL:</label>
              <input
                type="text"
                value={item.image_url || ''}
                onChange={(e) => handleFormChange('image_url', e.target.value)}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
            <div>
              <label>Source Page:</label>
              <input
                type="text"
                value={item.source_page || ''}
                onChange={(e) => handleFormChange('source_page', e.target.value)}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
          </div>
          <div style={{ marginTop: '15px' }}>
            <button onClick={handleSaveEdit} style={{ padding: '10px 20px', marginRight: '10px', backgroundColor: '#336178', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Save
            </button>
            <button onClick={handleCancelEdit} style={{ padding: '10px 20px', backgroundColor: '#666', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Cancel
            </button>
          </div>
        </div>
      );
    }

    if (tab.id === 'news') {
      return (
        <div style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
          <h4>{editingIndex === data.length ? 'Add New' : 'Edit'} News</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
            <div>
              <label>Title:</label>
              <input
                type="text"
                value={item.title || ''}
                onChange={(e) => handleFormChange('title', e.target.value)}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
            <div>
              <label>Category:</label>
              <input
                type="text"
                value={item.category || ''}
                onChange={(e) => handleFormChange('category', e.target.value)}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
            <div>
              <label>Date:</label>
              <input
                type="date"
                value={item.date || ''}
                onChange={(e) => handleFormChange('date', e.target.value)}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
            <div>
              <label>Image URL:</label>
              <input
                type="text"
                value={item.image_url || ''}
                onChange={(e) => handleFormChange('image_url', e.target.value)}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label>Link:</label>
              <input
                type="text"
                value={item.link || ''}
                onChange={(e) => handleFormChange('link', e.target.value)}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label>Excerpt:</label>
              <textarea
                value={item.excerpt || ''}
                onChange={(e) => handleFormChange('excerpt', e.target.value)}
                style={{ width: '100%', padding: '8px', marginTop: '5px', minHeight: '80px' }}
              />
            </div>
          </div>
          <div style={{ marginTop: '15px' }}>
            <button onClick={handleSaveEdit} style={{ padding: '10px 20px', marginRight: '10px', backgroundColor: '#336178', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Save
            </button>
            <button onClick={handleCancelEdit} style={{ padding: '10px 20px', backgroundColor: '#666', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Cancel
            </button>
          </div>
        </div>
      );
    }

    if (tab.id === 'events') {
      return (
        <div style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
          <h4>{editingIndex === data.length ? 'Add New' : 'Edit'} Event</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
            <div>
              <label>Title:</label>
              <input
                type="text"
                value={item.title || ''}
                onChange={(e) => handleFormChange('title', e.target.value)}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
            <div>
              <label>Type:</label>
              <input
                type="text"
                value={item.type || ''}
                onChange={(e) => handleFormChange('type', e.target.value)}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
            <div>
              <label>Date:</label>
              <input
                type="date"
                value={item.date || ''}
                onChange={(e) => handleFormChange('date', e.target.value)}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
            <div>
              <label>Location:</label>
              <input
                type="text"
                value={item.location || ''}
                onChange={(e) => handleFormChange('location', e.target.value)}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
            <div>
              <label>Image URL:</label>
              <input
                type="text"
                value={item.image_url || ''}
                onChange={(e) => handleFormChange('image_url', e.target.value)}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
            <div>
              <label>Link:</label>
              <input
                type="text"
                value={item.link || ''}
                onChange={(e) => handleFormChange('link', e.target.value)}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
          </div>
          <div style={{ marginTop: '15px' }}>
            <button onClick={handleSaveEdit} style={{ padding: '10px 20px', marginRight: '10px', backgroundColor: '#336178', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Save
            </button>
            <button onClick={handleCancelEdit} style={{ padding: '10px 20px', backgroundColor: '#666', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Cancel
            </button>
          </div>
        </div>
      );
    }

    if (tab.id === 'programs') {
      return (
        <div style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
          <h4>{editingIndex === data.length ? 'Add New' : 'Edit'} Program</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
            <div>
              <label>Title:</label>
              <input
                type="text"
                value={item.title || ''}
                onChange={(e) => handleFormChange('title', e.target.value)}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
            <div>
              <label>School Label:</label>
              <input
                type="text"
                value={item.school_label || ''}
                onChange={(e) => handleFormChange('school_label', e.target.value)}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
            <div>
              <label>Level:</label>
              <input
                type="text"
                value={item.level || ''}
                onChange={(e) => handleFormChange('level', e.target.value)}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
            <div>
              <label>Link:</label>
              <input
                type="text"
                value={item.link || ''}
                onChange={(e) => handleFormChange('link', e.target.value)}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
          </div>
          <div style={{ marginTop: '15px' }}>
            <button onClick={handleSaveEdit} style={{ padding: '10px 20px', marginRight: '10px', backgroundColor: '#336178', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Save
            </button>
            <button onClick={handleCancelEdit} style={{ padding: '10px 20px', backgroundColor: '#666', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Cancel
            </button>
          </div>
        </div>
      );
    }

    if (tab.id === 'research') {
      return (
        <div style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
          <h4>{editingIndex === data.length ? 'Add New' : 'Edit'} Research</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
            <div>
              <label>Title:</label>
              <input
                type="text"
                value={item.title || ''}
                onChange={(e) => handleFormChange('title', e.target.value)}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
            <div>
              <label>Category:</label>
              <input
                type="text"
                value={item.category || ''}
                onChange={(e) => handleFormChange('category', e.target.value)}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
            <div>
              <label>Date:</label>
              <input
                type="date"
                value={item.date || ''}
                onChange={(e) => handleFormChange('date', e.target.value)}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
            <div>
              <label>Image URL:</label>
              <input
                type="text"
                value={item.image_url || ''}
                onChange={(e) => handleFormChange('image_url', e.target.value)}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label>Link:</label>
              <input
                type="text"
                value={item.link || ''}
                onChange={(e) => handleFormChange('link', e.target.value)}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label>Description:</label>
              <textarea
                value={item.description || ''}
                onChange={(e) => handleFormChange('description', e.target.value)}
                style={{ width: '100%', padding: '8px', marginTop: '5px', minHeight: '80px' }}
              />
            </div>
          </div>
          <div style={{ marginTop: '15px' }}>
            <button onClick={handleSaveEdit} style={{ padding: '10px 20px', marginRight: '10px', backgroundColor: '#336178', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Save
            </button>
            <button onClick={handleCancelEdit} style={{ padding: '10px 20px', backgroundColor: '#666', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Cancel
            </button>
          </div>
        </div>
      );
    }

    return null;
  };

  const renderTable = () => {
    if (loading) {
      return <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>;
    }

    if (data.length === 0) {
      return <div style={{ padding: '20px', textAlign: 'center' }}>No data available</div>;
    }

    const tab = tabs.find(t => t.id === activeTab);
    const keys = Object.keys(data[0] || {});

    return (
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#336178', color: 'white' }}>
              {keys.map(key => (
                <th key={key} style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>
                  {key}
                </th>
              ))}
              <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white' }}>
                {keys.map(key => (
                  <td key={key} style={{ padding: '10px', border: '1px solid #ddd', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {typeof item[key] === 'object' ? JSON.stringify(item[key]) : String(item[key] || '')}
                  </td>
                ))}
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  <button
                    onClick={() => handleEdit(index)}
                    style={{ padding: '5px 10px', marginRight: '5px', backgroundColor: '#336178', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    style={{ padding: '5px 10px', backgroundColor: '#ae485e', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '40px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', maxWidth: '400px', width: '100%' }}>
          <h1 style={{ marginBottom: '30px', color: '#336178', textAlign: 'center' }}>Admin Login</h1>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '16px' }}
                autoFocus
              />
            </div>
            {message.text && (
              <div style={{
                padding: '12px',
                marginBottom: '20px',
                borderRadius: '4px',
                backgroundColor: '#f8d7da',
                color: '#721c24',
                border: '1px solid #f5c6cb'
              }}>
                {message.text}
              </div>
            )}
            <button
              type="submit"
              style={{ width: '100%', padding: '12px', backgroundColor: '#336178', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '20px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', backgroundColor: 'white', borderRadius: '8px', padding: '30px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{ margin: 0, color: '#336178' }}>Admin Panel</h1>
          <button
            onClick={() => {
              setIsAuthenticated(false);
              setPassword('');
              setMessage({ type: '', text: '' });
            }}
            style={{ padding: '8px 16px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Logout
          </button>
        </div>
        
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setEditingIndex(null);
                setFormData({});
              }}
              style={{
                padding: '10px 20px',
                backgroundColor: activeTab === tab.id ? '#336178' : '#f0f0f0',
                color: activeTab === tab.id ? 'white' : '#333',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: activeTab === tab.id ? 'bold' : 'normal'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {message.text && (
          <div style={{
            padding: '15px',
            marginBottom: '20px',
            borderRadius: '4px',
            backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da',
            color: message.type === 'success' ? '#155724' : '#721c24',
            border: `1px solid ${message.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`
          }}>
            {message.text}
          </div>
        )}

        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
          <button
            onClick={handleAdd}
            style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Add New
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{ padding: '10px 20px', backgroundColor: saving ? '#ccc' : '#336178', color: 'white', border: 'none', borderRadius: '4px', cursor: saving ? 'not-allowed' : 'pointer' }}
          >
            {saving ? 'Saving...' : 'Save All Changes'}
          </button>
          <button
            onClick={loadData}
            style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Reload
          </button>
        </div>

        {renderForm()}
        {renderTable()}
      </div>
    </div>
  );
};

export default Admin;

