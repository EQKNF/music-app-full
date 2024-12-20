"use client";

import LikeButton from "@/components/LikeButton";
import MediaItem from "@/components/MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "@/types";

interface SearchContentProps {
  songs: Song[];
}
const SearchContent = ({ songs }: SearchContentProps) => {
  const onPlay = useOnPlay(songs);

  if (songs.length === 0)
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        No songs found.
      </div>
    );

  return (
    <div className="flex flex-col gap-y-2 w-full px-6">
      {songs.map((song) => (
        <div className="flex item-center gap-x-4 w-full" key={song.id}>
          <div className="flex-1">
            <MediaItem onclick={(id: string) => onPlay(id)} data={song} />
          </div>
          <div>
            <LikeButton songId={song.id} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchContent;
