import { LeadFormData, FormErrors } from '../types/form';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateForm = (data: LeadFormData): FormErrors => {
  const errors: FormErrors = {};

  if (!data.name.trim()) {
    errors.name = 'Name is required';
  } else if (data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!data.businessType || data.businessType === '') {
    errors.businessType = 'Please select your business type';
  }

  if (!data.serviceNeeded || data.serviceNeeded === '') {
    errors.serviceNeeded = 'Please select a service';
  }

  return errors;
};