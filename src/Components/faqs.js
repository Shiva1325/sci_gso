import React, { useState } from 'react';
import ResourcesAccordion from './ResourcesAccordion';
import '../Styles/faqs.css';
import Transition from './Transition';

const FAQs = () => {
  const [expanded, setExpanded] = useState(null);

  const faqData = [
    { title: "Is SCI awesome?", description: "Absolutely!" },
    { title: "Is SCI awesome?", description: "Absolutely!" },
    { title: "Is SCI awesome?", description: "Absolutely!" },
    { title: "Is SCI awesome?", description: "Absolutely!" },
    { title: "Is SCI awesome?", description: "Absolutely!" },
    { title: "Is SCI awesome?", description: "Absolutely!" },
    { title: "Is SCI awesome?", description: "Absolutely!" },
    { title: "Is SCI awesome?", description: "Absolutely!" },
    { title: "Is SCI awesome?", description: "Absolutely!" },
    { title: "Is SCI awesome?", description: "Absolutely!" },
    { title: "Is SCI awesome?", description: "Absolutely!" },
    { title: "Is SCI awesome?", description: "Absolutely!" }
  ];

  const resourceLinks = [
    { heading: "Official SCI Website", url: "https://www.sci.pitt.edu/student-resources/z-student-resources" },
    { heading: "SCI Wiki", url: "https://www.sci.pitt.edu/student-resources/z-student-resources" },
    { heading: "A-Z student resources", url: "https://www.sci.pitt.edu/student-resources/z-student-resources" }
  ];

  const todoItems = [
    "Enroll in all required courses",
    "Purchase textbooks and supplies",
    "Set up a study schedule",
    "Organize living arrangements",
    "Attend orientation sessions"
  ];

  return (
    <div className="faqs-wrapper">
      <div className="todo-container">
        <h2>To-Do Before the Start of the Semester</h2>
        <ul>
          {todoItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="faqs-container">
        <h1>Resources</h1>
        {faqData.map((item, i) => (
          <ResourcesAccordion
            key={i}
            i={i}
            expanded={expanded}
            setExpanded={setExpanded}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
      <div className="card-container">
        <div className="card">
          <h2>Useful Links</h2>
          <ul>
            {resourceLinks.map((link, index) => (
              <li key={index}>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.heading}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Transition(FAQs);
