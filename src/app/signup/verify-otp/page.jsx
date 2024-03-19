"use client"
import { useUserContext } from "@/context/UserContext"
import { useEffect, useRef, useState } from "react"

let currentOtpIndex = 0
const VerifyOtp = () => {

  const {user} = useUserContext();

  const [otp, setOtp] = useState(new Array(8).fill(""))
  const [activeOtpIndex, setActiveOtpIndex] = useState(0)
  const inputRef = useRef(null)

  const handleOnchange = (e) => {
      const {value} = e.target;
      const newOtp = [...otp];
      newOtp[currentOtpIndex] = value.substring(value.length - 1); 

      if(!value) {
        setActiveOtpIndex(currentOtpIndex - 1)
      } else {
        setActiveOtpIndex(currentOtpIndex + 1)
      }

      setOtp(newOtp);
  }

  const handleKeyDown = (e, index) => {
    currentOtpIndex = index
    if(e.key === 'Backspace') setActiveOtpIndex(currentOtpIndex - 1)
  }

  useEffect(() => {
    inputRef.current?.focus()
  },[activeOtpIndex])

  return (
    <div className="flex justify-center pt-10 h-full">
    <div className="border-2 border-gray-300 h-[453px] w-[576px] rounded-2xl flex flex-col p-10 gap-14">
        <div className=" flex text-center flex-col gap-7">
            <h1 className="text-3xl font-semibold text-black">Verify your email</h1>
            <p className="text-sm font-light flex flex-col">Enter the 8 digit code you have received on <span>{user?.email}</span></p>
        </div>
       <form action="" className="flex flex-col gap-16">
          <div className="flex flex-col gap-2">
            <span>Code</span>
            <div className="flex justify-between">
              {
                otp?.map((_, index) => (
                  <div key={index}>
                    <input 
                      type="number"
                      ref={index === activeOtpIndex ? inputRef : null}
                      value={otp[index]}
                      className="w-12 h-12 border-2 rounded-md transition-all border-gray-300 focus:border-gray-500 font-semibold text-center spin-btn-none"
                      onChange={(e) => handleOnchange(e)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                    />
                  </div>
                ))
              }
            </div>
          </div>
        <button className="py-3 px-2 bg-black text-white rounded-md">
            VERIFY
        </button>
       </form>
    </div>
</div>
  )
}

export default VerifyOtp