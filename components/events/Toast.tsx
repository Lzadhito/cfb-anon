import { ToastMessage } from "common/types";

export default function Toast (toastMessage: ToastMessage) {
  return (
   <>
     {!!toastMessage.message && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-success">
            <div>
              <span>{toastMessage.message}</span>
            </div>
          </div>
        </div>
      )}

      {!!toastMessage.error && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-error">
            <div>
              <span>{toastMessage.error}</span>
            </div>
          </div>
        </div>
      )}
   </>
  )
}