// Project Name: imageUploadFirestore
// App Name: imageUploadFirestore

import React, { useState } from "react";
import { auth, db, googleAuthProvider } from "../../config/firebaseConfig";
import { createUserWithEmailAndPassword,signInWithPopup } from "firebase/auth";

import "./Register.css";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, uploadBytes, getStorage, ref } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";



const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setProfilePicture(file);
  };

  const handleRegistration = async (event)=>{
    event.preventDefault();
    console.log("test");

    try {
        const userCredential = await createUserWithEmailAndPassword(auth,email, password);
        console.log(userCredential.user);
        if(userCredential.user){
            const userId = userCredential.user.uid;
            const storage = getStorage();
            const profilePictureRef = ref(storage, `users/${userId}/profilePicture.jpg`);
            // await profilePictureRef.put(profilePicture);
            await uploadBytes(profilePictureRef, profilePicture);
            const profilePictureUrl = await getDownloadURL(profilePictureRef);
            await setDoc(doc(db, "users", userId), {
                email: email,
                profilePictureUrl: profilePictureUrl,
              });
            //console.log(details);
            alert("Success");
            navigate("/profile");

        }
        else {
            return alert("Something went wrong");   
        }
    } catch (error) {
        console.log(error);
        setError(error.message);
    }
  };
  const handleGoogleLogin = async (event) => {
    event.preventDefault();
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const user = result.user;
      console.log(user);
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        profilePictureUrl: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
      });
      alert("Google login successful!");
      navigate("/profile");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  }
  return (
    <div>
      {error && <div>{error}</div>}
      <form onSubmit={handleRegistration}>
        <label>
          Email:
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)}  />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)}  />
        </label>
        <label>
          Profile Picture:
          <input type="file" accept=".jpg,.jpeg,.png" onChange={handleFileUpload}  />
        </label>
        <button type="submit">Register</button>
        <button onClick={handleGoogleLogin}>Google Login</button>
      </form>
    </div>
  );
};

export default Register;