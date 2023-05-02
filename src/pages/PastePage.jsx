import { useParams } from 'react-router-dom'
import { Client, Databases, Query } from "appwrite";
import { useState, useEffect } from 'react'

import MarkdownPreview from "@uiw/react-markdown-preview";

const client = new Client();

const databases = new Databases(client);

client
    .setEndpoint('https://obosoft.it:8056/v1') // Your API Endpoint
    .setProject('6441c6e7d6448edcc109') // Your project ID
;

function PastePage() {
  const { pasteID } = useParams()

  const [ document, setDocument ] = useState({
    name: 'Loading...',
    content: 'Loading...',
    createdAt: 'Loading...',
    author: 'Loading...',
  });

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

  return (
    <div className="overflow-y-auto w-full grow flex flex-col sm:items-center h-full">
      <div className="w-full sm:w-11/12 md:w-10/12 lg:w-9/12 h-fit sm:border-x p-3 flex flex-col sm:flex-row sm:justify-between sm:gap-4 gap-2 border-b">
        <span className='flex text-2xl font-bold text-center items-center grow'>
          {
            document.name || "Loading..."
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
      <MarkdownPreview source={document.content}
        className='border-x h-full grow w-full sm:w-11/12 md:w-10/12 lg:w-9/12 py-2 px-3'
        />
      {/* <div className='border-x h-full grow w-full sm:w-11/12 md:w-10/12 lg:w-9/12 py-2 px-3'>
        {
          document.content || "Loading..."
        }
      </div> */}
    </div>
  )

}

export default PastePage