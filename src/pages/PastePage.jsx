import { useParams } from 'react-router-dom'
// import { Client, Databases, Query } from "appwrite";
import { useState, useEffect } from 'react'

import MarkdownPreview from "@uiw/react-markdown-preview";

// const client = new Client();

// const databases = new Databases(client);

// client
//     .setEndpoint('https://fonlogen.it:8056/v1') // Your API Endpoint
//     .setProject('6441c6e7d6448edcc109') // Your project ID
// ;

function PastePage(props) {
  const { pasteID } = useParams()

  const [ document, setDocument ] = useState({
    name: 'Loading...',
    content: 'Loading...',
    createdAt: 'Loading...',
    author: 'Loading...',
  });

  useEffect(() => {

    console.log(pasteID);
    fetch('http://127.0.0.1:3000/api/v1/paste/getPaste/' + pasteID,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => {
      response.json().then(data => {
        console.log(data);
        if (data && data !== null)
          setDocument(data);
      })
    })
  }, [])

  return (
    <div className={"overflow-y-auto w-full grow flex flex-col sm:items-center h-full " + (props.theme === 'dark' ? 'bg-neutral-900 text-white border-zinc-700' : 'text-black')} data-color-mode={props.theme}>
      <div className="w-full sm:w-11/12 md:w-10/12 lg:w-9/12 h-fit sm:border-x p-3 flex flex-col sm:flex-row sm:justify-between sm:gap-4 gap-2 border-b border-inherit" data-color-mode={props.theme}>
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
        className={'border-x h-full grow w-full sm:w-11/12 md:w-10/12 lg:w-9/12 py-2 px-3 ' + (props.theme === 'dark' ? 'darkbgeditor' : '')}
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