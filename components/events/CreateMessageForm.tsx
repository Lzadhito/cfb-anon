import { SubmitForm } from "common/types";

export default function CreateMessageForm (submitForm: SubmitForm) {
    return (
        <form
          onSubmit={submitForm.handleSubmit}
          className="grid grid-flow-col grid-cols-4 items-center gap-4 w-screen shadow-2xl fixed bottom-0 bg-neutral h-24"
        >
          <textarea
            ref={submitForm.inputTextRef}
            placeholder="Post something ..."
            className="textarea textarea-bordered col-span-4 bg-slate-200 text-black"
          />
          <button
            disabled={submitForm.loadingMutation}
            type="submit"
            className="material-symbols-rounded"
          >
            send
          </button>
        </form>
    )
  }