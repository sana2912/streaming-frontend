import { useEffect, useState } from "react"
import { Track_context } from "../context/track_context";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { search_display_api } from "../../script_asset/search_api";
import { assets } from "../../script_asset/assets";

const Display_search = () => {
    const { play_with_ori, play_state, track } = useContext(Track_context);
    const [data, set_data] = useState([]);
    const { field } = useParams();
    useEffect(() => {
        console.log(field);
        search_display_api(set_data, field);
    }, [field]);
    return (
        <>
            {
                data.length > 0 ?
                    <div className="grid grid-cols-8 px-8 mt-4 gap-6 max-h-138 overflow-auto">
                        {
                            data.map((item, idx) => {
                                return (
                                    <div key={idx} onClick={() => play_with_ori(item, 'search')} className="flex flex-col gap-1 min-w-40 cursor-pointer">
                                        <div className="relative">
                                            <img className="w-40 h-40 object-cover" src={item.image} />
                                            {play_state && track._id === item._id ? <img className="absolute w-20 h-20 top-10 left-10 animate-spin" src={assets.disc} /> : <></>}
                                        </div>
                                        <p className="font-bold text-ml text-white">{item.name}</p>
                                        <p className=" text-ml text-white">{item.desc}</p>
                                    </div>
                                )
                            })
                        }
                    </div >
                    : <h2 className="text-xl text-white m-10">ไม่พบรายการค้นหาของคุณ TT</h2>
            }
        </>
    )
}

export default Display_search;