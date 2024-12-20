import React, { useState } from 'react';
import { Input, Textarea, Button, Spacer, Card } from '@nextui-org/react';
import feedimage from "../../assets/fonts/iranyekan/Images/feedback-image.jpg";

interface FeedbackFormData {
  name: string;
  email: string;
  feedback: string;
}

const FeedbackForm: React.FC = () => {
  const [formData, setFormData] = useState<FeedbackFormData>({
    name: '',
    email: '',
    feedback: ''
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    feedback: false
  });

  const [successMessage, setSuccessMessage] = useState('');

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false // Clear error on typing
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation logic
    const newErrors = {
      name: formData.name.trim() === '',
      email: formData.email.trim() === '',
      feedback: formData.feedback.trim() === ''
    };

    setErrors(newErrors);

    // Check if any field is empty
    if (newErrors.name || newErrors.email || newErrors.feedback) {
      return;
    }

    // Show success message
    setSuccessMessage('بازخورد شما ارسال شد');
    setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds

    // Clear form
    setFormData({ name: '', email: '', feedback: '' });
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        backgroundColor: '#f3f4f6',
        padding: '1rem'
      }}
    >
      <Card style={{ width: '100%', maxWidth: '600px', padding: '1.5rem', textAlign: 'center', marginTop: '2.5rem' }}>
        {/* Feedback Image */}
        <h3>فرم بازخورد</h3>
        <img
          src={feedimage} // Replace with the actual path of your feedback image
          alt="Feedback"
          style={{ width: '300', marginBottom: '1rem' }}
        />
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <Input
            fullWidth
            label="نام"
            placeholder="نام خود را وارد کنید"
            value={formData.name}
            onChange={handleInputChange}
            name="name"
            aria-label="نام"
            color={errors.name ? 'danger' : 'default'}
          />
          {errors.name && (
            <span style={{ color: 'red', fontSize: '0.8rem', textAlign: 'left', display: 'block' }}>
              پر کردن این فیلد اجباری است
            </span>
          )}
          <Spacer y={1} />

          {/* Email Field */}
          <Input
            fullWidth
            label="ایمیل"
            placeholder="ایمیل خود را وارد کنید"
            value={formData.email}
            onChange={handleInputChange}
            name="email"
            aria-label="ایمیل"
            color={errors.email ? 'danger' : 'default'}
          />
          {errors.email && (
            <span style={{ color: 'red', fontSize: '0.8rem', textAlign: 'left', display: 'block' }}>
              پر کردن این فیلد اجباری است
            </span>
          )}
          <Spacer y={1} />

          {/* Feedback Field */}
          <Textarea
            fullWidth
            label="بازخورد"
            placeholder="بازخورد خود را وارد کنید"
            value={formData.feedback}
            onChange={handleInputChange}
            name="feedback"
            aria-label="بازخورد"
            rows={4}
            color={errors.feedback ? 'danger' : 'default'}
          />
          {errors.feedback && (
            <span style={{ color: 'red', fontSize: '0.8rem', textAlign: 'left', display: 'block' }}>
              پر کردن این فیلد اجباری است
            </span>
          )}
          <Spacer y={1.5} />

          <Button type="submit" color="primary" fullWidth>
            ارسال
          </Button>
        </form>
      </Card>

      {/* Success Message Popup */}
      {successMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '1rem',
            left: '1rem',
            backgroundColor: '#4caf50',
            color: 'white',
            padding: '0.75rem 1.25rem',
            borderRadius: '5px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
            zIndex: 1000
          }}
        >
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;
