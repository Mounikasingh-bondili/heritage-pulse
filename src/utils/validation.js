export const validateRegistration = (formData) => {
  const errors = {};

  if (!formData.name.trim()) {
    errors.name = 'Name is required';
  }

  if (!formData.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = 'Email is invalid';
  }

  if (!formData.mobile) {
    errors.mobile = 'Mobile number is required';
  } else if (!/^\d{10}$/.test(formData.mobile)) {
    errors.mobile = 'Mobile number must be 10 digits';
  }

  if (!formData.participants || formData.participants < 1) {
    errors.participants = 'Minimum 1 participant required';
  }

  return errors;
};

export const generateRegistrationId = () => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `HTP-EVT-${timestamp}-${random}`;
};