import { Data, PostData } from "common/types";
import Image from "next/image";
import AnonymousImage from "styles/images/anonymous.jpg";
import countHistoryTime from "utilities/formatter";

export default function MainContent (postData: PostData) {
  return (
    <main className="px-4">
      {postData.loading ? (
        <div className="h-screen pb-72 grid justify-center items-center ">
          <progress className="progress w-56 bg-primary" />
        </div>
      ) : (
        <>
          {postData?.data.map((post: Data) => (
            <article
              key={post.id}
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
                      {countHistoryTime(new Date(post.created_at))}
                    </time>
                  </div>
                  <div className="chat-bubble mt-2">{post.description}</div>
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
          ))}
        </>
      )}
    </main>
  )
}
