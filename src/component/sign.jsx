import { useState } from "react";
import { assets } from "../../script_asset/assets";
import Login from "./login_component";
import Register from "./register_component";

const Signing = () => {
    const [state, set_state] = useState(true);

    return (
        <div className="bg-neutral-700 h-fit w-[100%]">
            {state ?
                <Login set_state={set_state} />
                :
                <Register set_state={set_state} />
            }
        </div>
    )
}

export default Signing;