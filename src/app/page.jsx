const HomePage = () => {
  return (
    <div className="flex pt-20 justify-center h-full">
    <div className="border-2 border-gray-300 h-[600px] w-[550px] rounded-2xl flex flex-col p-10 gap-7">
      <div className=" flex text-center flex-col gap-5">
        <h1 className="text-3xl font-semibold text-black">Please mark your interests!</h1>
        <h3 className="text-sm font-normal tracking-wide">We will keep you notified.</h3>
      </div>
      <div>
        <h2 className="text-lg font-semibold">My saved interests!</h2>
      </div>
    </div>
</div>
  );
}

export default HomePage;