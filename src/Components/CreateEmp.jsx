import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import "./Css/CreateEmp.css"

const CreateEmp = () => {
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
      axios.post("http://localhost:3000/employee",details)
      resetForm()
      toast.success("Employee Created 👍")
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

  return (
    <div className="home">
      <form onSubmit={handleSubmit}>
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
        <br />
        <br />
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
        <br />
        <br />
        <label htmlFor="dob">DOB:</label>
        <input
          type="date"
          name="dob"
          id="dob"
          value={dob}
          onChange={handleChange}
          required
        />
        <br />
        <br />
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
        <br />
        <br />
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
        <br />
        <br />
        <label htmlFor="photo">Photo:</label>
        <input
          type="file"
          name="photo"
          id="photo"
          onChange={handleImageChange}
          required
        />
        <br />
        <br />
        {/* ✅ Optional Preview */}
        {photo && (
          <img
            src={photo}
            alt="Preview"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        )}
        <br />
        <input type="submit" value="Submit" />
        <button onClick={() => navigate("/")}>GO to Home</button>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default CreateEmp;
