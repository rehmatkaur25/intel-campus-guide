
// Validation functions for our form inputs

// Validate faculty/student ID format (YEAR BRANCH SIX DIGITS)
export const validateRegistrationNumber = (regNo: string): boolean => {
  // Format: YYBRANCH######, e.g., 23bai10979
  const regex = /^\d{2}[a-zA-Z]{3}\d{5,6}$/;
  return regex.test(regNo);
};

// Basic email validation
export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Basic phone number validation (at least 10 digits)
export const validatePhone = (phone: string): boolean => {
  const regex = /^\d{10,15}$/;
  return regex.test(phone);
};

// Validate that name is not empty and has reasonable length
export const validateName = (name: string): boolean => {
  return name.trim().length > 0 && name.trim().length <= 100;
};
