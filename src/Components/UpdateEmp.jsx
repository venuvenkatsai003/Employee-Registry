import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from "react";
import "./Css/UpdateEmp.css"

const UpdateEmp = () => {
  let {id}=useParams()
  let navigate = useNavigate();
  let formik = useFormik({
    initialValues: {
      name: "",
      designation: "",
      dob: "",
      phone: "",
      email: "",
      photo: "",
    },
    onSubmit: (details,{resetForm}) => {
      axios.put("http://localhost:3000/employee",details)
      resetForm()
      toast.success("Employee Updated 👍")
      setTimeout(()=>{navigate("/")},4000)
    },
  });

  let { name, designation, phone, email, photo, dob } = formik.values;
  let { handleChange, handleSubmit } = formik;

  let handleImageChange = (e) => {
    let file = e.target.files[0];
    if (file) {
      let reader = new FileReader();
      reader.onload = () => {
        formik.setFieldValue("photo", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  let fetchData= async()=>{
    let {data}=await axios.get(`http://localhost:3000/employee/${id}`)
    formik.setValues(data)
  }
  useEffect(()=>{
    fetchData()
  },[])

  return (
    <div className="update">
    <h1>Update Employee</h1>
  <form onSubmit={handleSubmit}>
    <div className="form-left">
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="enter your name"
        value={name}
        onChange={handleChange}
        required
      />

      <label htmlFor="designation">Designation:</label>
      <input
        type="text"
        name="designation"
        id="designation"
        placeholder="enter your designation"
        value={designation}
        onChange={handleChange}
        required
      />

      <label htmlFor="dob">DOB:</label>
      <input
        type="date"
        name="dob"
        id="dob"
        value={dob}
        onChange={handleChange}
        required
      />

      <label htmlFor="phone">Mobile:</label>
      <input
        type="tel"
        name="phone"
        id="phone"
        placeholder="enter your phone no"
        value={phone}
        onChange={handleChange}
        required
      />

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="enter your email"
        value={email}
        onChange={handleChange}
        required
      />

      <label htmlFor="photo">Photo:</label>
      <input
        type="file"
        name="photo"
        id="photo"
        onChange={handleImageChange}
        required
      />
    </div>

    {/* Right Side - Image + Buttons */}
    <div className="form-right">
      {photo && (
        <img
          src={photo}
          alt="Preview"
        />
      )}
      <input type="submit" value="Submit" />
      <button type="button" onClick={() => navigate("/")}>Go to Home</button>
    </div>
  </form>
  <ToastContainer />
</div>
  );
}

export default UpdateEmp
