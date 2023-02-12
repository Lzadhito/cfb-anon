import { ToastMessage } from "common/types";

export default function Toast (toastMessage: ToastMessage) {
  const messageType = () => {
    if(toastMessage.message) {
      return 'success';
    }
    if(toastMessage.error) {
      return 'error';
    }
  };

  return (
    <div className="toast toast-top toast-end">
      <div className={`alert alert-${messageType}`}>
        <div>
          <span>{toastMessage.message ? toastMessage.message : toastMessage.error}</span>
        </div>
      </div>
    </div>
  )
}