import React from 'react'
import { Link,matchPath } from 'react-router-dom'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import {NavbarLinks} from "../../data/navbar-links"
import { useLocation } from 'react-router-dom'
import { AiOutlineShoppingCart } from "react-icons/ai"
import { useSelector } from 'react-redux'
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { categories } from '../../services/apis'
import { useState,useEffect } from 'react'
import { apiConnector } from '../../services/apiconnector'
import { BsChevronDown } from "react-icons/bs"



const Navbar = () => {
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const { totalItems } = useSelector((state) => state.cart)

    const location = useLocation();

    const [subLinks, setSubLinks] = useState([]);
    const [loading, setLoading] = useState(false)


    const fetchSublinks =  async () => {
        try {
            setLoading(true);
            const res = await apiConnector("GET", categories.CATEGORIES_API);
            console.log("Prinitng sublicks result:", res);
            
                console.log("2nd wala clg", res.data.data)
                setSubLinks(res.data.data); 
                
            }
            

             
          
         catch (error) {
            console.log("Could not fetch Categories.", error)
        }
        setLoading(false)

      }

    useEffect(() => {
        fetchSublinks();
      }, [])


    const matchRoute = (route) => {
        
        return matchPath({ path: route }, location.pathname)
      }

  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>
        <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
            {/* Image */}
            <Link to = "/">
                <img src = {logo} alt="Logo" width={160} height={32} loading="lazy" />
            </Link>

            {/* Nav Links */}
            <nav className="hidden md:block">
                <ul className="flex gap-x-6 text-richblack-25">
                    {
                        NavbarLinks.map((link,index) => (
                            <li key ={index}>
                                {
                                    link.title === "Catalog" ? 
                                    (<div className="group relative flex cursor-pointer items-center gap-1">
                                        <p>{link.title}</p>
                                        <BsChevronDown/>

                                        <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                                        
                                        {
                                            subLinks.length > 0 ? (
                                                subLinks.map((subLinks,index)=>(
                                                    <Link to={`${subLinks.link}`} key ={index} className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50">
                                                    <p>{subLinks.name}</p>
                                                    </Link>
                                                ))
                                            ) : (<div></div>)

                                        }

                                        </div>

                                    </div>):(
                                        <Link to = {link.path}>
                                            <p
                                            className={`${
                                                matchRoute(link?.path)
                                                ? "text-yellow-25"
                                                : "text-richblack-25"
                                            }`}
                                            >
                                                {link.title}
                                            </p>
                                        </Link>
                                    )
                                }
                            </li>
                        ))
                    }
                </ul>
            </nav>

            {/* Login/Signup/Dashboard */}
            <div className="hidden items-center gap-x-4 md:flex">
                {
                    user && user.accountType !== "Instructor" && (
                        <Link to="/dashboard/cart" className="relative">
                             <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
                             {totalItems > 0 && (
                                    <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                                    {totalItems}
                                    </span>
                             )}
                        </Link>
                    )
                }
                {token === null && (
                    <Link to="/login">
                    <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                        Log in
                    </button>
                    </Link>
                )}
                {token === null && (
                    <Link to="/signup">
                    <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                        Sign up
                    </button>
                    </Link>
                )}
                {
                    token !==null && <ProfileDropDown/>
                }
            </div>
        </div>
    </div>
  )
}

export default Navbar