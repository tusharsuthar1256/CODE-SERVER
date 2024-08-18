import React, { useState } from "react";
import "./CreateForm.css";
import { RiH1 } from "react-icons/ri";
import { databases } from "../../Appwrite/cofig";
import { ID } from "appwrite";

function CreateForm() {
  const [active, setActive] = useState(false);

  const toggleForm = () => {
    setActive((prev) => !prev);
  };

  const [formData, setFormData] = useState({
    title: "",
    code: "",
    authorName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
try {
     await databases.createDocument(import.meta.env.VITE_APPWRITE_DATABASE_ID, import.meta.env.VITE_APPWRITE_COLLECTION_ID, ID.unique(), {
          title: formData.title,
          codes: formData.code,
          authorName: formData.authorName,
        });
        setFormData({ title: '', code: '', authorName: '' });
} catch (error) {
     console.log(error);
     
}
  };

  const closeForm =() => {
     if ([formData.title,formData.code].some(field => field.trim() == '')) {
          alert("Please fill out your input fields")
     }else{
          setTimeout(() => {
               
               setActive((prev) => !prev)
          }, 800);
     }
  }
  return (
    <>
      <button className="formButton" onClick={toggleForm}>
        Create
      </button>
      {active ? (
        <main>
          <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
              <h2>Submit Your Post</h2>
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="code">Code:</label>
                <textarea
                  id="code"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="authorName">Author Name(optional):</label>
                <input
                  type="text"
                  id="authorName"
                  name="authorName"
                  value={formData.authorName}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" onClick={closeForm} className="submit-button">
                Submit
              </button>
            </form>
          </div>
        </main>
      ) : null}
    </>
  );
}

export default CreateForm;
