import { useState, useEffect } from "react";
import { supabase } from "lib/supabaseClient";
// Enable this below package later after sync with database field on Supabase
// import cookies from "next-cookies";
import { CommentLikes } from "common/types";

// TODOS: Need to align with database on Supabase for next feature
const useCommentLike = ({ id: postId }: CommentLikes) => {
  const [comments, setComments] = useState<any>([]);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const commentsRes = await supabase
        .from("comments")
        .select()
        // .where({ id: postId });

      setComments(commentsRes.data);

      const likesRes = await supabase
        .from("likes")
        .select()
        // .where({ id: postId });

      setLikes(likesRes?.data?.length);
    };

    fetchData();
  }, [postId]);

  const handleCommentSubmit = async ({ text }: CommentLikes) => {
    const user = cookies().user;
    if (!user) return;

    const commentRes = await supabase
      .from("comments")
      .insert({ text, id: postId, user_id: user.id });

    setComments([...comments, commentRes.data]);
  };

  const handleLike = async () => {
    const user = cookies().user;
    if (!user) return;

    await supabase
      .from("likes")
      .insert({ id: postId, user_id: user.id });

    setLikes(likes + 1);
  };

  return { comments, likes, handleCommentSubmit, handleLike };
};

export default useCommentLike;
