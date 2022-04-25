import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveUserId, } from "./redux/actionTypes";
import { userSearch } from "./axios/userequest";

function Search() {
  //  const [id, setId] = React.useState("");
  const nickname = useSelector((state) => state.nickname);
  const dispatch = useDispatch();
  const Api = async () => {
    const data = await userSearch(nickname);
    dispatch(saveUserId(data))
  };
  useEffect(()=>{
    Api();
  },[nickname])



  return(
    <div className="main">
        <div className="ad">
            <div className="ad_main">
                왜안나와
            </div>
        </div>
      <div className="mainColumn">
        <div>dd</div>
        <div className="Champions">
            <div className="Champions_header">
                <div className="explanation">챔피언 분석은 브실골티어의 랭크 게임만을 수집합니다.</div>
                <div className="version">버전</div>
             </div>
      <div className="Champions_mainBox">
        sdfsd
      </div>
        </div>
        <div>ff</div>
      </div>
  <div className="footer">개발자 남길말</div>
    </div>
)
}
export default Search;
