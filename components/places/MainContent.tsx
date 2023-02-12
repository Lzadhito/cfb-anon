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
          {postData?.data.map(({id, created_at, description, key}: Data) => (
            <PostDetail 
              id={id} 
              created_at={created_at} 
              description={description} 
              key={key}
            />
          ))}
        </>
      )}
    </main>
  )
}
