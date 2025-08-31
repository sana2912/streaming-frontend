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
        <div className="h-full p-4">
            {
                data.length > 0 ?
                    <div className="flex flex-col h-full overflow-y-auto">
                        {data.map((item, idx) => {
                            return (
                                <div key={idx} onClick={() => play_with_ori(item, page)} className="mb-4 flex flex-col sm:flex-row gap-2 md:gap-6 min-w-40 cursor-pointer">
                                    <div className="relative size-fit">
                                        <img className="size-30 md:size-40 object-cover" src={item.image} />
                                        {play_state && track._id === item._id ? <img className="absolute size-[60%] top-[20%] left-[20%] animate-spin" src={assets.disc} /> : <></>}
                                    </div>
                                    <div className="flex flex-col sm:self-end">
                                        <p className="font-medium text-[18px] md:text-lg text-white">{item.name}</p>
                                        <p className="font-medium text-[12px] md:text-sm text-white">{item.desc}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    : <h1 className="text-white px-8 mt-4">ไม่พบข้อมูล</h1>
            }
        </div>
    )
}

export default Display_track;