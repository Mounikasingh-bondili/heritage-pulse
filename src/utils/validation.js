export const validateRegistration = (formData) => {
  const errors = {};

  if (!formData.name || formData.name.trim() === '') {
    errors.name = 'Full name is required';
  }

  if (!formData.email) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!formData.mobile) {
    errors.mobile = 'Mobile number is required';
  } else if (!/^\d{10}$/.test(formData.mobile)) {
    errors.mobile = 'Mobile number must be exactly 10 digits';
  }

  if (!formData.participants || formData.participants < 1) {
    errors.participants = 'Minimum 1 participant required';
  }

  return errors;
};

export const generateRegistrationId = () => {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  const timestamp = Date.now().toString().slice(-4);
  return `HTP-EVT-${year}-${timestamp}${random}`;
};

export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isValidMobile = (mobile) => {
  return /^\d{10}$/.test(mobile);
};