import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import "../styles/FAQAccordion.css";

const faqs = [
  { question: "Is PixQR free to use?", answer: "Yes, PixQR offers a free tier with essential QR code generation features like URL and Text QR." },
  { question: "Can I add my logo inside the QR code?", answer: "Absolutely! Our premium plan allows you to upload your logo and brand the QR design." },
  { question: "What formats are supported for download?", answer: "Currently, PNG format is supported. More formats are coming soon!" },
  { question: "Is my data secure?", answer: "Yes, all data is processed locally in your browser. We don’t store or track your input." },
  { question: "Can I generate QR codes for phone, email, or Wi-Fi?", answer: "Yes, these are available in our premium plan." },
  { question: "Do I need to sign up to generate a QR?", answer: "No signup required for free features. Signup enables saving history, premium upgrades, and leaderboard features." },
  { question: "Can I use PixQR on mobile?", answer: "Yes! PixQR is fully responsive and mobile-friendly." },
];

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="faq-section frosted-glass">
      <h2 className="faq-heading">Frequently Asked Questions</h2>
      {faqs.map((item, idx) => (
        <div className="faq-item" key={idx}>
          <div
            className="faq-question"
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
          >
            {item.question}
            <FaChevronDown className={`faq-icon ${openIndex === idx ? "rotate" : ""}`} />
          </div>
          {openIndex === idx && <div className="faq-answer">{item.answer}</div>}
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;
