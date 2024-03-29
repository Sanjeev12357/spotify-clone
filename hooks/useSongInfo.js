import React, { useEffect, useState } from 'react'
import useSpotify from './useSpotify';
import { currentTrackIdState } from '@/atoms/songAtom';
import { useRecoilState } from 'recoil';

const useSongInfo = () => {

    const spotifyApi=useSpotify();
    const [currentIdTrack,setCurrentIdTrack]=useRecoilState(currentTrackIdState);

    const [songInfo,setSongInfo]=useState(null);
    useEffect(()=>{
        const fetchSongInfo=async()=>{
            console.log("currentIdtrack",currentIdTrack);
            if(currentIdTrack){
                const trackInfo =await fetch(`https://api.spotify.com/v1/tracks/${currentIdTrack}`,
                {
                    headers:{
                        Authorization:`Bearer ${spotifyApi.getAccessToken()}`,
                    }
                }).then(res => res.json());
                setSongInfo(trackInfo);
                console.log("trackinfo",trackInfo);
            }
        }
        fetchSongInfo();

    },[currentIdTrack,spotifyApi]);

  return songInfo;
}

export default useSongInfo