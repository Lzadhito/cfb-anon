import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { supabase } from "lib/supabaseClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface Post {
  id: string;
  created_at: string;
  description: string;
}

export default function Home() {
  const newPost = useRef<HTMLTextAreaElement>(null);
  const [toastMessage, setToastMessage] = useState("");
  const [toastErrorMessage, setToastErrorMessage] = useState("");
  const queryClient = useQueryClient();

  const { data, isLoading: loadingQuery } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      supabase
        .from("anon_post")
        .select()
        .order("created_at", { ascending: false }),
  });

  const { mutate, isLoading: loadingMutation } = useMutation({
    mutationKey: ["createPost"],
    mutationFn: (variables) => supabase.from("anon_post").insert([variables]),
    onSuccess: () => {
      queryClient.refetchQueries(["posts"]);
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newPost?.current?.value) return;

    try {
      await mutate({ description: newPost.current.value });
      setToastMessage("Post successfully created!");
      newPost.current.value = "";
    } catch (error: unknown) {
      if (error instanceof Error) {
        setToastErrorMessage(error?.message);
      } else {
        setToastErrorMessage("Post failed!");
      }
    } finally {
      setTimeout(() => {
        setToastErrorMessage("");
        setToastMessage("");
      }, 3000);
    }
  };

  const posts = data?.data as Post[];

  return (
    <div className="bg-base-300">
      <div className="flex flex-col items-center w-screen h-screen pb-28 no-scrollbar overflow-auto">
        <header className="prose lg:prose-s mt-4 text-center">
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            Send message from CFB to CFB <br /> Anonymously!
          </h1>
        </header>

        <main className="px-4">
          {loadingQuery ? (
            <div className="h-screen pb-72 grid justify-center items-center ">
              <progress className="progress w-56 bg-primary" />
            </div>
          ) : (
            <>
              {posts?.map((post) => (
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

        <form
          onSubmit={handleSubmit}
          className="grid grid-flow-col grid-cols-4 items-center gap-4 w-screen shadow-2xl fixed bottom-0 bg-neutral h-24"
        >
          <textarea
            ref={newPost}
            placeholder="Post something ..."
            className="textarea textarea-bordered col-span-4 bg-slate-200 text-black"
          />
          <button
            disabled={loadingMutation}
            type="submit"
            className="material-symbols-rounded"
          >
            send
          </button>
        </form>
      </div>

      {!!toastMessage && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-success">
            <div>
              <span>{toastMessage}</span>
            </div>
          </div>
        </div>
      )}

      {!!toastErrorMessage && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-error">
            <div>
              <span>{toastErrorMessage}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
