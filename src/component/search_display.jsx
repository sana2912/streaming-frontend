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
        <div className="h-full p-4">
            {
                data.length > 0 ?
                    <div className="flex flex-col h-full overflow-y-auto">
                        {
                            data.map((item, idx) => {
                                return (
                                    <div key={idx} onClick={() => play_with_ori(item, 'search')} className="mb-4 flex flex-col sm:flex-row gap-2 md:gap-6 min-w-40 cursor-pointer">
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
                            })
                        }
                    </div >
                    : <h2 className="text-xl text-white m-10">ไม่พบรายการค้นหาของคุณ TT</h2>
            }
        </div>
    )
}

export default Display_search;