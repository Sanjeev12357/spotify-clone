import { playlistState } from "@/atoms/playlistAtom";
import React from "react";
import { useRecoilValue } from "recoil";
import Song from "./Song";

const Songs = () => {
  const playlist = useRecoilValue(playlistState);
 // console.log("songs", playlist);
 // console.log("1", playlist?.tracks?.items);
  return (
    <div className="px-8 flex flex-col space-y-1 pb-28 text-white">
      {playlist?.tracks.items.map((track,i) => (
        //console.log(track.track.name),
        
        <Song key={track.track.id} track={track} order={i}  />
      ))}
    </div>
  );
};

export default Songs;
