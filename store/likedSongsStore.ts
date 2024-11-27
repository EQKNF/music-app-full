import { create } from "zustand";

interface LikedSongsState {
  likedSongs: Record<string, boolean>; // { songId: boolean }
  toggleLike: (songId: string) => void;
  setLiked: (songId: string, isLiked: boolean) => void;
}

const useLikedSongsStore = create<LikedSongsState>((set) => ({
  likedSongs: {},
  toggleLike: (songId) =>
    set((state) => ({
      likedSongs: {
        ...state.likedSongs,
        [songId]: !state.likedSongs[songId],
      },
    })),
  setLiked: (songId, isLiked) =>
    set((state) => ({
      likedSongs: {
        ...state.likedSongs,
        [songId]: isLiked,
      },
    })),
}));

export default useLikedSongsStore;
