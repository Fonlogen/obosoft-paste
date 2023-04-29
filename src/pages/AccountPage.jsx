/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */

import { useEffect, useState, useRef } from 'react'
import Paste from '../components/Paste'
import Dialog from '../components/Dialog'

import { Account, Client, Databases, Query } from 'appwrite' 


const client = new Client();

const account = new Account(client);

client
	.setEndpoint('https://obosoft.it:8056/v1') // Your API Endpoint
	.setProject('6441c6e7d6448edcc109') // Your project ID

const databases = new Databases(client);

function AccountPage() {

	const [userAccount, setUserAccount] = useState(false)
	const [accountPrefs, setAccountPrefs] = useState({
		accountType: 'Free',
	})

  const [showDialog, setShowDialog] = useState(false)
  const pasteToDelete = useRef(0);

  const deletePaste = () => {
    const promise = 
    databases.deleteDocument('6441d733de9b8ae7a88b', '6447132ebfc2884a8f60', pasteToDelete.current);

    promise.then(function (response) {
      window.location.reload();
    }, function (error) {
      console.log(error); // Failure
    });
  }

  const deleteDialog = (paste_id) => {
    pasteToDelete.current = paste_id;
    console.log(pasteToDelete.current)
    setShowDialog(true)
  }


	useEffect(() => {
		const promise = account.get();

		promise.then(function (response) {
			if (!response) {
				window.location.href = '/login'
				return	
			}

			response.registration =
				response.registration.split('T')[0].split('-').reverse().join('/')

			if (response.prefs) {
				setAccountPrefs(response.prefs)
			}

			setUserAccount(response)

		}, function () { // Error
			window.location.href = '/login'
		});
	}, [])

	const [pastes, setPastes] = useState(null)

	useEffect(() => {
    const promise = 
    databases.listDocuments("6441d733de9b8ae7a88b", "6447132ebfc2884a8f60",
    
      [
        Query.equal("owner", userAccount.$id)
      ]
    );

    promise.then(function (response) {
      // console.log('response')
      setPastes(response.documents)
    }, function (error) {
      setPastes(false)
    });
	}, [userAccount])

	const logout = () => {
		const promise = account.deleteSession('current');

		promise.then(function (response) {
			setTimeout(() => {
				window.location.href = '/'
			}, 300)
		}, function () { // Error

		});
	}

	return (
    <>
    {
      showDialog &&
      (
        <Dialog 
          title='Confirm action' 
          description='Are you sure you want to permanently delete this paste? This action is irreversible' 
          confirmCallback={() => {
            deletePaste();
          }}
          confirmButton={true}
          cancelButton={true}
          cancelCallback={() => {
            setShowDialog(false)
          }}
        />
      )
    }
		<div className="w-full overflow-y-auto sm:overflow-y-none sm:grow flex flex-col sm:justify-center sm:items-center grow">
			<div className="w-full sm:w-11/12 md:w-10/12 lg:w-9/12 h-full sm:border-x p-3 flex flex-col gap-4">
				{/* Account settings area */}
				<div className="flex flex-col gap-2">
					<div className='sm:flex sm:flex-row justify-between'>
						<h1 className="text-3xl font-bold">Account settings</h1>
						{/* Logout */}
						<a 
							href="#"
							className="hidden sm:block sm:text-lg md:text-xl lg:text-=xl text-orange-500 cursor-pointer hover:text-orange-700 font-normal hover:underline active:text-orange-400 rounded-xl self-center"
							onClick={(e) => { logout() }}
						>Logout</a>
					</div>
					<ul className="account-settings">
						<li>
							<span>Username</span>
							<span>{userAccount.name}</span>
						</li>
						<li>
							<span>Email</span>
							<span>{userAccount.email}</span>
						</li>
						<li>
							<span>Member since</span>
							<span>{userAccount.registration}</span>
						</li>
						<li>
							<span>Account type</span>
							<span>{accountPrefs.accountType}</span>
						</li>
            <li>
							<span>Account ID</span>
							<span>{userAccount.$id || '0'}</span>
						</li>
					</ul>
					<a 
						href="#"
						className="block text-xl sm:hidden text-orange-500 cursor-pointer hover:text-orange-700 font-normal hover:underline active:text-orange-400 rounded-xl self-center"
						onClick={(e) => { logout() }}
					>Logout</a>
				</div>

				{/* Pastes area */}
				<div className="flex flex-col gap-2 grow">
					<h1 className="text-3xl font-bold">Created pastes</h1>
					<div className="account-pastes">
						{
							pastes === null ? (
								<p className="text-xl">Loading...</p>
							) :
							pastes.length === 0 || pastes === false ? (
								<div className='flex flex-col grow self-center my-auto justify-center items-center'>
									<p className="sm:text-lg md:text-xl lg:text-2xl text-gray-600 ">You haven't created any paste yet.</p>
									<a className="sm:text-md md:text-lg lg:text-xl text-orange-500 cursor-pointer hover:text-orange-700 font-normal hover:underline active:text-orange-400 rounded-xl" href="/">Create one now!</a>
								</div>
							) : (
								pastes.map((paste, idx) => {
									// if (paste.owner !== userAccount.$id) return null
									return (
										<Paste key={paste.$id} idx={idx} delete={deleteDialog} id={paste.$id} name={paste.name} content={paste.content} createdAt={paste.createdAt} />
									)
								})
							)
						}
					</div>
				</div>
			</div>
		</div>
    </>
	)
}

export default AccountPage