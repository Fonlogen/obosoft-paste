/* eslint-disable react/prop-types */

import { useRef } from "react";

import Dialog from "./Dialog";

function Paste(props) {
  const pasteID = useRef(props.id);

  const copyShareLink = () => {
    navigator.clipboard
      .writeText(window.location.origin + "/view/" + pasteID.current)
      .then(
        () => {
          //console.log('Content copied to clipboard');
          /* Resolved - text copied to clipboard successfully */
        },
        () => {
          //console.error('Failed to copy');
          /* Rejected - text failed to copy to the clipboard */
        }
      );
  };

  let contentTrimmed = props.content; // Trim content if it's longer then 100 chars
  if (contentTrimmed.length > 35) {
    contentTrimmed = contentTrimmed.substring(0, 35) + "...";
  }

  let nameTrimmed = props.name; // Trim name if it's longer then 35 chars
  if (nameTrimmed.length > 35) {
    nameTrimmed = nameTrimmed.substring(0, 35) + "...";
  }

  let dateTrimmed = props.createdAt;
  dateTrimmed = dateTrimmed.slice(0, 10).replaceAll("-", "/");

  return (
    <>
      <div
        className={
          "w-full h-fit border-b p-2 flex flex-col overflow-x-hidden " +
          (props.theme === "dark" ? "border-zinc-700" : "")
        }
      >
        <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row justify-between">
          {/* Paste info */}
          <div className="flex flex-col gap-1 grow">
            <span
              className={
                "font-bold text-xl w-full " +
                (props.theme === "dark" ? "text-grey-200" : "")
              }
            >
              {nameTrimmed}
            </span>
            <span className={"font-thinh-fit overflow-x-hidden w-full " + (props.theme === 'dark' ? 'text-gray-500' : 'text-gray-700') }>
              {contentTrimmed}
            </span>
          </div>

          {/* Paste actions */}
          <div className="flex flex-row sm:flex-col justify-between items-end sm:justify-center sm:gap-1">
            <div className="flex flex-row gap-2 items-start">
              {/* Edit paste */}
              {/* <a 
				
							<span className="material-symbols-outlined text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-800 p-1 rounded-lg">
								edit
							</span>
						</a> */}

              {/* Share paste */}
              <a
                className="cursor-pointer"
                onClick={() => {
                  copyShareLink();
                }}
              >
                <span className="material-symbols-outlined text-white bg-green-600 hover:bg-green-700 active:bg-green-800 p-1 rounded-lg">
                  share
                </span>
              </a>

              {/* View paste */}
              <a className="cursor-pointer" href={"/view/" + pasteID.current}>
                <span className="material-symbols-outlined text-white bg-orange-600 hover:bg-orange-700 active:bg-orange-800 p-1 rounded-lg">
                  visibility
                </span>
              </a>

              {/* Delete paste */}
              <a
                className="cursor-pointer"
                onClick={() => {
                  props.delete(pasteID.current);
                }}
              >
                <span className="material-symbols-outlined text-white bg-red-600 hover:bg-red-700 active:bg-red-800 p-1 rounded-lg">
                  delete
                </span>
              </a>
            </div>

            {/* Paste creation date */}
            <span className={"font-thin text-sm text-center h-fit " + (props.theme === 'dark' ? 'text-gray-400' : 'text-gray-600')}>
              {dateTrimmed}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Paste;
