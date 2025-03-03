import { useParams } from 'react-router-dom'
import { Client, Databases, Query, Account } from "appwrite";
import { useState, useEffect } from 'react'

const client = new Client();

const databases = new Databases(client);

const account = new Account(client);

client
    .setEndpoint('https://fonlogen.it:8056/v1') // Your API Endpoint
    .setProject('6441c6e7d6448edcc109') // Your project ID
;

function EditPaste() {
  const { pasteID } = useParams()

  const [ canEdit, setCanEdit ] = useState(null)
  const { tarea, setTArea } = useState(false)

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
    <div className="overflow-y-auto w-full grow flex flex-col sm:items-center h-full">
      <div className="w-full sm:w-11/12 md:w-10/12 lg:w-9/12 h-fit sm:border-x p-3 flex flex-col sm:flex-row sm:justify-between sm:gap-4 gap-2 border-b">
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
      {
        tarea &&
        (
          <textarea 
            className="paste-textarea" 
            defaultValue={document.content} 
            placeholder="Editing paste..."
          ></textarea>
        )
      }
      
      <div className="flex flex-col-reverse gap-3 sm:flex-row items-center justify-between">
        <input 
          className="w-fit text-xl text-white bg-orange-400 hover:bg-orange-500 cursor-pointer rounded-xl p-2 px-10"
          type='button' 
          value="Save"
          onClick={() => {
            // Get title and content
            // const title = document.querySelector('input[type="text"]').value;
            // const content = document.querySelector('textarea').value;

            // Create paste
            // edit(title, content);
          }}
        ></input>

      </div>
    </div>
  )

}

export default EditPaste