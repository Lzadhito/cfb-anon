import { Data, PostData } from "common/types";

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
            <div className="card-body">
              <p>{post.description}</p>
              <sub className="text-right bold text-slate-200 font-medium">
                {new Date(post.created_at).toLocaleDateString(undefined, {
                  hour: "2-digit",
                  minute: "2-digit",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </sub>
            </div>
          </article>
        ))}
      </>
    )}
  </main>
  )
}