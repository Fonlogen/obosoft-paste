/* eslint-disable react/prop-types */

import { useRef } from 'react'

function Paste(props) {

  const pasteID = useRef(props.id);

  const copyShareLink = () => {
    navigator.clipboard.writeText(window.location.origin + "/paste/" + pasteID.current).then(() => {
      //console.log('Content copied to clipboard');
      /* Resolved - text copied to clipboard successfully */
    },() => {
      //console.error('Failed to copy');
      /* Rejected - text failed to copy to the clipboard */
    });
  }

	let contentTrimmed = props.content // Trim content if it's longer then 100 chars
	if (contentTrimmed.length > 35) {
		contentTrimmed = contentTrimmed.substring(0, 35) + '...'
	}

	let nameTrimmed = props.name // Trim name if it's longer then 35 chars
	if (nameTrimmed.length > 35) {
		nameTrimmed = nameTrimmed.substring(0, 35) + '...'
	}
	
  return (
    <div className="w-full h-fit border-b rounded-lg p-2 flex flex-col overflow-x-hidden">
			<div className="flex flex-col gap-4 sm:gap-0 sm:flex-row justify-between">
				{/* Paste info */}
				<div className="flex flex-col gap-1">
					<span className="font-normal text-xl">
						{nameTrimmed}
					</span>
					<span className="font-thin text-gray-500 h-fit overflow-x-hidden">
						{contentTrimmed}
					</span>
				</div>

				{/* Paste actions */}
				<div className="flex flex-row sm:flex-col justify-between items-end sm:justify-center sm:gap-1">
					<div className="flex flex-row gap-2 items-start">
						{/* Edit paste */}
						<a className="cursor-pointer">
							<span className="material-symbols-outlined text-white bg-blue-400 p-1 rounded-lg">
								edit
							</span>
						</a>

						{/* Share paste */}
						<a 
              className="cursor-pointer"
              onClick={() => {
                copyShareLink();
              }}
            >
							<span className="material-symbols-outlined text-white bg-green-400 p-1 rounded-lg">
								share
							</span>
						</a>

						{/* View paste */}
						<a 
              className="cursor-pointer"
              href={"/paste/" + pasteID.current}
            >
							<span className="pointer-events-none material-symbols-outlined text-white bg-orange-400 p-1 rounded-lg">
								visibility
							</span>
						</a>

						{/* Delete paste */}
						<a 
              className="cursor-pointer"
              onClick={() => {
                props.delete(props.idx);
              }}
            >
							<span className="material-symbols-outlined text-white bg-red-400 p-1 rounded-lg">
								delete
							</span>
						</a>
					</div>

					{/* Paste creation date */}
					<span className="font-thin text-sm text-center text-gray-400 h-fit">
						{props.createdAt}
					</span>
				</div>
			</div>
    </div>
  )
}

export default Paste