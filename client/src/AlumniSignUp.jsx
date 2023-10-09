import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";

const AlumniSignUp = () => {
  const [user, setUser] = useState({
    fullName: "",
    registrationId: "",
    phoneNumber: '',
    email: "",
    password: "",
    retypePassword: "",
    selectedProgram: "",
    specialty: "",
  });
  // const [fullName, setFullName] = useState("");
  // const [registrationId, setRegistrationId] = useState("");
  // const [phoneNumber, setPhoneNumber] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [retypePassword, setRetypePassword] = useState("");
  // const [passwordType, setPasswordType] = useState("password");
  // const [selectedProgram, setSelectedProgram] = useState("");
  // const [dateOfBirth, setDateOfBirth] = useState("");
  // const [passingYear, setPassingYear] = useState("");
  // const [specialty, setSpecialty] = useState(""); 
//   let name,value;
// // 
//   const handleInputs = (e)=>{
//     console.log(e);
//     name = e.target.name;
//     value=e.target.value;
//     setUser({...user, [name]:value});
//   }

const navigate = useNavigate();

const postData = async (e)=>{
  try {
    e.preventDefault();
    const {
      fullName,
      registrationId,
      phoneNumber,
      email,
      password,
      retypePassword,
      selectedProgram,
      specialty,
    } = user;
  //  const fullName='jhsjfh';
  //       const registrationId='fdf';
  //      const phoneNumber=65456;
  //      const email='hghg';
  //      const password='jdgjf';
  //     const  retypePassword='bcvbcm';
  //      const selectedProgram='fhgkdfh';
  //     const  specialty='gvjbvnmv';
    
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName,
        registrationId,
        phoneNumber,
        email,
        password,
        retypePassword,
        selectedProgram,
        specialty,
      }),
    });
    
    const data = await res.json();
    console.log(data)
    if (data.status === 422 || !data) {
      window.alert("Invalid");
      console.log("Invalid");
    } else {
      window.alert("success");
      console.log("success");
      navigate("AlumniLogin");
    }
    console.log("done");
  } catch (error) {
    console.log(error)
  }
}

  return (
    <React.Fragment>
      <section>
        <div className="teacherlogin">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 teacherloginpart1">
                <h2 className="teacherlogintext1">Alumni Sign Up</h2>
              </div>
              <div className="col-lg-6 teacherloginpart2">
                <form method="POST" className="teacherform1">
                  <h3>Sign Up:</h3>
                  <label htmlFor="full-name" className="teacherid">
                    Full Name:
                  </label>
                  <input
                    type="text"
                    id="full-name"
                    name="full-name"
                    className="teacheridbox"
                    value={user.fullName}
                    onChange={(e) =>
                      setUser({ ...user, fullName: e.target.value })
                    }
                    placeholder="Enter your full name"
                    // required
                  />
                  <label htmlFor="registration-id" className="teacherid">
                    Registration ID:
                  </label>
                  <input
                    type="text"
                    id="registration-id"
                    name="registration-id"
                    className="teacheridbox"
                    value={user.registrationId}
                    onChange={(e) =>
                      setUser({ ...user, registrationId: e.target.value })
                    }
                    placeholder="Enter your registration ID"
                    required
                  />
                  <label htmlFor="phone-number" className="teacherid">
                    Phone Number:
                  </label>
                  <input
                    type="text"
                    id="phone-number"
                    name="phone-number"
                    className="teacheridbox"
                    value={user.phoneNumber}
                    onChange={(e) =>
                      setUser({ ...user, phoneNumber: e.target.value })
                    }
                    placeholder="Enter your phone number"
                    required
                  />
                  <label htmlFor="email" className="teacherid">
                    Email ID:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="teacheridbox"
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                    placeholder="Enter your email address"
                    required
                  />
                  <label htmlFor="date-of-birth" className="teacherid">
                    Date of Birth:
                  </label>
                  <input
                    type="date"
                    id="date-of-birth"
                    name="date-of-birth"
                    className="teacheridbox calendar"
                    value={user.dateOfBirth}
                    onChange={(e) =>
                      setUser({ ...user, dateOfBirth: e.target.value })
                    }
                    required
                  />

                  <label htmlFor="specialty" className="teacherid">
                    Specialty:
                  </label>
                  <input
                    type="text"
                    id="specialty"
                    name="specialty"
                    className="teacheridbox"
                    value={user.specialty}
                    onChange={(e) =>
                      setUser({ ...user, specialty: e.target.value })
                    }
                    placeholder="Enter your specialty"
                    required
                  />
                  <label htmlFor="program" className="teacherid">
                    Program:
                  </label>
                  <select
                    id="program"
                    name="program"
                    className="teacheridbox"
                    value={user.selectedProgram}
                    onChange={(e) =>
                      setUser({ ...user, selectedProgram: e.target.value })
                    }
                    required
                  >
                    <option value="">Select Program</option>
                    <option value="BSCS">BSCS</option>
                    <option value="BSSE">BSSE</option>
                    <option value="BECS">BECS</option>
                    <option value="BEEE">BEEE</option>
                    <option value="MSSE">MSSE</option>
                    <option value="MSCS">MSCS</option>
                  </select>
                  <label htmlFor="password" className="passwordtext">
                    Password:
                  </label>
                  <div>
                    <input
                      // type={passwordType}
                      id="password"
                      name="password"
                      className="passwordtextbox"
                      value={user.password}
                      onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                      }
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                  <label htmlFor="retype-password" className="passwordtext">
                    Retype Password:
                  </label>
                  <div>
                    <input
                      // type={passwordType}
                      // id="retype-password"
                      // name="retype-password"
                      className="passwordtextbox"
                      value={user.retypePassword}
                      onChange={(e) =>
                        setUser({ ...user, retypePassword: e.target.value })
                      }
                      placeholder="Retype your password"
                      required
                    />
                  </div>
                  <br />
                  <br />
                  <button className="teacherbutton1" onClick={postData}>
                    Sign Up
                  </button>
                  <h6 className="forgotpassword">
                    Already have an account?{" "}
                    <Link to="/AlumniLogin">Login Here</Link>
                  </h6>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default AlumniSignUp;
