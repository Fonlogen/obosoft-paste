function HomePage() {
  return (
    <div className="w-full grow flex flex-col sm:justify-center sm:items-center">
      <div className="w-full sm:w-11/12 md:w-10/12 lg:w-9/12 h-full sm:border-x p-3 flex flex-col gap-4">
        <input 
          type="text" 
          className="w-full h-10 border-b bg-white px-3 py-3 outline-none text-xl font-bold" 
          placeholder="New paste..." 
          maxLength={250} />
        {/* Create non resizable text area */}
        <textarea className="paste-textarea" placeholder="Your paste..." />
        <div className="flex flex-col gap-3 sm:flex-row items-center justify-between">
          <span>
            Want to start over?&nbsp;
            <a
            className="text-orange-500 cursor-pointer hover:text-orange-700 font-normal hover:underline active:text-orange-400 rounded-xl"
            
            >
              Delete everything
            </a>
            .
          </span>
          <input 
            className="w-fit text-xl text-white bg-orange-400 hover:bg-orange-500 cursor-pointer rounded-xl p-2 px-10"
            type='button' 
            value="Create"
          ></input>

        </div>
      </div>
    </div>
  )
}

export default HomePage