/* eslint-disable react/prop-types */
import { Switch } from '@mui/material'
import Logo from '../assets/obo-soft-orange.png'

import { useState, useRef, useEffect } from 'react'

function Navbar(props) {

    const theme = useRef(props.theme === 'dark' ? true : false)
    // const [theme, setTheme] = useState(props.theme === 'dark' ? true : false) // False = light, True = Dark

    useEffect(() => {
        if (props.theme === 'dark')
            theme.current = true
        else
            theme.current = false
    }, [props.theme])

    // console.log(theme)

    return (
        <div className={"navbar-container w-full flex flex-row items-center justify-center border-b " + (props.theme === 'dark' ? 'bg-neutral-900 text-white border-zinc-700' : 'text-black')}>
            <div className="navbar">
                <img src={Logo} alt='logo' className='w-30 h-10 cursor-pointer'
                    onClick={() => window.location.href = '/'}
                />
                
                {/* Account button and theme switcher */}
                <div className='flex flex-row gap-8'>
                    <div className='flex flex-row gap-1 items-center'>
                        <span className="material-symbols-outlined">
                            light_mode
                        </span>
                        <Switch 
                            checked={theme.current}
                            onChange={() => {
                                let newTheme = theme.current ? false : true
                                theme.current = newTheme
                                props.setTheme(
                                    newTheme ? 'dark' : 'light'
                                )
                            }}
                        />
                        <span className="material-symbols-outlined">
                            dark_mode
                        </span>
                    </div>
                    <a 
                        className={'w-fit p-2 text-center items-center text-2xl rounded-xl cursor-pointer flex flex-row gap-2 ' + (props.theme === 'dark' ? 'hover:text-orange-600 text-white hover:bg-zinc-800' : 'hover:text-orange-600 hover:bg-gray-50 active:bg-orange-500 active:text-white text-black')}
                        href='/dashboard'
                    >
                        <span className="material-symbols-outlined">
                            person
                        </span>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Navbar