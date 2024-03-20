"use client"
import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import data from "../../src/data.json";

const HomePage = () => {
  const TOTAL_PAGES = 7;

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsToShow, setItemsToShow] = useState([]);

  useEffect(() => {
    setItemsToShow(data);
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="flex pt-20 justify-center h-full">
      <div className="border-2 border-gray-300 h-[600px] w-[550px] rounded-2xl flex flex-col p-10 gap-7">
        <div className="flex text-center flex-col gap-5">
          <h1 className="text-3xl font-semibold text-black">Please mark your interests!</h1>
          <h3 className="text-sm font-normal tracking-wide">We will keep you notified.</h3>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold">My saved interests!</h2>
          <ul className="flex flex-col gap-4">
            {itemsToShow.map((item) => (
              <li 
                key={item.id}
                className="flex gap-2 items-center"
              >
                <input
                  style={{backgroundColor:"gray"}}
                  type="checkbox" 
                  id={item.id} 
                  name={item.name} 
                  className="h-5 w-5"
                />
                <label htmlFor={item.id}>{item.name}</label>
              </li>
            ))}
          </ul>
          <div className="mt-10 items-center flex gap-2 text-xl text-gray-400">
            <div className=" flex gap-1 text-lg"><IoIosArrowBack /> <IoIosArrowBack /> <IoIosArrowBack /></div>
            {Array.from({ length: TOTAL_PAGES }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                className={currentPage === page ? "text-gray-800" : ""}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
            ...
            <div className="flex gap-1 text-lg">
              <IoIosArrowForward /> <IoIosArrowForward /> <IoIosArrowForward />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
