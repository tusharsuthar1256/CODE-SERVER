import React, { useEffect, useState } from 'react';
import './Card.css'; // Ensure your CSS file is correctly set up
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Import icons
import { databases } from '../../Appwrite/cofig'; // Make sure the path is correct
import Prism from 'prismjs';
import 'prismjs/components/prism-java'; // Import Java language support
import 'prismjs/themes/prism.css'; // Optional: Prism theme (if needed)
import 'prismjs/themes/prism-okaidia.css'; // Import dark theme

const Accordion = () => {
  const [posts, setPosts] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await databases.listDocuments(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_COLLECTION_ID
        );
        setPosts(response.documents);
      } catch (error) {
        console.log('Error fetching documents:', error);
      }
    };
    fetchData();
  }, [posts]);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="accordion-container">
      {posts.map((item, index) => {
        // Highlight code using Java language
        const highlightedCode = Prism.highlight(item.codes, Prism.languages.java, 'java');

        return (
          <div
            key={index}
            className={`accordion-item ${activeIndex === index ? 'expanded' : ''}`}
            onClick={() => handleToggle(index)}
          >
            <div className="accordion-header">
              <div className="accordion-trigger">{item.title}</div>
              <div className='right-side'>
                <div className='author-name'>- {item.authorName}</div>
                <div className="accordion-icon">
                  {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              </div>
            </div>
            <div className={`accordion-content ${activeIndex === index ? 'visible' : ''}`}>
              <pre>
                <code className="language-java" dangerouslySetInnerHTML={{ __html: highlightedCode }} />
              </pre>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
