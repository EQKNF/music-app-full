"use client";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import Button from "./Button";
import { toast } from "react-hot-toast";
import useLikedSongsStore from "@/store/likedSongsStore";

interface LikeButtonProps {
  songId: string;
}

const LikeButton = ({ songId }: LikeButtonProps) => {
  const { supabaseClient } = useSessionContext();
  const authModal = useAuthModal();
  const { user } = useUser();

  const { likedSongs, toggleLike, setLiked } = useLikedSongsStore();
  const isLiked = likedSongs[songId] || false;

  useEffect(() => {
    if (!user?.id) return;

    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from("liked_songs")
        .select("*")
        .eq("user_id", user.id)
        .eq("song_id", songId)
        .single();

      if (!error && data) {
        setLiked(songId, true);
      }
    };

    fetchData();
  }, [songId, supabaseClient, user?.id, setLiked]);

  const handleLike = async () => {
    if (!user) {
      return authModal.onOpen();
    }

    if (isLiked) {
      const { error } = await supabaseClient
        .from("liked_songs")
        .delete()
        .eq("user_id", user.id)
        .eq("song_id", songId);

      if (error) {
        toast.error(error.message);
      } else {
        toggleLike(songId);
      }
    } else {
      const { error } = await supabaseClient
        .from("liked_songs")
        .insert({ song_id: songId, user_id: user.id });

      if (error) {
        toast.error(error.message);
      } else {
        toggleLike(songId);
        toast.success("Liked!");
      }
    }
  };

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  return (
    <Button className="hover:opacity-75 transition" onClick={handleLike}>
      <Icon color={isLiked ? "#ec4899" : "white"} size={25} />
    </Button>
  );
};

export default LikeButton;
