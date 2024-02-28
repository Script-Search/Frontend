import { IResult } from "./IResult"
import React, { useState } from "react";
import Image from "next/image";

type Props = {
    videoInfo: IResult;
}

const timestampConversion = (time:number) => {
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor((time % 3600) / 60);
    let seconds = time % 60;

    let formattedMinutes = minutes.toString().padStart(2, '0');
    let formattedSeconds = seconds.toString().padStart(2, '0');

    if (hours > 0) {
        return `${hours}:${formattedMinutes}:${formattedSeconds}`;
    } else {
        return `${formattedMinutes}:${formattedSeconds}`;
    }
}

const snippetConversion = (snippet: string) => {
    let re = /<mark>/gi;
    let index = snippet.search(re);

    let re2 = /<\/mark>/gi;
    let index2 = snippet.search(re2);

    return (
        <div>
            {snippet.substring(0, index)}
            <b>{snippet.substring(index + 6, index2)}</b>
            {snippet.substring(index2 + 7)}
        </div>
    );
}

const Card = ({videoInfo}: Props) => {
    const thumbnailLink = "https://i.ytimg.com/vi/" + videoInfo.video_id + "/mqdefault.jpg";
    return (
        <div className="border rounded border-gray-500 p-2 m-2">
            <Image
                    className="relative w-auto"
                    src={thumbnailLink}
                    alt="Logo"
                    width={180}
                    height={37}
                    priority
                />
            <p className="text-xl font-bold">{videoInfo.title}</p>
            <p className="italic">{videoInfo.channel_name}</p>
            
            <div className="flex flex-col">
                {videoInfo.matches.map((result, index) => {
                    return (
                        <div key={index} className="my-3">
                            <a href={`https://youtu.be/${videoInfo.video_id}?t=${result.timestamp}`} className="font-bold text-blue-500">
                                {timestampConversion(result.timestamp)}
                            </a>
                            <span dangerouslySetInnerHTML={{ __html: result.snippet.replaceAll("mark", "b") }} />
                        </div>
                    );                    
                })
                }
            </div>
        </div> 
    )   
};
export default Card;