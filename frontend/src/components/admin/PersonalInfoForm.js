import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaSave, FaUpload, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { usePortfolio } from '../../context/PortfolioContext';
import './AdminForms.css';

const PersonalInfoForm = () => {
  const { portfolio, updatePortfolio } = usePortfolio();
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    bio: '',
    email: '',
    phone: '',
    location: '',
    profileImage: '',
    resume: '',
    socialLinks: {
      github: '',
      linkedin: '',
      twitter: '',
      instagram: ''
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [uploadNotice, setUploadNotice] = useState('');

  useEffect(() => {
    if (portfolio?.personalInfo) {
      setFormData({
        name: portfolio.personalInfo.name || '',
        title: portfolio.personalInfo.title || '',
        bio: portfolio.personalInfo.bio || '',
        email: portfolio.personalInfo.email || '',
        phone: portfolio.personalInfo.phone || '',
        location: portfolio.personalInfo.location || '',
        profileImage: portfolio.personalInfo.profileImage || '',
        resume: portfolio.personalInfo.resume || '',
        socialLinks: {
          github: portfolio.socialLinks?.github || '',
          linkedin: portfolio.socialLinks?.linkedin || '',
          twitter: portfolio.socialLinks?.twitter || '',
          instagram: portfolio.socialLinks?.instagram || ''
        }
      });
    }
  }, [portfolio]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('socialLinks.')) {
      const socialKey = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [socialKey]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const portfolioData = {
        personalInfo: {
          name: formData.name,
          title: formData.title,
          bio: formData.bio,
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
          profileImage: formData.profileImage,
          resume: formData.resume
        },
        socialLinks: formData.socialLinks
      };

      await updatePortfolio(portfolioData);
    } catch (error) {
      console.error('Error updating personal info:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const uploadFile = async (file) => {
    const data = new FormData();
    data.append('file', file);
    const res = await axios.post('/api/upload', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return {
      path: res?.data?.path || res?.data?.url || '',
      name: res?.data?.originalName || file.name
    };
  };

  const handleImageUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      try {
        setUploadingImage(true);
        const { path, name } = await uploadFile(file);
        if (path) {
          setFormData(prev => ({ ...prev, profileImage: path, profileImageName: name }));
          setUploadNotice('Profile image uploaded successfully');
          setTimeout(() => setUploadNotice(''), 2500);
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Image upload failed', err);
      } finally {
        setUploadingImage(false);
      }
    };
    input.click();
  };

  const handleResumeUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/pdf';
    input.onchange = async (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      try {
        setUploadingResume(true);
        const { path, name } = await uploadFile(file);
        if (path) {
          setFormData(prev => ({ ...prev, resume: path, resumeName: name }));
          setUploadNotice('Resume uploaded successfully');
          setTimeout(() => setUploadNotice(''), 2500);
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Resume upload failed', err);
      } finally {
        setUploadingResume(false);
      }
    };
    input.click();
  };

  return (
    <motion.div 
      className="admin-form"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="form-header">
        <h4>Personal Information</h4>
        <p>Update your personal details and social links</p>
      </div>

      <form onSubmit={handleSubmit} className="form-content">
        <div className="form-section">
          <h5>Basic Information</h5>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">
                <FaUser /> Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your full name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="title">
                <FaUser /> Professional Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="e.g., Full Stack Developer"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="bio">
              <FaUser /> Bio *
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              required
              rows="4"
              placeholder="Tell us about yourself..."
            />
          </div>
        </div>

        <div className="form-section">
          <h5>Contact Information</h5>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">
                <FaEnvelope /> Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">
                <FaPhone /> Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="location">
              <FaMapMarkerAlt /> Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="City, Country"
            />
          </div>
        </div>

        <div className="form-section">
          <h5>Media Upload</h5>
          <div className="form-row">
            <div className="form-group">
              <label>
                <FaUpload /> Upload Profile Image
              </label>
              <button type="button" className="btn btn-secondary" onClick={handleImageUpload} disabled={uploadingImage}>
                <FaUpload /> {uploadingImage ? 'Uploading...' : 'Upload Image'}
              </button>
              {formData.profileImage && (
                <div className="upload-item">{formData.profileImageName || formData.profileImage.split('/').pop()}</div>
              )}
            </div>

            <div className="form-group">
              <label>
                <FaUpload /> Upload Resume (PDF)
              </label>
              <button type="button" className="btn btn-secondary" onClick={handleResumeUpload} disabled={uploadingResume}>
                <FaUpload /> {uploadingResume ? 'Uploading...' : 'Upload Resume'}
              </button>
              {formData.resume && (
                <div className="upload-item">{formData.resumeName || formData.resume.split('/').pop()}</div>
              )}
            </div>
          </div>
          {uploadNotice && (
            <div className="upload-notice">{uploadNotice}</div>
          )}
        </div>

        <div className="form-section">
          <h5>Social Links</h5>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="github">GitHub</label>
              <input
                type="url"
                id="github"
                name="socialLinks.github"
                value={formData.socialLinks.github}
                onChange={handleChange}
                placeholder="https://github.com/username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="linkedin">LinkedIn</label>
              <input
                type="url"
                id="linkedin"
                name="socialLinks.linkedin"
                value={formData.socialLinks.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/username"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="twitter">Twitter</label>
              <input
                type="url"
                id="twitter"
                name="socialLinks.twitter"
                value={formData.socialLinks.twitter}
                onChange={handleChange}
                placeholder="https://twitter.com/username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="instagram">Instagram</label>
              <input
                type="url"
                id="instagram"
                name="socialLinks.instagram"
                value={formData.socialLinks.instagram}
                onChange={handleChange}
                placeholder="https://instagram.com/username"
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="spinner"></div>
                Saving...
              </>
            ) : (
              <>
                <FaSave />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default PersonalInfoForm;
