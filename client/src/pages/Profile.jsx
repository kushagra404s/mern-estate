import { app } from '../firebase';
import {useSelector} from "react-redux";
import { useState, useRef, useEffect } from "react";
import {getDownloadURL, uploadBytesResumable ,getStorage,ref } from "firebase/storage";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
    signOutUserStart,
} from '../redux/user/userSlice';import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';

export default function Profile() {
  const fileRef=useRef(null);
  const {currentUser,loading,error} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  
  const[file, setFile] = useState(undefined);
  const[filePerc,setFilePerc] = useState(0);
  const[fileUploadError,setFileUploadError] = useState(false);
  

  const[formData, setFormData] = useState({})
  
  const [updateSuccesss,setUpdateSuccess] = useState(false);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };




  useEffect(()=>{
    if(file){
      handleFileUpload(file);
    }
  },[file]);

  const handleFileUpload = async (file) => {
    const storage=getStorage(app);
    

    const fileName=new Date().getTime()+file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
     (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };


   const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };


  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
         <input
          onChange={(e) => setFile(e.target.files[0])}
          type='file'
          ref={fileRef}
          hidden
          accept='image/*'
        />
<img onClick={()=> fileRef.current.click()}
  src={formData.avatar || currentUser.avatar ||'https://th.bing.com/th/id/OIP.ATZnbS6I6DVPWuFGum_U0AHaHa?w=204&h=204&c=7&r=0&o=7&dpr=2.1&pid=1.7&rm=3'}
  alt="profile"
  className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
/>

<p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>

<input type="text" placeholder="username" defaultValue={currentUser.username} id="username" className="border p-3 rounded-lg" onChange={handleChange} />

<input type="email" placeholder="email" defaultValue={currentUser.email} id="email" className="border p-3 rounded-lg" onChange={handleChange} />
<input type="password" placeholder="password" id="password" className="border p-3 rounded-lg" onChange={handleChange} />
<button disabled={loading} className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">{loading? 'Loading...' : 'Update'} </button>
 <Link className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95' to={"/create-listing"}> Create Listing</Link>    
     
      </form>
      <div className="flex justify-between mt-5">
        <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer">Delete Account</span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">Sign out</span>
      </div>
      <p className="text-red-700 mt-5">{error ? error:''}</p>
      <p className="text-green-700 mt-5">{updateSuccesss ? 'User is updated':''}</p>
    </div>
  )
}
