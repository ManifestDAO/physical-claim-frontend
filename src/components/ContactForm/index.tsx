import React from "react";
import "./index.css";
interface ContactFormProps {
  setShowContactForm: any;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  setShowContactForm,
}) => {
  return (
    <div>
      <div
        className="contact-form-exist-x"
        onClick={() => setShowContactForm(false)}
      >
        X
      </div>
      <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSeMZlbU5LhOxa4CXfeRAYSyhWvYuSLXgfuGfqNAsrsXqvU1jA/viewform?embedded=true">
        Loading…
      </iframe>
    </div>
  );
};
