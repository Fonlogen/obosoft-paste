import { useRef } from 'react'

function Dialog(props) {

  const deleteButton = useRef(props.deleteButton || false)
  const abortButton = useRef(props.abortButton || false)
  const okButton = useRef(props.okButton || false)
  const confirmButton = useRef(props.confirmButton || false)
  const cancelButton = useRef(props.cancelButton || false)

  return (
    <div className="flex absolute z-10 w-full h-full bg-black/50 justify-center">
      <div className="flex flex-col w-full h-full items-center justify-center">
        <div className="flex relative margin-x-auto flex-col bg-white rounded-xl w-10/12 h-fit px-3 py-2 gap-1">
          <span className="font-bold text-2xl border-b pb-1">{props.title || "Loading..."}</span>
          <span className="text-lg">{props.description || "Loading..."}</span>
          <div className="flex flex-row items-center justify-end py-1 gap-2">
            {
              deleteButton.current && 
              (
                <input 
                  className='dialog-button bg-red-500 hover:bg-red-600 active:bg-red-800'
                  type='button' 
                  value="Delete"
                ></input>
              )
            }
            {
              abortButton.current &&
              (
                <input
                  className='dialog-button bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700' 
                  type='button' 
                  value="Abort"
                ></input>
              )
            }
            {
              cancelButton.current &&
              (
                <input
                  className='dialog-button bg-orange-500 hover:bg-orange-600 active:bg-orange-700' 
                  type='button' 
                  value="Cancel"
                  onClick={() => {
                    props.cancelCallback() || console.log("Cancel Button")
                  }}
                ></input>
              )
            }
            {
              okButton.current &&
              (
                <input
                  className='dialog-button bg-blue-500 hover:bg-blue-600 active:bg-blue-700' 
                  type='button' 
                  value="Ok"
                  onClick={() => {
                    props.okCallback() || console.log("OK Button")
                  }}
                ></input>
              )
            }
            {
              confirmButton.current &&
              (
                <input
                  className='dialog-button bg-green-500 hover:bg-green-600 active:bg-green-700' 
                  type='button' 
                  value="Confirm"
                  onClick={() => {
                    props.confirmCallback() || console.log("Confirm Button")
                  }}
                ></input>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )

}

export default Dialog