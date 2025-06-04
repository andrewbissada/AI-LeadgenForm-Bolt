export type BusinessType = 'startup' | 'small' | 'medium' | 'enterprise' | 'other';

export type ServiceNeeded = 'consulting' | 'development' | 'design' | 'marketing' | 'other';

export interface LeadFormData {
  name: string;
  email: string;
  businessType: BusinessType;
  serviceNeeded: ServiceNeeded;
  message?: string;
}

export type FormErrors = Partial<Record<keyof LeadFormData, string>>;

export interface FormState {
  data: LeadFormData;
  errors: FormErrors;
  isSubmitting: boolean;
  isSubmitted: boolean;
  hasError: boolean;
}

export type FormAction = 
  | { type: 'UPDATE_FIELD'; field: keyof LeadFormData; value: string }
  | { type: 'SET_ERRORS'; errors: FormErrors }
  | { type: 'SUBMIT_START' }
  | { type: 'SUBMIT_SUCCESS' }
  | { type: 'SUBMIT_ERROR' };