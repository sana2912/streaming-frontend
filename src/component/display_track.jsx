import { useContext, useEffect, useState } from "react";
import { Track_context } from "../context/track_context";
import { assets } from "../../script_asset/assets";
import { useParams } from "react-router-dom";
import { get_like_data } from "../../script_asset/like_api";
import { list_tracks } from "../../script_asset/playlist_api";



const Display_track = () => {
    const { _id } = useParams();
    const { play_with_ori, play_state, track, set_like_track, set_list_track } = useContext(Track_context);
    const [data, setData] = useState([]);
    const [page, set_page] = useState('like');

    useEffect(() => {
        if (_id === 'liked') {
            get_like_data(setData, set_like_track);
            set_page('like');
        }
        else {
            list_tracks(_id, setData, set_list_track);
            set_page('list');
        }

    }, [_id])
    return (
        <>
            {
                data.length > 0 ?
                    <div className="grid grid-cols-8 px-8 mt-4 gap-6 max-h-138 overflow-auto">
                        {data.map((item, idx) => {
                            return (
                                <div key={idx} onClick={() => play_with_ori(item, page)} className="flex flex-col gap-1 min-w-40 cursor-pointer">
                                    <div className="relative">
                                        <img className="w-40 h-40 object-cover" src={item.image} />
                                        {play_state && track._id === item._id ? <img className="absolute w-20 h-20 top-10 left-10 animate-spin" src={assets.disc} /> : <></>}
                                    </div>
                                    <p className="font-bold text-ml text-white">{item.name}</p>
                                    <p className=" text-ml text-white">{item.desc}</p>
                                </div>
                            )
                        })}
                    </div>
                    : <h1 className="text-white px-8 mt-4">ไม่พบข้อมูล</h1>
            }
        </>
    )
}

export default Display_track;