import { useEffect, useState, useRef } from "react";
import Paste from "../components/Paste";
import Dialog from "../components/Dialog";

function AccountPage(props) {
  const [userAccount, setUserAccount] = useState(false);
  const [accountPrefs, setAccountPrefs] = useState({
    accountType: "Free",
  });

  const [showDialog, setShowDialog] = useState(false);
  const pasteToDelete = useRef(0);

  const deleteDialog = (paste_id) => {
    pasteToDelete.current = paste_id;
    console.log(pasteToDelete.current);
    setShowDialog(true);
  };

  const [pastes, setPastes] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:3000/api/v1/paste/getPasteList/fonlogen', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      response.json().then((data) => {
        console.log(data);
        setPastes(data);
      });
    });
  }, [userAccount]);

  useEffect(() => {
    console.log(pastes);
  }, [pastes]);

  return (
    <>
      {showDialog && (
        <Dialog
          title="Confirm action"
          description="Are you sure you want to permanently delete this paste? This action is irreversible"
          confirmCallback={() => {
            // deletePaste();
          }}
          confirmButton={true}
          cancelButton={true}
          cancelCallback={() => {
            setShowDialog(false);
          }}
        />
      )}
      <div
        className={
          "w-full overflow-y-auto sm:overflow-y-none sm:grow flex flex-col sm:justify-center sm:items-center grow " +
          (props.theme === "dark"
            ? "bg-neutral-900 text-gray-300 border-zinc-700"
            : "")
        }
      >
        <div className="w-full sm:w-11/12 md:w-10/12 lg:w-9/12 h-full sm:border-x p-3 flex flex-col gap-4 bg-inherit border-inherit">
          {/* Account settings area */}
          <div className="flex flex-col gap-2">
            <div className="sm:flex sm:flex-row justify-between">
              <h1 className="text-3xl font-bold">Account settings</h1>
              {/* Logout */}
              <a
                href="#"
                className="hidden sm:block sm:text-lg md:text-xl lg:text-=xl text-orange-500 cursor-pointer hover:text-orange-700 font-normal hover:underline active:text-orange-400 rounded-xl self-center"
                onClick={(e) => {
                  // logout();
                }}
              >
                Logout
              </a>
            </div>
            <ul
              className={
                props.theme === "dark"
                  ? "account-settings-dark"
                  : "account-settings"
              }
            >
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
                <span>{userAccount.$id || "0"}</span>
              </li>
            </ul>
            <a
              href="#"
              className="block text-xl sm:hidden text-orange-500 cursor-pointer hover:text-orange-700 font-normal hover:underline active:text-orange-400 rounded-xl self-center"
              onClick={(e) => {
                // logout();
              }}
            >
              Logout
            </a>
          </div>

          {/* Pastes area */}
          <div className="flex flex-col gap-2 grow">
            <h1 className="text-3xl font-bold">Created pastes</h1>
            <div className="account-pastes">
              {pastes === null ? (
                <p className="text-xl">Loading...</p>
              ) : pastes.length === 0 || pastes === false ? (
                <div className="flex flex-col grow self-center my-auto justify-center items-center">
                  <p className="sm:text-lg md:text-xl lg:text-2xl text-gray-600 ">
                    You haven't created any paste yet.
                  </p>
                  <a
                    className="sm:text-md md:text-lg lg:text-xl text-orange-500 cursor-pointer hover:text-orange-700 font-normal hover:underline active:text-orange-400 rounded-xl"
                    href="/"
                  >
                    Create one now!
                  </a>
                </div>
              ) : (
                pastes.map((paste, idx) => {
                  return (
                    <Paste
                      key={paste._id}
                      idx={idx}
                      delete={deleteDialog}
                      id={paste._id}
                      name={paste.name}
                      content={paste.content}
                      createdAt={paste.createdAt}
                      theme={props.theme}
                    />
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountPage;
