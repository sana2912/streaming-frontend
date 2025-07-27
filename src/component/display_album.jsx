import { assets } from "../../script_asset/assets";
import { useParams } from "react-router-dom";
import Nav from "./navbar";
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

    return data ? (
        <>
            <div className="flex gap-4 px-4 text-white mt-4">
                <img className="w-40 h-40 object-cover" src={data.image} />
                <div className="flex flex-col gap-3">
                    <p className="text-ml font-medium">ลิตส์</p>
                    <h1 className="text-3xl font-bold">{data.name}</h1>
                    <p className="text-xl font-semibold">{data.desc}</p>
                    <p className="text-ml font-medium flex items-center gap-1">
                        <img className="inline w-6 h-6" src={assets.spotify_logo} /><b>stream</b>{'1,326,454'} like<b>50 song</b>{'about 1 hour'}
                    </p>
                </div>
            </div>
            <div className="text-white grid grid-cols-4 gap-50 mt-4 mb-1 px-4">
                <p className="text-neutral-400 font-medium"># เพลง</p>
                <p className="text-neutral-400 font-medium">อัลบัม</p>
                <p className="text-neutral-400 font-medium">วันที่</p>
                <img className="h-5 w-5" src={assets.clock_icon} />
            </div>
            <hr className="h-[2px] bg-neutral-400 mx-4" />
            <div className=" mx-4 overflow-y-auto h-80">
                {track_data.map((items, idx) => {
                    if (items.album === data.name) {
                        return (
                            <div key={idx} onClick={() => play_with_ori(items, 'album')} className="text-white grid grid-cols-4 items-end gap-50 mb-1 my-4 cursor-pointer hover:bg-white/10">
                                <div className="flex gap-2 items-end w-[200px]">
                                    <img className="w-9 h-9 object-cover" src={items.image} />
                                    <p className="text-neutral-400 font-medium">{items.name}</p>
                                </div>
                                <p className="text-neutral-400 font-medium ">{data.name}</p>
                                <p className="text-neutral-400 font-medium">{'5 วันที่แล้ว'}</p>
                                <p className="text-neutral-400 font-medium">{3.00}</p>
                            </div>
                        )
                    }
                })}
            </div >
        </>
    ) : (
        <></>
    )
}
export default Display_AL;