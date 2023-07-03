import { create, IPFSHTTPClient } from "ipfs-http-client";
import { Buffer } from "buffer";

function getIpfsClient() : IPFSHTTPClient {
    // loading env variables
    const projectId = process.env.REACT_APP_PROJECT_ID;
    const projectSecret = process.env.REACT_APP_PROJECT_SECRET;
    const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

    const client = create({
        host: 'ipfs.infura.io',
        port: 5001,
        protocol: 'https',
        headers: {
            authorization: auth,
        },
    });
    return client;
}

/**
 * @dev Function returns path on ipfs
 * full path should be https://ipfs.io/ipfs/<path>
 */
export async function upload(data: any) : Promise<string> {
    const client = getIpfsClient();
    const result = await client.add(data);    
    return result.path; 
}

export function getPath(path: string) : string {
    return 'https://ipfs.io/ipfs/' + path;
}

/**
 * @dev Function fetches ipfs and returns json data
 */
export async function fetchIpfs(uri: string) : Promise<any> {
    const path = getPath(uri);
    const res = await fetch(path);
    const data = await res.json();
    return data;
}


