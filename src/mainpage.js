import styles from "./styles/mainpage.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveNickname } from "./redux/actionTypes";
import { useDispatch } from "react-redux";

function MainPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const setValue = (value) => setSearchValue(value);

  const onClick = () => {
    if (searchValue !== "") {
      dispatch(saveNickname(searchValue));
      navigate("/Search");
    }
  };
  const onKeyPress = (e) => {
    if (e.key === "Enter" && searchValue !== "") {
      dispatch(saveNickname(searchValue));
      navigate("/Search");
    }
  };

  return (
    <div>
      <div className={styles.main}>
        <img
          className={styles.mainImg}
          src={require("./img/fifamainimg.jpg")}
          alt="mainimg"
        />
      </div>
      <div className={styles.main_search}>
        <div>
          <div className={styles.search_form}>
            <input
              value={searchValue}
              onKeyPress={onKeyPress}
              onChange={(e) => setValue(e.target.value)}
              className={styles.searchBar}
              type="text"
              placeholder="닉네임"
            />
            <button type="region" className={styles.searchBtn_kr}>
              KR
            </button>
            <button onClick={() => {onClick()}} className={styles.searchBtn_ys}>
              YS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
