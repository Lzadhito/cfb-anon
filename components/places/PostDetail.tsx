import { Data } from "common/types";
import Image from "next/image";
import AnonymousImage from "styles/images/anonymous.jpg";
import countHistoryTime from "utilities/formatter";

export default function PostDetail ({id, createdAt: created_at, description}: Data) {
  return (
    <article
      key={id}
      className="card w-full bg-primary text-primary-content h-fit mt-10"
    >
      <div className="p-5 pb-3 pt-3">
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <Image height={100} width={100} src={AnonymousImage} alt='avatar' />
            </div>
          </div>
          <div className="chat-header">
                  Anonymous CFB Mania
            <time className="text-xs opacity-50 ml-2">
              {countHistoryTime(new Date(created_at))}
            </time>
          </div>
          <div className="chat-bubble mt-2">{description}</div>
        </div>
      </div>
      <div className="p-5 pt-0">
        <button className="btn btn-accent btn-sm">
            Reply
        </button>
        <button className="btn btn-secondary btn-sm ml-3">
            &hearts;
        </button>
      </div>
    </article>
  )
}
