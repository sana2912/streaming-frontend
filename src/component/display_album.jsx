import { assets } from "../../script_asset/assets";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
import { Track_context } from '../context/track_context';

const Display_AL = () => {
    const [data, set_data] = useState(null);
    const { play_with_ori, album_data, track_data, set_album_track } = useContext(Track_context);
    const { id } = useParams();

    const set_al_data = (items) => {
        let arr = [];
        track_data.forEach(element => {
            if (element.album === items.name) {
                arr.push(element);
            }
        });
        set_album_track(arr);
    }

    const get_album = (album_data, set_data, id) => {
        for (let items of album_data) {
            if (items._id === id) {
                set_data(items);
                set_al_data(items);
                return;
            }
        }
    }

    useEffect(() => {
        get_album(album_data, set_data, id);
    }, [album_data])

    if (!data) return <></>
    return (
        <div className="h-full flex flex-col">
            <div className="h-4/10 flex gap-4 px-4 py-4 text-white">
                <img className="size-30 sm:size-40 object-cover" src={data.image} />
                <div className="flex flex-col gap-3">
                    <p className="hidden sm:block text-ml font-medium">ลิตส์</p>
                    <h1 className="text-lg sm:text-3xl font-bold">{data.name}</h1>
                    <p className="text-sm sm:text-xl font-semibold">{data.desc}</p>
                    <p className="hidden sm:flex items-center gap-1 text-ml font-medium">
                        <img className="inline w-6 h-6" src={assets.spotify_logo} /><b className="hidden sm:block">stream</b>
                    </p>
                </div>
            </div>
            <div className="h-6/10">
                <div className="h-1/5 border-b-1 border-neutral-400 text-[0.8rem] sm:text-lg text-white flex justify-between p-4">
                    <p className="w-[20%] text-neutral-400 font-medium"># เพลง</p>
                    <p className="w-[40%] md:w-[20%] text-neutral-400 font-medium">อัลบัม</p>
                    <div className="w-[20%]">
                        <img className="h-5 w-5" src={assets.clock_icon} />
                    </div>
                </div>
                <div className="max-h-4/5 overflow-scroll">
                    {track_data.map((items, idx) => {
                        if (items.album === data.name) {
                            return (
                                <div key={idx} onClick={() => play_with_ori(items, 'album')} className="text-[0.8rem] sm:text-lg text-white flex justify-between px-4 my-4 cursor-pointer hover:bg-white">
                                    <div className="flex gap-2 items-end w-[20%]">
                                        <img className="w-9 h-9 object-cover" src={items.image} />
                                        <p className="hidden md:block text-neutral-400 font-medium">{items.name}</p>
                                    </div>
                                    <p className="flex items-end text-neutral-400 w-[40%] md:w-[20%] font-medium">{data.name}</p>
                                    <p className="flex items-end text-neutral-400 w-[20%] font-medium">{items.duration}</p>
                                </div>
                            )
                        }
                    })}
                </div >
            </div>
        </div>
    )
}
export default Display_AL;