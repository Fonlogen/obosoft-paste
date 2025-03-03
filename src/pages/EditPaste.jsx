import { useParams } from 'react-router-dom'
import { Client, Databases, Query, Account } from "appwrite";
import { useState, useEffect } from 'react'

import MDEditor from "@uiw/react-md-editor";

const client = new Client();

const databases = new Databases(client);

const account = new Account(client);

client
    .setEndpoint('https://fonlogen.it:8056/v1') // Your API Endpoint
    .setProject('6441c6e7d6448edcc109') // Your project ID
;

function EditPaste(props) {
  const { pasteID } = useParams()

  const [ canEdit, setCanEdit ] = useState(null)

  const [value, setValue] = useState('Loading...')

  const [ document, setDocument ] = useState({
    name: 'Loading...',
    content: 'Loading...',
    createdAt: 'Loading...',
    author: 'Loading...',
  });

  const [ userAccount, setUserAccount ] = useState(false)

  useEffect(() => {
    const promise = account.get();

    promise.then(function (response) {
        setUserAccount(response)
    }, function (error) {
        console.log(error); // Failure
    });
  }, [userAccount])

  useEffect(() => {
    const promise = // Paste collection
      databases.listDocuments("6441d733de9b8ae7a88b", "6447132ebfc2884a8f60", [
        Query.equal("$id", pasteID)
      ]);

    promise.then(function (response) {
      // console.log(response); // Success
      setDocument(response.documents[0]);
      setValue(response.documents[0].content);
    }, function (error) {
      console.log(error); // Failure
      setDocument(false)
    });
  
  }, [])

  useEffect(() => {
    if (account.$id === document.owner)
    {
      setCanEdit(true)
      return
    }
    setCanEdit(false)
  }, [userAccount])
  
  return (
    <div className={"overflow-y-auto w-full grow flex flex-col sm:items-center h-full" + (props.theme === 'dark' ? 'text-white bg-neutral-900 border-zinc-700' : 'text-black')}>
      <div className="w-full sm:w-11/12 md:w-10/12 lg:w-9/12 h-fit sm:border-x p-3 flex flex-col sm:flex-row sm:justify-between sm:gap-4 gap-2 border-b border-inherit">
        <span className='flex text-2xl font-bold text-center items-center grow'>
          {
            "Editing " + document.name || "Loading..."
          } 
        </span>
        <div className='flex flex-row justify-between sm:gap-5'>
          <span className='flex items-center justify-center text-gray-600 text-sm'>
            {
              document.$id || "Loading..."
            }
          </span>
          <div className='flex flex-col text-sm text-gray-600 items-end w-fit'>
            <span>
              {
                document.createdAt.slice(0, 10).replaceAll('-', '/') || "Loading..."
              }
            </span>
            <span>
              {
                'by ' + (
                  document.owner_displayname === null ? "Guest" : 
                  (document.owner_displayname || "Loading...")
                )
              }
            </span>
          </div>
        </div>
      </div>
      <div className="w-full sm:w-11/12 md:w-10/12 lg:w-9/12 h-full sm:border-x  flex flex-col gap-1 border-inherit" data-color-mode={props.theme}>
        <MDEditor 
            className={props.theme === "dark" ? 'darkbgeditor' : ''}
          textareaProps={{
            placeholder: "Your paste..."
          }}
            preview="edit" 
            value={value} 
            onChange={setValue} 
            hideToolbar={true} 
            autoFocus={true} 
            height={""}
            visibleDragbar={false}
            tabSize={4}
        />
      </div>
      
      <div className="flex flex-col-reverse gap-3 sm:flex-row items-center justify-between">
        <input 
          className="w-fit text-xl text-white bg-orange-400 hover:bg-orange-500 cursor-pointer rounded-xl p-2 px-10"
          type='button' 
          value="Save"
          onClick={() => {

            let newDocument = document;
            newDocument.content = value;

            const updateData = {
              ...newDocument,
              id: undefined,
              $collectionId: undefined,
              $createdAt: undefined,
              $databaseId: undefined,
              $id: undefined,
              $permissions: undefined,
            }

            console.log(newDocument)

            const promise = databases.updateDocument("6441d733de9b8ae7a88b", "6447132ebfc2884a8f60", pasteID, updateData)

            promise.then(function (response) {
              window.location.href=window.location.origin + '/view/' + pasteID;
            }, function (error) {
                console.log(error); // Failure
            });
          }}
        ></input>

      </div>
    </div>
  )

}

export default EditPaste