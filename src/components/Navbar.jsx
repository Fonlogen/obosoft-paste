/* eslint-disable react/prop-types */
import Logo from '../assets/obo-soft-orange.png'

function Navbar(props) {
    return (
        <div className="flex flex-row w-full p-3 h-30 items-center justify-between">
            <img src={Logo} alt='logo' className='w-30 h-10' />
            <div className='w-fit py-1 px-7 text-center items-center text-black text-2xl rounded-xl cursor-pointer hover:text-orange-600'>
                {
                    props.name !== false ? props.name : 'Login'
                }
            </div>
        </div>
    )
}

export default Navbar