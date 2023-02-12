import { SubmitForm } from "common/types";

export default function CreateMessageForm (submitForm: SubmitForm) {
  return (
    <form
      onSubmit={submitForm.handleSubmit}
      className="grid grid-flow-col grid-cols-4 items-center gap-4 w-screen shadow-2xl fixed bottom-0 bg-neutral h-24"
    >
      <textarea
        ref={submitForm.inputTextRef}
        style={{
          resize: 'none'
        }}
        placeholder="Post something ..."
        className="textarea textarea-bordered col-span-4 bg-slate-200 text-black ml-3"
      />
      <div className="card-body pr-3 pl-0">
        <button
          disabled={submitForm.loadingMutation}
          type="submit"
          className="btn btn-secondary btn-sm material-symbols-rounded"
        >
        send
        </button>
      </div>
    </form>
  )
}
