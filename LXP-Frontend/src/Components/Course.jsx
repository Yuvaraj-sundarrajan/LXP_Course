import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { GiCancel } from "react-icons/gi";
import { Button, Modal } from 'react-bootstrap';
import '../Styles/AddCourse.css';

const CourseForm = () => {
  const [files, setFiles] = useState([]); // State for managing uploaded files
  const [form, setForm] = useState({
    title: '',
    category: '',
    level: '',
    duration: '',
    description: ''
  });
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const [level, setLevel] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    
    if (name === 'duration') {
    // Validate positive number for duration field
    if (parseInt(value) <= 0) {
    setErrors({ ...errors, [name]: 'Duration must be a positive number' });
    } else {
    setErrors({ ...errors, [name]: null });
    }
    } else {
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: null });
    
    if (name === 'category' || name === 'level') {
    // Handle category or level change
    // You can add additional logic here based on the selected category or level
    console.log(`Selected ${name}: ${value}`);
    }
    // Handle 'Add Category' click
if (value === 'Add catagory') {
  handleShow(); // Show the modal
  }
    }
    };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onDrop = useCallback(acceptedFiles => {
    // File validation logic
    const file = acceptedFiles[0];
    setFiles([file]);
    setErrors({ ...errors, thumbnail: null });
  }, [errors]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/*', multiple: false });

  const removeFile = () => {
    setFiles([]);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
    if (value < 0) return;

    setForm({ ...form, [name]: value });
    if (!value) {
      setErrors({ ...errors, [name]: `${name} is required` });
    } else {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const newErrors = {};
    Object.keys(form).forEach((key) => {
    if (!form[key]) {
    newErrors[key] = `Field required`;
    }
    });
    
    if (files.length === 0) {
    newErrors['thumbnail'] = 'Field required';
    }
    
    if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    } else {
    // Submit the form
    console.log('Form submitted:', form);
    }
    };

  return (
    <>
      <h2>Course Creation</h2>
      <hr/>
      <div className="course-form"> 
        <form onSubmit={handleSubmit}>
          <div className='addcourse'>
          <label>
              Course Title:
              <input type="text" name="title" placeholder='Course title' onChange={handleInputChange} />
              {errors.title && <p className="error">{errors.title}</p>}
            </label>
            <label>
              Course Category:
              <select name="category" value={form.category} onChange={handleChange}>
                <option disabled value="">Select category</option>
                <option value="Technical">Technical</option>
                <option value="communication">Communication</option>
                <option value="Behavioural">Behavioural</option>
                <option value="Add catagory"  id='Add-catagory'>+ Add Category</option>
              </select>
              {errors.category && <p className="error">{errors.category}</p>}
            </label>
            <label>
              Course Level:
              <select name="level" value={form.level} onChange={handleChange}>
                <option disabled value="">Select Level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
              {errors.level && <p className="error">{errors.level}</p>}
            </label>
            <label>
              Course Duration (in Days):
              <input type="number" min={0} placeholder='Enter no. of days' name="duration" onChange={handleInputChange} />
              {errors.duration && <p className="error">{errors.duration}</p>}
            </label>
            <label>
              Course Description:
              <textarea placeholder='Enter your description' name="description" onChange={handleInputChange}></textarea>
              {errors.description && <p className="error">{errors.description}</p>}
            </label>
            <label htmlFor=""> Course Thumbnail:</label>
            <div {...getRootProps()} className="course-thumbnail">
              <input {...getInputProps()} />
              {files.length > 0 ? (
                <div className="uploaded-file">
                  <img src={URL.createObjectURL(files[0])} alt="uploaded thumbnail" className="thumbnail-image" />
                  <GiCancel onClick={removeFile} className="cancel-icon" />
                </div>
              ) : (
                isDragActive ? "Drop files here..." : <span>Drag & Drop files here or <span className="upload-link">Click to upload</span></span>
              )}
            </div>
            <div className="file-name">{files.length > 0 && files[0].name}</div>
            {errors.thumbnail && <p className="error">{errors.thumbnail}</p>}

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add Category</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <Modal.Body>

            
  <input 
    type="text" 
    placeholder="Enter new category" 
    value={form.category} 
    onChange={handleInputChange}
    name="category"
  />
</Modal.Body>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
            <input type="submit" value="CREATE COURSE" />
          </div>
        </form>
      </div>
    </>
  );
}

export default CourseForm;
