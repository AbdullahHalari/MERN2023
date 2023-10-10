import React,{useEffect, useState} from "react";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";


const AlumniHome = () => {
  const navigate = useNavigate();
  
  const callPage = async ()=>{
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      // console.log(data);
      if(!res.status === 200){
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error)
      navigate('/AlumniLogin')
    }
  }
   const logOut = async ()=>{
    try {
      const res = await fetch("/logout", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      // console.log(data);
      if(!res.status === 200){
        const error = new Error(res.error);
        throw error;
      }
      navigate('/AlumniLogin')
    } catch (error) {
      console.log(error)
    }
  }
 useEffect(()=>{
  callPage()
 },[])
  return (
    <div className="teacher-home">
     <p>Alumni home</p>
     <button onClick={logOut}>logout</button>
    </div>

  );
};

export default AlumniHome;
