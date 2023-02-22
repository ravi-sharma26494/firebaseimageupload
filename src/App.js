import { Route, Routes } from 'react-router-dom';
import './App.css';
import Profile from './components/image_upload_firebase/Profile';
import Register from './components/image_upload_firebase/Register';

function App() {
  return (
    <div className="App">
<Routes>
        <Route exact path="/" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
