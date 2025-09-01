import { useEffect, useState } from "react";
import { assets } from "../../script_asset/assets"
import { useNavigate } from "react-router-dom";
import { search_field_api } from "../../script_asset/search_api";
const Search_field = () => {
    const [field_data, set_field_data] = useState([]);
    const [field, set_field] = useState('');
    const navigator = useNavigate();

    function to_display(navigate) {
        if (field !== "") {
            set_field('');
            set_field_data([]);
            navigator(`/search/${navigate}`)
        }
    }
    useEffect(() => {
        if (field !== '') {
            search_field_api(set_field_data, field);
        }
        else {
            set_field('');
            set_field_data([]);
        }
    }, [field]);
    return (
        <>
            <div className="flex relative items-center justify-between bg-neutral-800 h-7 w-[100%] rounded-full px-2 py-[2px]">
                <input onChange={(event) => set_field(event.target.value)} className="h-full w-[80%] text-white text-[14px] focus:outline-none focus:ring-0 focus:border-transparent" type="search" name="s_field" id="s_feild" value={field} autoComplete="off" />
                <button onClick={() => to_display(field)} className="cursor-pointer h-full"><img src={assets.search_icon} className="h-9/10" /></button>
                <div className="flex flex-col gap-1 absolute top-10 left-0 rounded-[10px] w-[100%] bg-neutral-900 z-1">
                    {field_data.map((item, idx) => {
                        return (
                            <p onClick={() => to_display(item.name)} className="text-white m-1 cursor-pointer" key={idx}>{item.name}</p>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Search_field;