"use client"
import Link from "next/link";
import { useState } from "react";

const loginPage = () => {

    const [user, setUser] = useState({
        email:"",
        password:"",
        showPassword:false
    })

    const togglePasswordVisibility = () => {
        setUser((prev) => ({...prev, showPassword: !prev.showPassword}))
    }

    return (
        <div className="flex justify-center pt-10 h-full">
        <div className="border-2 border-gray-300 h-[550px] w-[500px] rounded-2xl flex flex-col p-10 gap-7">
            <div className=" flex text-center flex-col gap-7">
                <h1 className="text-3xl font-semibold text-black">Login</h1>
                <div className=" flex-col flex gap-1">
                    <h3 className="text-xl font-medium">Welcome back to ECOMMERCE</h3>
                    <p className="text-sm font-light">The next gen business marketplace</p>
                </div>
            </div>
           <form action="" className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
                <label className="text-base">Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        value={user.email}
                        onChange={(e) => setUser({...user, email:e.target.value})}
                        placeholder="Enter" 
                        className=" py-2 px-2 border-2 border-gray-300 rounded-md" 
                    />
            </div>
            <div className="flex flex-col gap-1">
                <label className="text-base">Password</label>
                    <div className="relative ">
                        <input 
                            type={user.showPassword ? "text" : "password"}
                            name="password" 
                            id="password" 
                            value={user.password}
                            onChange={(e) => setUser({...user, password:e.target.value})}
                            placeholder="Enter" 
                            className=" w-full py-2 px-2 border-2 border-gray-300 rounded-md" 
                        />
                        <button
                         type="button"
                         onClick={togglePasswordVisibility}
                         className=" absolute flex items-center inset-y-0 right-0 pr-3 text-sm font-normal"
                        >
                            {user.showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
            </div>
            <button className="py-3 px-2 bg-black text-white rounded-md">
                LOGIN
            </button>
            <hr className="border border-gray-300"/>
           </form>
            <p className="text-sm font-light tracking-wider text-center ">Don&apos;t have an Account? <Link href={"/signup"} className="text-base font-medium">SIGN UP</Link></p>
            </div>
        </div>
    );
}

export default loginPage;