import React, { useEffect, useState } from "react";
import {
  userSearch,
  rankSearch,
  matchSearch,
  matchDetailSearch,
} from "./axios/userequest";
import { useParams } from "react-router-dom";
import './styles/matchPlayerDetail.css'

//util
import { calcRank } from "./util/util";
import { fifaSpId, fifaSpPosition } from "./util/gameInfo";
//mui
import ToggleBtn from "./util/toggleBtn";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import Button from "@mui/material/Button";
import CircularProgress from '@mui/material/CircularProgress';

function Search() {
  //  const [id, setId] = React.useState("");
  const params = useParams();
  const username = params.username;
  const [isError, setIsError] = useState(false);
  const [userInfo, setUserInfo] = useState(false);
  const [acList, setAcList] = useState(11);
  const [gameInfo, setGameInfo] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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
          return new Date(b.matchDate) - new Date(a.matchDate);
        });
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
        setIsLoading(false);
      }
    } catch {
      setIsError(true);
      setIsLoading(false);
    }
  };

  //페이지라우팅 초기렌더링
  useEffect(() => {
   // let componentMount = true;
  //  if (componentMount) {
      Api();
  //  }
   // return () => (componentMount = false);
  }, [username]);

 

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
            <CircularProgress />
          )}
          <div className="userInfo">
            <p>{userInfo.nickname}</p>
            <p>{userInfo ? `레벨 : ${userInfo.level}` : null }</p>
          </div>
          <div>{
            userInfo.division?.label
              ? "최고등급" + "-" + userInfo.division?.label
              : null
          }</div>
        </div>
      </div>
      <div className="mainColumn">
        <div></div>
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
                      match.matchInfo[1].matchDetail.matchResult === "패"
                    ) {
                      match.playResult = "matchLose";
                    }
                  }
                

                  //컨트롤러 변환
                  const controller = (userIndex) => {
                    if (
                      match.matchInfo[userIndex].matchDetail.controller ===
                      "gamepad"
                    ) {
                      return <SportsEsportsIcon />;
                    } else {
                      return <KeyboardIcon />;
                    }
                  };
                  //패스성공률
                  const passSuc = (userIndex) => {
                    return (
                      (
                        match.matchInfo[userIndex].pass.passSuccess /
                        match.matchInfo[userIndex].pass.passTry
                      ).toFixed(2) * 100
                    );
                  };
                  //태클성공률
                  const tackleSuc = (userIndex) => {
                    return (
                      (
                        match.matchInfo[userIndex].defence.tackleSuccess /
                        match.matchInfo[userIndex].defence.tackleTry
                      ).toFixed(2) * 100
                    );
                  };
                  //선수포지션 호출
                  const posiSearch = (num) => {
                    const posiNum = fifaSpPosition.find(
                      (v) => v.spposition === num
                    );
                    return posiNum.desc;
                  };
                  //공격수 미드필더 수비수 분류
                  const bigPosiInv = (value) => {
                    if (value === 0) {return "GK"}
                    if (value <= 8)  {return "DF"}
                    if (value <= 19) {return "MF"}
                    if (value <= 27) {return "FW"}
                  }
                  //선수이름 호출
                  const nameSearch = (spNum) => {
                    const spName = fifaSpId.find(
                      (v) => v.id === spNum
                      );
                    const split = spName.name.split(" ");
                    if(split.length === 1 ) {
                      return split[0]
                    }
                    else {
                      return split[1]
                    }
                  }
                  //LR 인버터
                  const LRInverter = (str) => {
                    switch(str) {
                      case "L" : return "R";
                      case "R" : return "L";
                      
                    }
                  }
                  if (acList > index) {
                    return (
                      <Accordion key={index} className={match.playResult}>
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
                              {controller(0)}
                              <Typography className="matchResult__detail">
                                {`${match.matchInfo[0].nickname} ${match.matchInfo[0].shoot?.goalTotalDisplay}
                              :${match.matchInfo[1].shoot?.goalTotalDisplay} ${match.matchInfo[1].nickname}`}
                              </Typography>
                              {controller(1)}
                            </div>
                          </div>
                        </AccordionSummary>
                        <AccordionDetails className="matchDetailStatistics">
                          <div className="soccerField">
                            <div className="teamAreaLeft">
                              {match.matchInfo[0].player.map(
                                (player, index) => {
                                  if (player.spPosition !== 28) {
                                    const userSpId = String(player.spId).substr(
                                      3
                                    );

                                    return (
                                      <div className={`playerDiv ${posiSearch(player.spPosition)}L`} key={index} >
                                        <p
                                          className={`playerPosition`} id={bigPosiInv(player.spPosition)}>
                                          {posiSearch(player.spPosition)}
                                        </p>
                                        <img
                                          className="playerFace Left"
                                          src={`https://fo4.dn.nexoncdn.co.kr/live/externalAssets/common/players/p${Number(
                                            userSpId
                                          )}.png`}
                                          alt="index"
                                        />
                                        <p className="playerName">{nameSearch(player.spId)}</p>
                                      </div>
                                    );
                                  }
                                }
                              )}
                            </div>
                            <div className="teamAreaRight">
                              {match.matchInfo[1].player.map(
                                (player, index) => {
                                  if (player.spPosition !== 28) {
                                    const userSpId = String(player.spId).substr(
                                      3
                                    );
                                    return (
                                      <div className={`playerDiv ${posiSearch(player.spPosition).replace(/(L|R)/g, LRInverter)}R`} key={index}>
                                        <p
                                          className={`playerPosition`} id={bigPosiInv(player.spPosition)}
                                        >
                                        {posiSearch(player.spPosition)}
                                        </p>
                                        <img
                                          className="playerFace Right"
                                          src={`https://fo4.dn.nexoncdn.co.kr/live/externalAssets/common/players/p${Number(
                                            userSpId
                                          )}.png`}
                                          alt="index"
                                        />
                                        <p className="playerName">{nameSearch(player.spId)}</p>
                                      </div>
                                    );
                                  }
                                }
                              )}
                            </div>
                          </div>
                          <div className="matchStatistics">
                            <div className="statCard">
                              <p className="statCard__category">평점</p>
                              <p className="statCard__value">{`${match.matchInfo[0].matchDetail.averageRating.toFixed(
                                1
                              )} | ${match.matchInfo[1].matchDetail.averageRating.toFixed(
                                1
                              )}`}</p>
                            </div>
                            <div className="statCard">
                              <p className="statCard__category">슈팅</p>
                              <p className="statCard__value">{`${match.matchInfo[0].shoot?.shootTotal} | ${match.matchInfo[1].shoot?.shootTotal}`}</p>
                            </div>
                            <div className="statCard">
                              <p className="statCard__category">유효 슛</p>
                              <p className="statCard__value">{`${match.matchInfo[0].shoot?.effectiveShootTotal} | ${match.matchInfo[1].shoot?.effectiveShootTotal}`}</p>
                            </div>
                            <div className="statCard">
                              <p className="statCard__category">점유율(%)</p>
                              <p className="statCard__value">{`${match.matchInfo[0].matchDetail.possession} | ${match.matchInfo[1].matchDetail.possession}`}</p>
                            </div>
                            <div className="statCard">
                              <p className="statCard__category">
                                패스성공률(%)
                              </p>
                              <p className="statCard__value">{`${passSuc(
                                0
                              )} | ${passSuc(1)}`}</p>
                            </div>
                            <div className="statCard">
                              <p className="statCard__category">
                                태클성공률(%)
                              </p>
                              <p className="statCard__value">{`${tackleSuc(
                                0
                              )} | ${tackleSuc(1)}`}</p>
                            </div>
                            <div className="statCard">
                              <p className="statCard__category">코너킥</p>
                              <p className="statCard__value">{`${match.matchInfo[0].matchDetail.cornerKick} | ${match.matchInfo[1].matchDetail.cornerKick}`}</p>
                            </div>
                          </div>
                        </AccordionDetails>
                      </Accordion>
                    );
                  }
                })
              : null}
            {userInfo.match?.length > acList && (
              <Button
                onClick={() => {
                  setAcList(acList + 10);
                }}
                className="addBtn"
                variant="outlined"
              >
                더 보기
              </Button>
            )}
          </div>
        </div>
        <div></div>
      </div>
    </div> 
  );
}
export default Search;
