import { LeadFormData } from '../types/form';

const FORM_SUBMIT_ENDPOINT = 'https://formsubmit.co/your-email@example.com'; // Replace with your actual email address

export const generateAIResponse = (data: LeadFormData): string => {
  // In a real implementation, this would call an AI API
  // For this demo, we'll generate a template-based response
  
  const greeting = `Dear ${data.name},`;
  
  let businessTypeResponse = '';
  switch(data.businessType) {
    case 'startup':
      businessTypeResponse = "As a startup, we understand you need agile solutions that can scale with your rapid growth.";
      break;
    case 'small':
      businessTypeResponse = "For small businesses like yours, we offer tailored solutions that maximize impact while being cost-effective.";
      break;
    case 'medium':
      businessTypeResponse = "Medium-sized businesses like yours can benefit from our enterprise-grade solutions designed to optimize operations.";
      break;
    case 'enterprise':
      businessTypeResponse = "We have extensive experience working with enterprise organizations to deliver robust, scalable solutions.";
      break;
    default:
      businessTypeResponse = "We're excited to learn more about your unique business needs.";
  }
  
  let serviceResponse = '';
  switch(data.serviceNeeded) {
    case 'consulting':
      serviceResponse = "Our consulting team has helped businesses like yours achieve an average of 30% improvement in operational efficiency.";
      break;
    case 'development':
      serviceResponse = "Our development team specializes in creating custom solutions that perfectly align with your business requirements.";
      break;
    case 'design':
      serviceResponse = "Our award-winning design team can help transform your brand and create engaging user experiences.";
      break;
    case 'marketing':
      serviceResponse = "Our marketing strategies have helped clients achieve up to 40% increase in qualified leads within the first 3 months.";
      break;
    default:
      serviceResponse = "We offer a wide range of services and would love to discuss how we can meet your specific needs.";
  }
  
  const closing = `
I'd like to schedule a brief call to discuss your requirements in more detail. Would you have 15 minutes available this week?

Thank you for considering our services.

Best regards,
The Team`;

  return `${greeting}

Thank you for reaching out to us. We're excited about the opportunity to work with you.

${businessTypeResponse}

${serviceResponse}

${closing}`;
};

export const submitForm = async (data: LeadFormData): Promise<{ success: boolean; message: string }> => {
  try {
    // Generate AI response
    const personalizedResponse = generateAIResponse(data);
    
    // Create form data for submission
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('businessType', data.businessType);
    formData.append('serviceNeeded', data.serviceNeeded);
    if (data.message) {
      formData.append('message', data.message);
    }
    
    // Add the personalized response as a hidden field
    formData.append('_template', personalizedResponse);
    
    // Add FormSubmit configuration
    formData.append('_subject', `New Lead: ${data.name} from ${data.businessType} business`);
    formData.append('_autoresponse', personalizedResponse);
    
    // Submit the form data to FormSubmit.co
    const response = await fetch(FORM_SUBMIT_ENDPOINT, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Form submission failed');
    }
    
    return {
      success: true,
      message: 'Thank you for your submission! We\'ve sent you a personalized response.',
      personalizedResponse
    };
  } catch (error) {
    console.error('Form submission error:', error);
    return {
      success: false,
      message: 'There was an error submitting your form. Please try again.'
    };
  }
};