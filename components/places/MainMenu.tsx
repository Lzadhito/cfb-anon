import CreateMessageForm from "components/events/CreateMessageForm";
import Header from "./Header";
import MainContent from "./MainContent";
import MainLayout from "./MainLayout";
import Toast from "components/events/Toast";
import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { supabase } from "lib/supabaseClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function MainMenu() {
  const inputTextRef = useRef<HTMLTextAreaElement>(null);
  const [toastMessage, setToastMessage] = useState("");
  const [toastErrorMessage, setToastErrorMessage] = useState("");
  const queryClient = useQueryClient();

  const { data: chatData, isLoading: loadingQuery } = useQuery({
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

  const onSubmit = async () => {
    try {
      await mutate({ description: inputTextRef.current.value });
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
  }

  const handlePressEnter = async (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      onSubmit();
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputTextRef?.current?.value) return;

    onSubmit();
  };
		
  return (
    <MainLayout>
      <Header />
      <MainContent 
        loading={loadingQuery} 
        data={chatData?.data}
      />
      <CreateMessageForm 
        inputTextRef={inputTextRef} 
        handlePressEnter={handlePressEnter}
        handleSubmit={handleSubmit}
        loadingMutation={loadingMutation}
      />
      <Toast 
        message={toastMessage} 
        error={toastErrorMessage} 
      />  
    </MainLayout>
  )
}
