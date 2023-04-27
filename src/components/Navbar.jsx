/* eslint-disable react/prop-types */
import Logo from '../assets/obo-soft-orange.png'

function Navbar() {
    return (
        <div className="navbar-container w-full flex flex-row items-center justify-center border-b">
            <div className="navbar">
                <img src={Logo} alt='logo' className='w-30 h-10 cursor-pointer'
                    onClick={() => window.location.href = '/'}
                />
                
                {/* Mobile account button */}
                <a 
                    className='w-fit p-2 text-center items-center text-black text-2xl rounded-xl cursor-pointer hover:text-orange-600 hover:bg-gray-50 active:bg-orange-500 active:text-white flex flex-row gap-2'
                    href='/dashboard'
                >
                    <span className="material-symbols-outlined">
                    person
                    </span>
                </a>
            </div>
        </div>
    )
}

export default Navbar