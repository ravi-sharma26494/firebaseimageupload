import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../../config/firebaseConfig";

const EditProfile = ({ userData, setShowEditProfile }) => {
  const [email, setEmail] = useState(userData.email);
  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const auth = getAuth(app);
  const db = getFirestore(app);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setProfilePicture(file);
  };

  const handleUpdateProfile = async (event) => {
    event.preventDefault();

    try {
      const userId = auth.currentUser.uid;
      const docRef = doc(db, "users", userId);

      if (profilePicture) {
        // Upload profile picture to storage
        const storage = getStorage();
        const profilePictureRef = ref(storage, `users/${userId}/profilePicture.jpg`);
        await uploadBytes(profilePictureRef, profilePicture);
        const profilePictureUrl = await getDownloadURL(profilePictureRef);

        // Update profile picture in database
        await updateDoc(docRef, {
          profilePictureUrl: profilePictureUrl,
        });
      }

      // Update email in database
      await updateDoc(docRef, {
        email: email,
      });

      setShowEditProfile();
      navigate('/profile');
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <div>
      {error && <div>{error}</div>}
      <form onSubmit={handleUpdateProfile}>
        <label>
          Email:
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </label>
        <label>
          Profile Picture:
          <input type="file" accept=".jpg,.jpeg,.png" onChange={handleFileUpload} />
        </label>
        <button type="submit">Update Profile</button>
        <button type="button" onClick={setShowEditProfile}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
