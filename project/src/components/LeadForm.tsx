import React, { useReducer, useEffect } from 'react';
import { CheckCircle, Loader2, AlertCircle, Send } from 'lucide-react';
import InputField from './InputField';
import SelectField from './SelectField';
import TextareaField from './TextareaField';
import { FormState, FormAction, BusinessType, ServiceNeeded } from '../types/form';
import { validateForm } from '../utils/validation';
import { submitForm } from '../services/formSubmit';

const initialState: FormState = {
  data: {
    name: '',
    email: '',
    businessType: '' as BusinessType,
    serviceNeeded: '' as ServiceNeeded,
    message: '',
  },
  errors: {},
  isSubmitting: false,
  isSubmitted: false,
  hasError: false,
  personalizedResponse: '',
};

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        data: {
          ...state.data,
          [action.field]: action.value,
        },
        errors: {
          ...state.errors,
          [action.field]: undefined,
        },
      };
    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.errors,
      };
    case 'SUBMIT_START':
      return {
        ...state,
        isSubmitting: true,
        hasError: false,
      };
    case 'SUBMIT_SUCCESS':
      return {
        ...state,
        isSubmitting: false,
        isSubmitted: true,
        personalizedResponse: action.personalizedResponse || '',
      };
    case 'SUBMIT_ERROR':
      return {
        ...state,
        isSubmitting: false,
        hasError: true,
      };
    default:
      return state;
  }
};

const businessTypeOptions = [
  { value: 'startup', label: 'Startup' },
  { value: 'small', label: 'Small Business' },
  { value: 'medium', label: 'Medium Business' },
  { value: 'enterprise', label: 'Enterprise' },
  { value: 'other', label: 'Other' },
];

const serviceOptions = [
  { value: 'consulting', label: 'Consulting' },
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'other', label: 'Other' },
];

const LeadForm: React.FC = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const { data, errors, isSubmitting, isSubmitted, hasError, personalizedResponse } = state;

  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        // If we wanted to reset the form, we could do it here
        // For now, we'll keep the success state
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isSubmitted]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    dispatch({
      type: 'UPDATE_FIELD',
      field: name as keyof typeof data,
      value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formErrors = validateForm(data);
    dispatch({ type: 'SET_ERRORS', errors: formErrors });

    if (Object.keys(formErrors).length > 0) {
      return;
    }

    dispatch({ type: 'SUBMIT_START' });

    try {
      const result = await submitForm(data);

      if (result.success) {
        dispatch({ type: 'SUBMIT_SUCCESS', personalizedResponse: result.personalizedResponse });
      } else {
        dispatch({ type: 'SUBMIT_ERROR' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      dispatch({ type: 'SUBMIT_ERROR' });
    }
  };

  if (isSubmitted) {
    return (
      <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md animate-fadeIn">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h2>
          <p className="text-gray-600 mb-4">
            We've received your information and here is a personalized response.
          </p>
          <p className="text-gray-700 mb-4">
             {personalizedResponse}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
          >
            Submit Another Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form 
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md animate-fadeIn"
      noValidate
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Get in Touch</h2>
        <p className="text-gray-600">
          Fill out the form below and we'll send you a personalized response.
        </p>
      </div>

      <InputField
        id="name"
        name="name"
        label="Your Name"
        value={data.name}
        error={errors.name}
        onChange={handleChange}
        required
      />

      <InputField
        id="email"
        name="email"
        label="Email Address"
        type="email"
        value={data.email}
        error={errors.email}
        onChange={handleChange}
        required
      />

      <SelectField
        id="businessType"
        name="businessType"
        label="Business Type"
        value={data.businessType}
        options={businessTypeOptions}
        error={errors.businessType}
        onChange={handleChange}
        required
      />

      <SelectField
        id="serviceNeeded"
        name="serviceNeeded"
        label="Service Needed"
        value={data.serviceNeeded}
        options={serviceOptions}
        error={errors.serviceNeeded}
        onChange={handleChange}
        required
      />

      <TextareaField
        id="message"
        name="message"
        label="Additional Information"
        value={data.message || ''}
        onChange={handleChange}
        placeholder="Tell us more about your project or requirements..."
      />

      {hasError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center">
          <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
          <p className="text-sm text-red-600">
            There was an error submitting your form. Please try again.
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-2 px-4 rounded-md font-medium flex items-center justify-center transition-all duration-200 ${
          isSubmitting
            ? 'bg-blue-400 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600'
        } text-white`}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="w-5 h-5 mr-2" />
            Submit
          </>
        )}
      </button>
    </form>
  );
};

export default LeadForm;