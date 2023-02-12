import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { supabase } from "lib/supabaseClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Header from "components/places/Header";
import MainContent from "components/places/MainContent";
import MainLayout from "components/places/MainLayout";
import Toast from "components/events/Toast";
import CreateMessageForm from "components/events/CreateMessageForm";

export default function Home() {
  const inputTextRef = useRef<HTMLTextAreaElement>(null);
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

    if (!inputTextRef?.current?.value) return;

    try {
      mutate({ description: inputTextRef.current.value });
      setToastMessage("Post successfully created!");
      inputTextRef.current.value = "";
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
  
  return (
      <MainLayout>
        <Header />
        <MainContent 
          loading={loadingQuery} 
          data={data?.data}
         />
        <CreateMessageForm 
          inputTextRef={inputTextRef} 
          handleSubmit={handleSubmit} 
          loadingMutation={loadingMutation}
        />
        <Toast 
          message={toastMessage} 
          error={toastErrorMessage} 
        />
    </MainLayout>
  );
}
