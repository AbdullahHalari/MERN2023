import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import "./index.css";

const AlumniLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const loginUser = async (e) => {

    e.preventDefault();

   const res = await fetch("/signin", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify({
       
       email,
       password,
      
     }),
   });

   const data = await res.json();
  //  console.log(data);
   if (data.status === 400 || !data) {
     window.alert("Invalid");
     console.log("Invalid");
   } else {
     window.alert("success");
     console.log("success");
     navigate("/about");
   }
  }
 

  return (
    <React.Fragment>

      <section>
        <div className="teacherlogin">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 teacherloginpart1">
                <h2 className="teacherlogintext">Alumni Login</h2>
              </div>
              <div className="col-lg-6 teacherloginpart2">
                <form className="teacherform">
                  <h3>Log in:</h3>
                  <label className="teacherid" htmlFor="student-id">
                    Alumni ID:
                  </label>
                  <input
                    className="teacheridbox"
                    placeholder="Alumni email here..."
                    type="text"
                    id="student-id"
                    name="student-id"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label className="passwordtext" htmlFor="password">
                    Password:
                  </label>
                  <div>
                    <input
                      className="passwordtextbox"
                      placeholder="Password here..."
                      id="password"
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                 
                  </div>
                  <br />
                  <br />
                  <button className="teacherbutton1" onClick={loginUser} >
                    Login
                  </button>
                 
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default AlumniLogin;
