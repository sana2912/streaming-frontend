import { useState, useEffect, useContext } from "react";
import { assets } from "../../script_asset/assets";
import { playlist_data_fetching, playlist_data_serving } from "../../script_asset/playlist_api";
import { Track_context } from "../context/track_context";

const List_ma = ({ track_id, }) => {
    const { track, list_popup, set_list_popup } = useContext(Track_context);
    const [list_data, set_list_data] = useState([]);
    const [list_hiding, set_list_hiding] = useState(false);
    const [listname, set_listname] = useState('');
    const [same, set_same] = useState(false);

    const add_new_list = () => {
        let check = false;
        if (list_data) {
            list_data.forEach((item) => {
                if (listname === item.lists) {
                    check = true;
                    set_same(check);
                    return;
                }
            })
        }
        if (!check) {
            set_list_data(prev => [...prev, { id: 'none', lists: listname, state: 'new', playlist_state: false }]);
            set_list_hiding(false);
        }
    }
    const close_func = () => {
        set_list_popup(false);
        set_list_data([]);
    }

    const submition_handler = (e) => {
        e.preventDefault();
        const form = e.target;
        const data_set = Array.from(form.elements)
            .filter(item => item.type === 'checkbox')
            .filter((item) => {
                const isNewAndChecked = item.dataset.state === 'new' && item.checked;
                const checkedChanged = item.defaultChecked !== item.checked;
                return isNewAndChecked || checkedChanged;
            })
            .map((item) => {
                return {
                    name: item.name,
                    list_id: item.dataset.list_id,
                    state: item.dataset.state,
                    playlist_state: item.checked,
                }
            })
        console.log(data_set);
        playlist_data_serving(data_set, track_id);
        close_func();
    }
    useEffect(() => {
        async function load() {
            if (list_popup) {
                await playlist_data_fetching(track_id, set_list_data);
            }
        }
        load();
    }, [list_popup, track]);

    return (
        <>
            {list_popup ?
                <div>
                    {list_hiding === false ?
                        <form onSubmit={(e) => submition_handler(e)} className="flex flex-col bg-white p-6">
                            <img onClick={() => close_func()} className="w-8 h-8 cursor-pointer" src={assets.close} />
                            <div className="flex flex-col max-h-[40vh] overflow-auto">
                                {
                                    list_data.map((list, idx) => {
                                        return (
                                            <div key={idx} className="flex justify-between my-2">
                                                <label className="text-black self-center" htmlFor={`playlist${idx}`}>{list.lists}</label>
                                                <input className="w-5 h-5 self-center" data-state={list.state} data-list_id={list.list_id} type="checkbox" name={list.lists} id={`playlist${idx}`} defaultChecked={list.playlist_state} />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="flex justify-between mt-4">
                                <button onClick={() => set_list_hiding(true)} className="text-[0.9rem] px-2 py-1 bg-black rounded-full cursor-pointer hover:bg-neutral-800" type="button">ลิสต์ใหม่</button>
                                <button className="text-[0.9rem] px-2 py-1 bg-black rounded-full cursor-pointer hover:bg-neutral-800" type="submit">บันทึก</button>
                            </div>
                        </form>
                        : <div className="flex flex-col bg-white p-6">
                            {same ? <p className="text-red-600 text-[12px] m-2">ชื่อเพลย์ลิตส์ของคุณซ้ำกัน</p> : <></>}
                            <input onChange={(e) => set_listname(e.target.value)} className='border-1 border-neutral-500 rounded-[18px] px-2 py-[2px] text-neutral-500 focus:outline-none focus:border-1' type="text" name="newlist" id="newlist" placeholder="ชื่อเพลย์ลิตส์" />
                            <div className="flex justify-between mt-4">
                                <button onClick={() => set_list_hiding(false)} className="text-[0.9rem] px-2 py-1 bg-black rounded-full cursor-pointer hover:bg-neutral-800" type="button">ยกเลิก</button>
                                <button onClick={add_new_list} className="text-[0.9rem] px-2 py-1 bg-black rounded-full cursor-pointer hover:bg-neutral-800" type="submit">สร้าง</button>
                            </div>
                        </div>
                    }
                </div >
                : <></>
            }
        </>
    )
}

export default List_ma;