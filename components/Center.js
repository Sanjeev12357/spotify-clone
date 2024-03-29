import { ChevronDownIcon } from '@heroicons/react/outline';
import { useSession } from 'next-auth/react'
import { shuffle } from 'lodash';
import React, { useEffect, useState } from 'react'
import { playlistAtom, playlistIdState, playlistState } from '@/atoms/playlistAtom';
import { useRecoilState, useRecoilValue } from 'recoil';
import useSpotify from '@/hooks/useSpotify';
import Songs from './Songs';

const colors=[
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500",
    "from-yellow-500",
    "from-pink-500",
    "from-purple-500",
    
]

const Center = () => {
    const { data: session, status } = useSession();
    const [color,setColor]=useState(null);
    const playlistId=useRecoilValue(playlistIdState);
    const [playlist,setPlaylist]=useRecoilState(playlistState);
    const spotifyApi=useSpotify();
    useEffect(()=>{
        setColor(shuffle(colors).pop())
        
    },[playlistId])

    useEffect(()=>{
        spotifyApi.getPlaylist(playlistId).then((data)=>{
            setPlaylist(data.body);
        }).catch((err)=>console.log("something went wrong",err));
    },[spotifyApi,playlistId]);

   // console.log(playlist);
if (status === "loading") {
  return <p>Loading...</p>;
}

if (!session) {
  return <p>User not authenticated</p>;
}
console.log(session);
return (
  <div className='h-screen overflow-y-scroll scrollbar-hide  flex-grow  '>
    
    <header className='absolute top-5 right-8'>
      <div className='flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2  '>

     
      <h2 className='text-white'>{session?.user?.name}</h2>
      <ChevronDownIcon className="h-5 w-5"/>

       
      </div>
    </header>
    <section className={`flex items-end  space-x-7 bg-gradient-to-b to-black  ${color} h-80 text-white p-8`}>
        <img className='h-44 w-44 shadow-2xl' src={playlist?.images?.[0]?.url} alt="" />
        <div>
            <p>PLAYLIST</p>
            <h1 className='text-2xl md:text-3xl xl:text-5xl'>{playlist?.name}</h1>
        </div>
    </section>
    <div>
    <Songs/>
    </div>
  </div>
);
}

export default Center