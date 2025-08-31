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
        <div className="h-full p-4">
            {
                data.length > 0 ?
                    <div className="flex flex-col h-full overflow-y-auto">
                        {data.map((item, idx) => {
                            return (
                                <div key={idx} className="mb-4 flex flex-col md:flex-row gap-2 md:gap-4 w-full">
                                    <div onClick={() => navigator(`/display/1235/${item.list_id}`)} className="flex items-center justify-center size-30 md:size-40  bg-linear-to-bl from-violet-500 to-fuchsia-500 cursor-pointer hover:opacity-90">
                                        <img className="w-1/2 h-1/2" src={assets.disc} />
                                    </div>
                                    <div className="flex self-end gap-4 w-full md:w-fit">
                                        <p className="text-ml text-white">{item.lists}</p>
                                        <img onClick={() => list_remiving(item.list_id)} className="w-5 h-5 cursor-pointer" src={assets.remove} />
                                    </div>

                                </div>
                            )
                        })}
                    </div >
                    : <h1 className="text-white px-8 mt-4">ไม่พบข้อมูล</h1>
            }
        </div>
    )
}

export default Playlist;