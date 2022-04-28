import React, { useEffect, useState } from 'react';
import { userSearch } from './axios/userequest';
import { useParams } from 'react-router-dom';

function Search() {
  //  const [id, setId] = React.useState("");
  const params = useParams();
  const keyword = params.keyword;

  //state
  const [isError, setError] = useState(false);
  const [userInfo, setUserInfo] = useState(false);
  const [tabState, setTabState] = useState(0);

  const Api = async () => {
    try {
      const data = await userSearch(keyword);
      if (data) {
        const accessId = data.accessId;
        const nickname = data.nickname;
        const level = data.level;

        /**
         * 다음 API 호출
         */

        const result = {
          accessId: accessId,
          nickname: nickname,
          level: level,
        };

        setUserInfo(result);
      }

      setError(false);
    } catch {
      setError(true);
    }
  };
  useEffect(() => {
    Api();
  }, []);

  return (
    <div className='main'>
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: '10px 30px',
        }}
      >
        <p
          onClick={() => {
            setTabState(0);
          }}
        >
          a
        </p>
        <p
          onClick={() => {
            setTabState(1);
          }}
        >
          b
        </p>
        <p
          onClick={() => {
            setTabState(2);
          }}
        >
          c
        </p>
        <p
          onClick={() => {
            setTabState(3);
          }}
        >
          d
        </p>
      </div>

      {tabState === 0 && (
        <div className='ad'>
          <div className='ad_main'>
            {!isError
              ? `${keyword}에 대한 검색 결과입니다.`
              : `${keyword} 닉네임을 가진 유저가 없습니다. 다시 확인해주세요.`}
          </div>
        </div>
      )}

      {tabState === 1 && <h2>섹션 1</h2>}

      {tabState === 2 && <h2>섹션 2</h2>}

      {tabState === 3 && <h2>섹션 3</h2>}

      <div className='mainColumn'>
        <div>dd</div>
        <div className='Champions'>
          <div className='Champions_header'>
            <div className='explanation'>
              챔피언 분석은 브실골티어의 랭크 게임만을 수집합니다.
            </div>
            <div className='version'>버전</div>
          </div>
          <div className='Champions_mainBox'>sdfsd</div>
        </div>
        <div>ff</div>
      </div>
      <div className='footer'>개발자 남길말</div>
    </div>
  );
}
export default Search;
