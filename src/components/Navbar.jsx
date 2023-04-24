/* eslint-disable react/prop-types */
import Logo from '../assets/obo-soft-orange.png'

function Navbar(props) {
    return (
        <div className="navbar">
            <img src={Logo} alt='logo' className='w-30 h-10' />
            <div className='w-fit py-1 px-7 text-center items-center text-black text-2xl rounded-xl cursor-pointer hover:text-orange-600 hidden sm:flex flex-row gap-2'>
                <span>{
                    props.name !== false ? props.name : 'Account' 
                }</span>
            </div>
        </div>
    )
}

export default Navbar