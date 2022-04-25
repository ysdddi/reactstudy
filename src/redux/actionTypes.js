export const REQ = "REQUEST";

export const SAVENICKNAME = "SAVENICKNAME";
// 검색한 닉네임을 저장합니다.
export const saveNickname = (payload) => {
  return {
    type: SAVENICKNAME,
    payload,
  };
};

export const SAVEUSERID = "SAVEUSERID";
// 유저 식별 아이디를 저장합니다.
export const saveUserId = (data) => {
  return {
    type: SAVEUSERID,
    data,
  };
};

export const SAVEUSERIDFAIL = "SAVEUSERIDFAIL";


