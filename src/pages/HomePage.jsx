/* eslint-disable react/prop-types */
import { Client, Databases, ID } from "appwrite";

const client = new Client();

const databases = new Databases(client);

client
  .setEndpoint("https://obosoft.it:8056/v1") // Your API Endpoint
  .setProject("6441c6e7d6448edcc109"); // Your project ID

function HomePage(props) {

  const createPaste = (title, content) => {
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

    const promise = databases.createDocument(
      "6441d733de9b8ae7a88b",
      "6447132ebfc2884a8f60",
      ID.unique(),
      {
        name: title,
        content: content,
        owner: owner,
        createdAt: datetime,
      });

    promise.then(function (response) {
      console.log(response);
    }, function (error) {
      console.log(error);
    });
  };
  
  return (
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
              document.querySelector('input[type="text"]').value = '';
              document.querySelector('textarea').value = '';  
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

              // Create paste
              createPaste(title, content);
            }}
          ></input>

        </div>
      </div>
    </div>
  )
}

export default HomePage