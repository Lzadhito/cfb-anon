/* eslint-disable no-extra-boolean-cast */
// Need to disable extra boolean because it needed to affect the conditional 
import { ToastMessage } from "common/types";

export default function Toast ({message, error}: ToastMessage) {
  const messageType = () => {
    if (!!message) {
      return "alert alert-success";
    }
    if (!!error) {
      return "alert alert-error";
    }
    return "d-none"
  };

  return (
    <div className={message || error ? "toast toast-top toast-end" : "d-none"}>
      <div className={`${messageType()}`}>
        <div>
          <span>{message ? message : error}</span>
        </div>
      </div>
    </div>
  );
}
