import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import IconBtn from "../../../comman/IconBtn";
import ChangeProfilePicture from "./ChangeProfilePicture"
// import DeleteAccount from "./DeleteAccount"
import EditProfile from "./EditProfile"
// import UpdatePassword from "./UpdatePassword"

export default function Settings() {
    const {user} = useSelector((state)=>state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

  return (
    <>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        Edit Profile
      </h1>
      {/* Change Profile Picture */}
      <ChangeProfilePicture />  

      {/* Profile */}
      <EditProfile /> 
          
    
    </>
  )
}

