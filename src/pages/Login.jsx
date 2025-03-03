/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */

// import { Account, Client } from 'appwrite' 

function Login(props) {

	// const client = new Client()
  //   .setEndpoint('https://fonlogen.it:8056/v1') // Your API Endpoint
  //   .setProject('6441c6e7d6448edcc109');       // Your project ID

	// if (props.account !== false) {
	// 	//alert('You are already logged in! Account: ' + props.account.name + '')
	// 	window.location.href = '/dashboard'
	// 	return (
	// 		'Loading...'
	// 	)
	// }

  return (
    <div className={"w-full overflow-y-auto sm:overflow-y-none sm:grow flex flex-col sm:justify-center sm:items-center " + (props.theme === 'dark' ? 'bg-neutral-900 text-white border-zinc-700' : 'text-black')}>
			<div className="w-full sm:w-11/12 md:w-10/12 lg:w-9/12 h-full sm:border-x px-6 py-10 flex flex-col gap-4 sm:justify-start items-center border-inherit">
				<h1 className="font-bold text-4xl">Login</h1>
				<span className="font-thin text-md text-inherit">Use your OboSoft account to access the service</span>
				<div className="flex flex-col w-full sm:w-1/2 text-xl gap-5">
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
					<div className="flex flex-col justify-between">
						<button 
							className='text-inherit flex flex-row justify-between items-center hover:border-b border-stone-700 hover:text-orange-500 text-2xl font-light py-2'
							onClick={() => {

								// const account = new Account(client)

								// account.createEmailSession(
								// 	document.getElementById('email').value,
								// 	document.getElementById('password').value
								// ).then((response) => {
								// 	props.setAccount(response);
									
								// 	setTimeout(() => {
								// 		window.location.href = '/dashboard'
								// 	}, 300)
									
								// }).catch((error) => {
								// 	alert(error.message)
								// })

							}}
						> 
								Login 
								<span className='material-symbols-outlined hover:no-decoration'> arrow_forward </span>
						</button>

						<div className='flex flex-col justify-center mt-2 gap-1'>
								<a href='/register' className='text-inherit font-normal flex flex-row justify-between items-center hover:border-b border-stone-700 hover:text-orange-500 py-1 text-sm'> 
										<span>Don't have an account? Register now!</span>
										<span className='material-symbols-outlined hover:no-decoration'> person_add </span>
								</a>

								<a href='/register' className='text-inherit font-normal flex flex-row justify-between items-center hover:border-b border-stone-700 hover:text-orange-500 py-1 text-sm'> 
										<span>Forgot password? </span>
										{/* An appropriate icon */}
										<span className='material-symbols-outlined hover:no-decoration'> Help </span>
								</a>
						</div>
					</div>
				</div>
			</div>
    </div>
  )
}

export default Login