"use client";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";

import Image from "next/image";

interface MediaItemProps {
  data: Song;
  onclick?: (id: string) => void;
}

const MediaItem = ({ data, onclick }: MediaItemProps) => {
  const imageUrl = useLoadImage(data);

  const handleClick = () => {
    if (onclick) {
      onclick(data.id);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md"
    >
      <div className="relative rounded-md min-h-[48px] min-v-[48px] overflow-hidden">
        <Image
          fill
          src={imageUrl || "/images/liked.png"}
          alt="Media Item"
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default MediaItem;