import { t } from "i18next"
import { useContext } from "react"
import { BiSearchAlt } from "react-icons/bi"
import { IoIosArrowDown } from "react-icons/io"
import { IoNotificationsOutline, IoSettingsOutline } from "react-icons/io5"
import { useNavigate } from "react-router-dom"
import logo from "../../assets/altebr_logo.png"
import { authCtx } from "../../context/auth-and-perm/auth"
import { Can } from "../../utils/utils-components/Can"
import { Button } from "../atoms"

const NavBar = () => {
  const {logOutHandler, isLoggingOut} = useContext(authCtx)
  const navigate = useNavigate()

 return (
   <div className="w-100 flex h-14 items-center justify-between p-2">
     <div className="w-100 flex items-center gap-12 py-6 px-4">
       <img src={logo} className="ms-3 h-12 w-12 object-contain" alt="logo" />
       {/* <Can access={["api.v1.categories.store"]}>
          <form className="flex items-center rounded-md border-2 border-slate-200 p-1 ">
            <input
              type="search"
              placeholder="بحث"
              className=" placeholder-slate-400 border-transparent p-0"
            />
            <BiSearchAlt className="fill-slate-400" />
          </form>
        </Can> */}
     </div>
     <div className="me-2 flex  items-center gap-4">
       <IoSettingsOutline onClick={() => navigate("/settings")} className="icon fill-mainBlack cursor-pointer" />
       <div className=" relative">
         <IoNotificationsOutline className="icon fill-mainBlack" />
         <span className=" absolute -top-2 left-3 rounded-full  bg-mainRed p-[2px] text-xs text-white">
           10
         </span>
       </div>
       <div className="flex items-center justify-center gap-2">
         <img src={logo} className="w-6 h-6  object-contain" alt="logo" />
         <h6 className="m-0">اسم المستخدم</h6>
         <IoIosArrowDown className="h-4 w-4 fill-mainBlack" />
         <Button action={logOutHandler} loading={isLoggingOut}>
          {t('log out')}
         </Button>
       </div>
     </div>
   </div>
 )
 return (
   <div className="w-100 flex h-14 items-center justify-between p-2">
     <div className="w-100 flex items-center gap-12 py-6 px-4">
       <img src={logo} className="ms-3 h-12 w-12 object-contain" alt="logo" />
         <form className="flex items-center rounded-md border-2 border-slate-200 p-1 ">
           <input
             type="search"
             placeholder="بحث"
             className=" placeholder-slate-400 border-transparent p-0"
           />
           <BiSearchAlt className="fill-slate-400" />
         </form>

     </div>
     <div className="me-2 flex  items-center gap-4">
       <IoSettingsOutline className="icon fill-mainBlack cursor-pointer" />
       <div className=" relative">
         <IoNotificationsOutline className="icon fill-mainBlack" />
         <span className=" absolute -top-2 left-3 rounded-full  bg-mainRed p-[2px] text-xs text-white">
           10
         </span>
       </div>
       <div className="flex items-center justify-center gap-2">
         <img src={logo} className="w-6 h-6  object-contain" alt="logo" />
         <h6 className="m-0">اسم المستخدم</h6>
         <IoIosArrowDown className="h-4 w-4 fill-mainBlack" />
       </div>
     </div>
   </div>
 )
}

export default NavBar
