import { Data, PostData } from "common/types";
import PostDetail from "./PostDetail";

export default function MainContent (postData: PostData) {
  return (
    <main className="px-4">
      {postData.loading ? (
        <div className="h-screen pb-72 grid justify-center items-center ">
          <progress className="progress w-56 bg-primary" />
        </div>
      ) : (
        <>
          {postData?.data.map((post: Data, key: number) => (
            <PostDetail id={post.id} createdAt={post.created_at} description={post.description} data={post} key={key} />
          ))}
        </>
      )}
    </main>
  )
}
