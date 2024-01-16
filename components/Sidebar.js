import React, { useEffect, useState } from "react";
import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
 
} from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import useSpotify from "@/hooks/useSpotify";
import { useRecoilState } from "recoil";
import { playlistIdState } from "@/atoms/playlistAtom";

const Sidebar = () => {
  const {data:session,status}=useSession();
  const spotifyApi=useSpotify();
 
  ///console.log("session..",session);

  const [playlists,setPlaylists]=useState([]);
  const [playlistId,setPlaylistId]=useRecoilState(playlistIdState);
  console.log("playlistid",playlistId);


  useEffect(() => {
   // console.log("Access Token:", session?.user.accessToken);
  //  console.log(spotifyApi.getAccessToken());
    if(spotifyApi.getAccessToken()){
      
      spotifyApi.getUserPlaylists().then((data)=>{
       //console.log("data",data);
        setPlaylists(data.body.items);
      })
    }    
}, [session, spotifyApi]);


  console.log("playlists",playlists);

  return (
    <div className="text-gray-500 p-5 text-xs border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen lg:text-sm sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex pb-36">
      <div className="space-y-4">
      {
        session!==null?(
          <button onClick={()=>signOut()} className="flex items-center space-x-2 hover:text-white  " >
        
          <p>Logout</p>
        </button>):(<Link href="/login">Login</Link>)
        
      }
      
     
        <button className="flex items-center space-x-2 hover:text-white  " >
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white  ">
          <SearchIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white  ">
          <LibraryIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button>

        <hr className="border-t-[0.1px] border-gray-900"/>
        <button className="flex items-center space-x-2 hover:text-white  " >
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white  ">
        <HeartIcon className="h-5 w-5" />
        <p>Liked Songs</p>
      </button>
        <button className="flex items-center space-x-2 hover:text-white  ">
          <RssIcon className="h-5 w-5" />
          <p>Your Episodes</p>
        </button>

        <hr className="border-t-[0.1px] border-gray-900"/>
       
        {/*playlist */}


        
        {
          
          playlists.map((playlist)=>(
            <p onClick={()=>setPlaylistId(playlist.id)} key={playlist.id} className="cursor-pointer hover:text-white">
            {playlist.name}
            </p>
          ))
        }
        
        
      </div>
    </div>
  );
};

export default Sidebar;
