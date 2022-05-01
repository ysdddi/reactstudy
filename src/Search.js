import React, { useEffect, useState } from "react";
import {
  userSearch,
  rankSearch,
  matchSearch,
  matchDetailSearch,
} from "./axios/userequest";
import { useParams } from "react-router-dom";

//util
import { calcRank } from "./util/util";
//mui
import ToggleBtn from "./util/toggleBtn";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

function Search() {
  //  const [id, setId] = React.useState("");
  const params = useParams();
  const username = params.username;
  const [isError, setIsError] = useState(false);
  const [userInfo, setUserInfo] = useState(false);

  //api 호출
  const Api = async () => {
    try {
      const data = await userSearch(username);
      if (data) {
        const accessId = data.accessId;
        const nickname = data.nickname;
        const level = data.level;

        //등급 조회
        const rankData = await rankSearch(accessId);
        const division = rankData[0].division;
        const date = rankData[0].achievementDate;
        //매치 조회
        const matchData = await matchSearch(accessId);
        let matchDetailData = new Array();

        // map을썼기때문에 전체 진행을 기다리기위해 promise.all 사용 ***중요****
        //매치 개별 상세조회
        await Promise.all(
          matchData.map(async (item) => {
            const tempData = await matchDetailSearch(item);
            matchDetailData.push(tempData);
            
          })
        );
        //매치데이터 날짜별 정렬
         const descMatchData = matchDetailData.sort((a, b) => {
           return new Date(b.matchDate) - new Date(a.matchDate)
         })
        //api 객체
        const result = {
          accessId: accessId,
          nickname: nickname,
          level: level,
          division: calcRank(division),
          date: date,
          match: descMatchData,
        };

        setUserInfo(result);
        setIsError(false);
      }
    } catch {
      setIsError(true);
    }
  };

  //페이지라우팅 초기렌더링
  useEffect(() => {
    Api();
  }, [username]);


  //나중에지울것 (api  state 확인용)
  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  return (
    <div className="main">
      <div className="sub">
        <div className="sub_main">
          {userInfo.division !== undefined ? (
            <img
              alt="rankiconimg"
              src={`https://ssl.nexon.com/s2/game/fo4/obt/rank/large/update_2009/ico_rank${userInfo.division?.image}.png`}
            />
          ) : (
            <img />
          )}
          <div className="userInfo">
            <p>{userInfo.nickname}</p>
            <p>{`레벨 : ${userInfo.level}`}</p>
          </div>
          <div>{`최고등급${
            userInfo.division?.label
              ? "-" + userInfo.division?.label
              : "기록이 없습니다."
          }`}</div>
        </div>
      </div>
      <div className="mainColumn">
        <div>left</div>
        <div className="Champions">
          <div className="Champions_header">
            <div className="explanation">
              경기분석은 1:1 공식경기만 해당됩니다.
            </div>
            <div className="version">버전</div>
          </div>
          <div className="Champions_mainBox">
            <ToggleBtn></ToggleBtn>
            <Accordion disabled className="accordionCategory">
              <AccordionSummary
                aria-controls="panel3a-content"
                id="panel3a-header"
              >
                <div className="matchCategory">
                  <Typography>경기일자</Typography>
                </div>
              </AccordionSummary>
            </Accordion>
            {userInfo.match !== undefined
              ? userInfo.match.map((match, index) => {
                  const split = match.matchDate.split("T");
                  //승무패
                  if (match.matchInfo[0].nickname === userInfo.nickname) {
                    if (match.matchInfo[0].matchDetail.matchResult === "승") {
                      match.playResult = "matchWin";
                    } else if (
                      match.matchInfo[0].matchDetail.matchResult === "무"
                    ) {
                      match.playResult = "matchDraw";
                    } else {
                      match.playResult = "matchLose";
                    }
                  } else {
                    if (match.matchInfo[1].matchDetail.matchResult === "승") {
                      match.playResult = "matchWin";
                    } else if (
                      match.matchInfo[1].matchDetail.matchResult === "무"
                    ) {
                      match.playResult = "matchDraw";
                    } else if (
                      (match.matchInfo[1].matchDetail.matchResult === "패")
                    ) {
                      match.playResult = "matchLose";
                    }
                  }

                  return (
                    <Accordion
                      key={index}
                      className={
                       match.playResult
                      }
                    >
                      <AccordionSummary
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <div className="indivMatch">
                          <div>
                            <Typography className="matchDate">
                              {split[0] + "  " + split[1].substr(0, 5)}
                            </Typography>
                          </div>
                          <div className="matchResult">
                            <Typography className="matchResult__detail">{`${match.matchInfo[0].nickname} ${match.matchInfo[0].shoot.goalTotalDisplay}:${match.matchInfo[1].shoot.goalTotalDisplay} ${match.matchInfo[1].nickname}`}</Typography>
                          </div>
                        </div>
                      </AccordionSummary>
                      <AccordionDetails className="matchDetailStatistics">
                        <Typography>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Suspendisse malesuada lacus ex, sit amet blandit
                          leo lobortis eget.
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  );
                })
              : null}
          </div>
        </div>
        <div>right</div>
      </div>
      <div className="footer">개발자 남길말</div>
    </div>
  );
}
export default Search;
