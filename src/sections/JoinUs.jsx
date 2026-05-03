import { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import { useToast } from '../components/Toast';
import { EXPERIENCE_LEVELS, CITIES, PHOTOWALK_MONTHS } from '../data/constants';
import './JoinUs.css';

const INITIAL_FORM = {
  name: '',
  email: '',
  phone: '',
  city: '',
  experience: '',
  preferredMonth: '',
};

const validators = {
  name: (v) => {
    if (!v.trim()) return 'Name is required.';
    if (v.trim().length < 2) return 'Name must be at least 2 characters.';
    return '';
  },
  email: (v) => {
    if (!v.trim()) return 'Email is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Please enter a valid email.';
    return '';
  },
  phone: (v) => {
    if (!v.trim()) return 'Phone number is required.';
    if (!/^[\d\s\-+()]{8,15}$/.test(v)) return 'Please enter a valid phone number.';
    return '';
  },
  city: (v) => (!v ? 'Please select your city.' : ''),
  experience: (v) => (!v ? 'Please select your experience level.' : ''),
  preferredMonth: (v) => (!v ? 'Please select a preferred month.' : ''),
};

export default function JoinUs() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { addToast } = useToast();

  const updateField = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (touched[field]) {
      setErrors(prev => ({ ...prev, [field]: validators[field](value) }));
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    setErrors(prev => ({ ...prev, [field]: validators[field](form[field]) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    let hasError = false;
    Object.keys(validators).forEach(field => {
      const error = validators[field](form[field]);
      newErrors[field] = error;
      if (error) hasError = true;
    });

    setErrors(newErrors);
    setTouched(Object.keys(validators).reduce((acc, k) => ({ ...acc, [k]: true }), {}));

    if (hasError) {
      addToast('Please fix the errors in the form.', 'error');
      return;
    }

    setSubmitting(true);
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubmitting(false);
    setSubmitted(true);
    addToast('Registration submitted successfully! 🎉', 'success');
  };

  const resetForm = () => {
    setForm(INITIAL_FORM);
    setErrors({});
    setTouched({});
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <section className="join section" id="join">
        <div className="container">
          <div className="join__success">
            <div className="join__success-icon">🎉</div>
            <h3 className="join__success-title">You're In!</h3>
            <p className="join__success-text">
              Welcome to the SPW community, <strong>{form.name}</strong>! We'll send details 
              about the next photowalk to <strong>{form.email}</strong>.
            </p>
            <p className="join__success-sub">
              Get your camera ready — the streets are waiting.
            </p>
            <button className="btn btn-secondary" onClick={resetForm}>
              Register Another Person
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="join section" id="join">
      <div className="container">
        <SectionHeader
          title="Join the Walk"
          subtitle="Ready to explore the streets with us? Fill in your details and we'll get you on the next photowalk roster."
        />

        <form className="join__form" onSubmit={handleSubmit} noValidate id="join-form">
          <div className="join__form-grid">
            {/* Name */}
            <div className="form-group">
              <label className="form-label" htmlFor="join-name">Full Name *</label>
              <input
                type="text"
                id="join-name"
                className={`form-input ${errors.name && touched.name ? 'error' : ''}`}
                placeholder="Your full name"
                value={form.name}
                onChange={e => updateField('name', e.target.value)}
                onBlur={() => handleBlur('name')}
              />
              {errors.name && touched.name && (
                <span className="form-error">{errors.name}</span>
              )}
            </div>

            {/* Email */}
            <div className="form-group">
              <label className="form-label" htmlFor="join-email">Email Address *</label>
              <input
                type="email"
                id="join-email"
                className={`form-input ${errors.email && touched.email ? 'error' : ''}`}
                placeholder="you@example.com"
                value={form.email}
                onChange={e => updateField('email', e.target.value)}
                onBlur={() => handleBlur('email')}
              />
              {errors.email && touched.email && (
                <span className="form-error">{errors.email}</span>
              )}
            </div>

            {/* Phone */}
            <div className="form-group">
              <label className="form-label" htmlFor="join-phone">Phone Number *</label>
              <input
                type="tel"
                id="join-phone"
                className={`form-input ${errors.phone && touched.phone ? 'error' : ''}`}
                placeholder="+91 98765 43210"
                value={form.phone}
                onChange={e => updateField('phone', e.target.value)}
                onBlur={() => handleBlur('phone')}
              />
              {errors.phone && touched.phone && (
                <span className="form-error">{errors.phone}</span>
              )}
            </div>

            {/* City */}
            <div className="form-group">
              <label className="form-label" htmlFor="join-city">City *</label>
              <select
                id="join-city"
                className={`form-select ${errors.city && touched.city ? 'error' : ''}`}
                value={form.city}
                onChange={e => updateField('city', e.target.value)}
                onBlur={() => handleBlur('city')}
              >
                <option value="">Select your city</option>
                {CITIES.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              {errors.city && touched.city && (
                <span className="form-error">{errors.city}</span>
              )}
            </div>

            {/* Experience */}
            <div className="form-group">
              <label className="form-label" htmlFor="join-experience">Experience Level *</label>
              <select
                id="join-experience"
                className={`form-select ${errors.experience && touched.experience ? 'error' : ''}`}
                value={form.experience}
                onChange={e => updateField('experience', e.target.value)}
                onBlur={() => handleBlur('experience')}
              >
                <option value="">Select your level</option>
                {EXPERIENCE_LEVELS.map(level => (
                  <option key={level.value} value={level.value}>{level.label}</option>
                ))}
              </select>
              {errors.experience && touched.experience && (
                <span className="form-error">{errors.experience}</span>
              )}
            </div>

            {/* Preferred Month */}
            <div className="form-group">
              <label className="form-label" htmlFor="join-month">Preferred Month *</label>
              <select
                id="join-month"
                className={`form-select ${errors.preferredMonth && touched.preferredMonth ? 'error' : ''}`}
                value={form.preferredMonth}
                onChange={e => updateField('preferredMonth', e.target.value)}
                onBlur={() => handleBlur('preferredMonth')}
              >
                <option value="">Select a month</option>
                {PHOTOWALK_MONTHS.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
              {errors.preferredMonth && touched.preferredMonth && (
                <span className="form-error">{errors.preferredMonth}</span>
              )}
            </div>
          </div>

          <div className="join__form-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
              id="join-submit-btn"
            >
              {submitting ? (
                <>
                  <span className="join__spinner" />
                  Submitting...
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <line x1="20" y1="8" x2="20" y2="14" />
                    <line x1="23" y1="11" x2="17" y2="11" />
                  </svg>
                  Register for Photowalk
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
