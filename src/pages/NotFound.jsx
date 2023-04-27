function NotFound() {
  return (
    <div className='flex flex-col w-full h-full items-center justify-center'>
        <span className='text-7xl sm:text-9xl font-bold text-gray-500'>404</span>
        <span className='text-3xl sm:text-4xl font-normal text-gray-500'>Resource not found</span>
        {/* Return to home link */}
        <a
            className='py-3 text-xl text-orange-500 cursor-pointer hover:text-orange-700 font-normal hover:underline active:text-orange-400 rounded-xl'
            href='/'
        >
            Return to home
        </a>
    </div>
  )
}

export default NotFound