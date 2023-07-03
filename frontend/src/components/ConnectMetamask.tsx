import { useState, useEffect } from "react";
import { connectMetamask, getAddress } from "../utils/utils";

/**
 * @dev Component that handles connecting metamask 
 */
const ConnectMetamask = () => {

    const [connected, setConnected] = useState<boolean>(false);
    const [address, setAddress] = useState<string>();

    const connect = async () => {
            await connectMetamask();
            setConnected(true);
            setAddress(await getAddress());
    }

    // useEffect(() => {
    //     connect();
    // }, []);

    return (
        <div>
            <button onClick={ connect }>
                { connected ? address : "Connect Metamask" }
            </button>
        </div>
    );
}

export default ConnectMetamask;