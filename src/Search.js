import { useSelector } from "react-redux";
import { userSearch } from "./axios/userequest";
import { useEffect } from "react";

function Search() {
  const nickname = useSelector((state) => state.payload);

  const Api = async () => {
    const data = await userSearch(nickname);
    return data.accessId;
  };

  useEffect(()=>{console.log("wow");},[]);

  return (
    <>
      <div>jsidofjsdiofjisdo</div>
      <div>{nickname}</div>
    </>
  );
}

export default Search;
