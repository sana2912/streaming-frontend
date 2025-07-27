import { useEffect, useState } from "react";
import { assets } from "../../script_asset/assets";
import { get_playlist_data, playlist_remove_api } from "../../script_asset/playlist_api";
import { useNavigate } from "react-router-dom";


const Playlist = () => {
    const navigator = useNavigate();
    const [data, setData] = useState([]);

    const list_remiving = (list_id) => {
        playlist_remove_api(list_id);
        for (let idx = 0; idx < data.length; idx++) {
            const current = data[idx];
            if (list_id === current.list_id) {
                data.splice(idx, 1);
                break;
            }
        }
    }

    useEffect(() => {
        get_playlist_data(setData);
    }, []);

    return (
        <>
            {
                data.length > 0 ?
                    <div className="grid grid-cols-8 px-8 mt-4 gap-6 max-h-138 overflow-auto">
                        {data.map((item, idx) => {
                            return (
                                <div key={idx} className="flex flex-col gap-1 min-w-40">
                                    <div onClick={() => navigator(`/display/1235/${item.list_id}`)} className="flex items-center justify-center w-40 min-h-40  bg-linear-to-bl from-violet-500 to-fuchsia-500 cursor-pointer hover:opacity-90">
                                        <img className="w-20 h-20" src={assets.disc} />
                                    </div>
                                    <p className="font-bold text-ml text-white">{item.lists}</p>
                                    <img onClick={() => list_remiving(item.list_id)} className="w-5 h-5 cursor-pointer" src={assets.queue_icon} />
                                </div>
                            )
                        })}
                    </div >
                    : <h1 className="text-white px-8 mt-4">ไม่พบข้อมูล</h1>
            }
        </>
    )
}

export default Playlist;