import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "../Components/Css/ViewEmp.css"

const ViewEmp = () => {
  let navigate=useNavigate()
  let[emp,setEmp]=useState(null)
  let {id}=useParams()
  let fetchdata=async()=>{
  let {data}=await axios.get(`http://localhost:3000/employee/${id}`)
  setEmp(data)
  }
  useEffect(()=>{
    fetchdata()
  },[])
  return (
    <div className="view">
    <main>
      {emp ==null? "loading...":
        <article>
          <div>
          <h1><span>Name</span>{emp.name}</h1>
          <p><span>Designation</span>{emp.designation}</p>
          <p><span>Contact no</span>+91{emp.phone}</p>
          <p><span>Date of Birth</span>{emp.dob}</p>
          <p><span>Email</span>{emp.email}</p>
          </div>
          <img src={emp.photo} alt="" />
          <button type="button" onClick={() => navigate("/")}>Go to Home</button>
        </article>
      }
    </main>
    </div>
  )
}

export default ViewEmp
