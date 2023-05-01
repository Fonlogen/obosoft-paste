/* eslint-disable react/prop-types */
import { Client, Databases, ID } from "appwrite";
import Dialog from "../components/Dialog";

import { useState, useRef } from 'react'

const client = new Client();

const databases = new Databases(client);

client
  .setEndpoint("https://obosoft.it:8056/v1") // Your API Endpoint
  .setProject("6441c6e7d6448edcc109"); // Your project ID

function HomePage(props) {

  const [guestDialog, showGuestDialog] = useState(false)

  const dialogProps = useRef({})

  const createPaste = (title, content) => {
    
    title = dialogProps.current.title;
    content = dialogProps.current.content;

    if (!title) return;
    if (!content) return;

    let owner = 'guest';

    if (props.account) {
      owner = props.account.$id;
    }

    let currentdate = new Date();
    let datetime =
      currentdate.getFullYear() +
      "-" +
      (currentdate.getMonth() + 1) +
      "-" +
      currentdate.getDate();

    let uuid = ID.unique();

    const promise = databases.createDocument(
      "6441d733de9b8ae7a88b",
      "6447132ebfc2884a8f60",
      uuid,
      {
        name: title,
        content: content,
        owner: owner,
        owner_displayname: props.account.name,
        createdAt: datetime,
      });

    promise.then(function (response) {
      //console.log(response);
      let link = window.location.origin + "/view/" + response.$id
      copyShareLink(link);
      window.location.href = link
    }, function (error) {
      console.log(error);
    });

    clearInputs()
  };

  const guestCancelCallback = () => {
    showGuestDialog(false)
  }

  const guestConfirmCallback = (title, content) => {
    console.log(title)
    createPaste(title, content)
  }

  const copyShareLink = (link) => {
    navigator.clipboard.writeText(link).then(() => {
      alert("Paste link copied in clipboard");
      //console.log('Content copied to clipboard');
      /* Resolved - text copied to clipboard successfully */
    },() => {
      //console.error('Failed to copy');
      /* Rejected - text failed to copy to the clipboard */
    });
  }

  const confirmCreatePaste = (title, content) => {
    if (!props.account) {
      showGuestDialog(true)
      return
    }
    createPaste(title, content)
  }

  
  
  const clearInputs = () => {
    document.querySelector('input[type="text"]').value = '';
    document.querySelector('textarea').value = '';  
  }

  return (
    <>
      {
        guestDialog &&
        (
          <Dialog 
            confirmButton={true} cancelButton={true} okButton={false}
            title='Confirm action' 
            description='Are you sure you want to publish this paste as Guest? Remember that in the future you will not be able to modify or remove it' 
            confirmCallback={guestConfirmCallback}
            cancelCallback={guestCancelCallback}
          />
        )
      }
    <div className="w-full grow flex flex-col sm:justify-center sm:items-center">
      <div className="w-full sm:w-11/12 md:w-10/12 lg:w-9/12 h-full sm:border-x p-3 flex flex-col gap-4">
        <input 
          type="text" 
          className="w-full h-10 border-b bg-white px-3 py-3 outline-none text-xl font-bold" 
          placeholder="New paste..." 
          maxLength={250} />
        {/* Create non resizable text area */}
        <textarea className="paste-textarea" placeholder="Your paste..." />
        <div className="flex flex-col-reverse gap-3 sm:flex-row items-center justify-between">
          <span>
            Want to start over?&nbsp;
            <a
            className="text-orange-500 cursor-pointer hover:text-orange-700 font-normal hover:underline active:text-orange-400 rounded-xl"
            onClick={() => {
              // Clear title and content
              clearInputs();
            }}
            >
              Delete everything
            </a>
            .
          </span>
          <input 
            className="w-fit text-xl text-white bg-orange-400 hover:bg-orange-500 cursor-pointer rounded-xl p-2 px-10"
            type='button' 
            value="Create"
            onClick={() => {
              // Get title and content
              const title = document.querySelector('input[type="text"]').value;
              const content = document.querySelector('textarea').value;

              dialogProps.current.title = title;
              dialogProps.current.content = content;

              // Create paste
              confirmCreatePaste(title, content);
            }}
          ></input>

        </div>
      </div>
    </div>
    </>
  )
}

export default HomePage