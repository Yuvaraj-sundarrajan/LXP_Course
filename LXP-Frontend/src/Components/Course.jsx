import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { GiCancel } from "react-icons/gi";
import { Button, Modal } from 'react-bootstrap';
import '../Styles/AddCourse.css';

const CourseForm = () => {
  const [files, setFiles] = useState([]);
  const [form, setForm] = useState({
    title: '',
    category: '',
    level: '',
    duration: '',
    description: ''
  });
  const [errors, setErrors] = useState({});
  const [selectedOption, setSelectedOption] = useState('');
  const [show, setShow] = useState(false);
 
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    if (event.target.value === 'Add catagory') {
      handleShow();
    }
    if (event.target.value) {
      setErrors({ ...errors, category: null });
    }
  };
 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length > 1) {
      alert("You can only upload one file");
      return;
    }

    const file = acceptedFiles[0];
    const fileType = file.type;
    const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    if (!validImageTypes.includes(fileType)) {
      alert("Invalid file type. The accepted file types are .jpg, .png, .jpeg");
      return;
    }

    if (file.size > 250000) {
      alert("File size exceeds the limit of 250KB");
      return;
    }

    setFiles([file]);
    setErrors({ ...errors, thumbnail: null });
  }, [errors]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/*', multiple: false });

  const removeFile = file => () => {
    setFiles([]);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
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

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } 

      // Check if files array is empty
  if (files.length === 0) {
    newErrors['thumbnail'] = 'Field required';
  }
    
    
    else {
      // Submit the form
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
              <select  value={selectedOption} onChange={handleChange} >
<option  disabled='Category' value="">Select catagory</option>
<option value="Technical">Technical</option>
<option value="communication">Communication</option>
<option value="Behavioural">Behavioural</option>
<option value="Add catagory" id='Add-catagory'>+ Add Catagory</option>
</select>
              {errors.category && <p className="error">{errors.category}</p>}
            </label>
            <label>
              Course Level:
              <select name="level"  value={selectedOption} onChange={handleInputChange}>
              <option disabled='Category' value="">Select Level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
              {errors.level && <p className="error">{errors.level}</p>}
            </label>
            <label>
              Course Duration (in Days):
              <input type="number" placeholder='Enter no. of days' name="duration" onChange={handleInputChange} />
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
      <GiCancel onClick={removeFile(files[0])} className="cancel-icon" />
    </div>
    
  ) : (
    isDragActive ? "Drop files here..." : <span>Drag & Drop files here or <span className="upload-link">Click to upload</span></span>
  )}
  
</div>
<div className="file-name">{files.length > 0 && files[0].path}</div>

{errors.thumbnail && <p className="error">{errors.thumbnail}</p>}


<Modal show={show} onHide={handleClose}>
<Modal.Header closeButton>
<Modal.Title>Modal heading</Modal.Title>
</Modal.Header>
<Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
<Modal.Footer>
<Button variant="secondary" onClick={handleClose}>
            Close
</Button>
<Button variant="primary" onClick={handleClose}>
            Save Changes
</Button>
</Modal.Footer>
</Modal>
            <input type="submit" value="CREATE COURSE"  />
          </div>
        </form>
      </div>
    </>
  );
}

export default CourseForm;
