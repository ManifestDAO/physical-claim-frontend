import { ethers } from "./ethers";

export async function signMessage(address, library) {
  try {
    const provider = await library;
    const signer = await provider.getSigner();
    const signature = signer.signMessage("Verify Wallet");

    console.log(
      `Address: ${address}, Signature: ${signature}, Message: "Verify Wallet"`
    );
  } catch (err) {
    console.log(err);
  }
}
