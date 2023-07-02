import { ethers, utils } from "ethers";

export const blockExplore = async () => {
  const provider = new ethers.providers.getDefaultProvider();
  //await provider.send("eth_requestAccounts", []);
  //const signer = provider.getSigner();

  //const contract = new ethers.Contract(contractAddress, abi, signer);
  const blockExObj = {
    gasPrice: utils.formatUnits(
      parseInt(ethers.BigNumber.from(await provider.getGasPrice())._hex, 16),
      "gwei"
    ),
    blockNumber: parseInt(
      ethers.BigNumber.from(await provider.getBlockNumber())._hex,
      16
    )
  };

  return blockExObj;
};
