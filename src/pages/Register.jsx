/* eslint-disable react/prop-types */
import { Client, Account, ID } from 'appwrite';

function Register(props) {

	if (props.account !== false) {
		window.location.href = '/dashboard'
		return (
			'Loading...'
		)
	}

  return (
    <div className={"w-full overflow-y-auto sm:overflow-y-none sm:grow flex flex-col sm:justify-center sm:items-center " + (props.theme === 'dark' ? "text-white bg-neutral-900 border-zinc-700" : "text-black")}>
			<div className="w-full sm:w-11/12 md:w-10/12 lg:w-9/12 h-full sm:border-x px-6 py-10 flex flex-col gap-4 sm:justify-start items-center border-inherit">
				<h1 className="font-bold text-4xl">Register</h1>
				<span className="font-thin text-md text-inherit w-96">You will create a OboSoft account, which will be used by all OboSoft services.</span>
				<div className="flex flex-col w-full sm:w-1/2 text-xl gap-5">
					<div className="flex flex-col">
						<label htmlFor="username" className="px-2">Username</label>
						<input 
							className={"border-b border-gray-500 focus:outline-none focus:border-orange-400 font-thin text-lg px-2 py-1 " + (props.theme === 'dark' ? 'bg-neutral-900' : 'bg-white')}
							type="username" name="username" id="username" 
						/>
					</div>
					<div className="flex flex-col">
						<label htmlFor="email" className="px-2">Email</label>
						<input 
							className={"border-b border-gray-500 focus:outline-none focus:border-orange-400 font-thin text-lg px-2 py-1 " + (props.theme === 'dark' ? 'bg-neutral-900' : 'bg-white')}
							type="email" name="email" id="email" 
						/>
					</div>
					<div className="flex flex-col">
						<label htmlFor="password" className="px-2">Password</label>
						<input
							className={"border-b border-gray-500 focus:outline-none focus:border-orange-400 font-thin text-lg px-2 py-1 " + (props.theme === 'dark' ? 'bg-neutral-900' : 'bg-white')}
							type="password" name="password" id="password" 
						/>
					</div>
					<div className="flex flex-col">
						<label htmlFor="passwordconfirm" className="px-2">Confirm Password</label>
						<input
							className={"border-b border-gray-500 focus:outline-none focus:border-orange-400 font-thin text-lg px-2 py-1 " + (props.theme === 'dark' ? 'bg-neutral-900' : 'bg-white')}
							type="passwordconfirm" name="passwordconfirm" id="passwordconfirm" 
						/>
					</div>
					<div className="flex flex-col justify-between">
						<button 
							className='text-inherit flex flex-row justify-between items-center hover:border-b border-stone-700 hover:text-orange-500 text-2xl font-light py-2'
							onClick={() => {
								const client = new Client()
								client
									.setEndpoint('https://obosoft.appwrite.io/v1')
									.setProject('6441cd015b58133de8d7')
								const account = new Account(client)
								account.create(
									ID.unique(),
									document.getElementById('email').value,
									document.getElementById('password').value,
									document.getElementById('username').value,
								).then((response) => {
									console.log(response)
								}, (error) => {
									console.log(error)
								})
							}}
						> 
								Register account
								<span className='material-symbols-outlined hover:no-decoration'> arrow_forward </span>
						</button>

						<div className='flex flex-col justify-center mt-2 gap-1'>
								<a href='/login' className='text-inherit font-normal flex flex-row justify-between items-center hover:border-b border-stone-700 hover:text-orange-500 py-1 text-sm'> 
										<span>Already a OboSoft member? Login now!</span>
										<span className='material-symbols-outlined hover:no-decoration'> Login </span>
								</a>
						</div>
					</div>
				</div>
			</div>
    </div>
  )
}

export default Register