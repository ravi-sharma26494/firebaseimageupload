import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app } from "../../config/firebaseConfig";
import EditProfile from "./EditProfile";


const Profile = () => {
const [userData, setUserData] = useState(null);
const [showEditProfile, setShowEditProfile] = useState(false);
const navigate = useNavigate();
const auth = getAuth(app);
const db = getFirestore(app);

useEffect(() => {
const user = auth.currentUser;
if (user) {
const userId = user.uid;
console.log("user Id is " + userId);
const docRef = doc(db, "users", userId);
getDoc(docRef)
.then((doc) => {
if (doc.exists()) {
setUserData(doc.data());
}
})
.catch((error) => {
console.log("Error getting user data:", error);
});
} else {
console.log("success");
}
}, [auth, db]);

const handleEditProfile = () => {
setShowEditProfile(true);
};

if (!userData) {
return <div>Loading user data...</div>;
}

return (
<div>
<h1>User Profile</h1>
<p>Email: {userData.email}</p>
<img src={userData.profilePictureUrl} alt="Profile" />
<button onClick={handleEditProfile}>Edit Profile</button>
{showEditProfile && (
<EditProfile
       email={userData.email}
       profilePictureUrl={userData.profilePictureUrl}
       setShowEditProfile={setShowEditProfile}
       userData={userData}
     />
)}
</div>
);
};

export default Profile;