"use client"
import { useUserContext } from "@/context/UserContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Signup = () => {

    const router = useRouter()

    const {user, setUser} = useUserContext();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUser((prev)=>({
            ...prev,
            [name] : value
        }))
    }

    const signUp = (e) => {
        e.preventDefault()
        router.push('/signup/verify-otp');
    }
    
    return (
        <div className="flex pt-10 justify-center h-full">
            <div className="border-2 border-gray-300 h-[600px] w-[500px] rounded-2xl flex flex-col p-10 gap-7">
                <h1 className="text-3xl font-medium text-black text-center">Create your account</h1>
               <form onSubmit={(e)=>signUp(e)} className="flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                    <label className="text-base">Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            id="name" 
                            placeholder="Enter" 
                            value={user.name}
                            onChange={handleChange}
                            className=" py-2 px-2 border-2 border-gray-300 rounded-md" 
                        />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-base">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            value={user.email}
                            onChange={handleChange}
                            placeholder="Enter" 
                            className=" py-2 px-2 border-2 border-gray-300 rounded-md" 
                        />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-base">Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            value={user.password}
                            onChange={handleChange}
                            placeholder="Enter" 
                            className=" py-2 px-2 border-2 border-gray-300 rounded-md" 
                        />
                </div>
                <button type="submit" className="py-3 px-2 bg-black text-white rounded-md">
                    Create account
                </button>
               </form>
               <p className="text-sm font-light tracking-wider text-center mt-3">Have an Account? <Link href={"/login"} className="text-base font-medium">LOGIN</Link></p>
            </div>
        </div>
    );
}

export default Signup;