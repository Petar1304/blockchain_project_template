import { Contract, ethers } from "ethers";
import { changeNetwork } from "./networks";

// solve ts errors
export declare const window: any;

/**
 * @dev Function that returns address of the currently selected account in Metamask
 * @returns string address
 */
export async function connectMetamask(): Promise<string> {
    await changeNetwork();
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    const provider = new ethers.BrowserProvider(window.ethereum);
    const address: string = (await provider.send("eth_requestAccounts", []))[0]
    return address;
}

/**
 * @dev Function that fetch list of addresses from metamask wallet
 * @returns addresses strings
 */
export async function getAddress() : Promise<string> {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const addresses = await provider.send("eth_requestAccounts", []);
    return addresses[0];
}

/**
 * @dev Returns Web3Provider
 */
export async function getProvider() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    return provider;
}

/**
 * @dev Returns ethers signer object
 */
export async function getSigner() {
    const provider = await getProvider();
    const signer = await provider.getSigner();
    return signer;
}

/**
 * @dev Function that initializes contract object (used for calling view and pure functions from smart contract)
 * @returns contract object
 */
export async function getContract(address: string, abi: ethers.InterfaceAbi) {
    const provider = await getProvider();
    const contract = new ethers.Contract(address, abi, provider);
    return contract;
}

export async function getContractWithSigner(address: string, abi: ethers.InterfaceAbi) {
    const signer = await getSigner();
    const contract = new ethers.Contract(address, abi, signer);
    return contract;
}

/**
 * @dev Approve ERC721 token transfer to smart contract
 */
export async function approveTransfer(to: string, tokenId: number, tokenAddress: string, tokenAbi: ethers.InterfaceAbi): Promise<void> {
    const signer = await getSigner();
    const nft = new ethers.Contract(tokenAddress, tokenAbi, signer);
    await nft.approve(to, tokenId.toString());
}
