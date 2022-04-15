import styles from "./styles/mainpage.module.css";
import {useState} from "react";
import {userSearch} from"./userequest";


function MainPage () {
    
    const [searchValue, setSearchValue] = useState("");
    const onChange = (e) => setSearchValue(e.target.value);
    
    const [searchColor, setSearchColor] = useState(true);
    const searchClick = () => {setSearchColor(searchColor ? false : true)};
    
    const [onFocus, setOnFocus] = useState(false);
    const onFocusFunc = (e) => {setOnFocus(true)};
    //const onSearchClick = () => setOnFocus(true);
    const onBlurFunc = () => setOnFocus(false);
    
    const handleSubmit = (e) => e.preventDefault();
    const [data, setData] = useState(null);    
    
    const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiOTA2MTA3OTE1IiwiYXV0aF9pZCI6IjIiLCJ0b2tlbl90eXBlIjoiQWNjZXNzVG9rZW4iLCJzZXJ2aWNlX2lkIjoiNDMwMDExNDgxIiwiWC1BcHAtUmF0ZS1MaW1pdCI6IjUwMDoxMCIsIm5iZiI6MTY0ODQ0NDA4NSwiZXhwIjoxNjYzOTk2MDg1LCJpYXQiOjE2NDg0NDQwODV9.oDwls61Gf_bTmbjom5kIPZnc_81LCsQTfiKEU5e1hM8"
    
    //const requestApi = userSearch(apiKey, searchValue).then((e)=>console.log(e) );
   
    /*{onFocus && <div className={styles.search_content}>
    <div className={styles.search_content_div}>
    <button onClick={searchColor && searchClick} className={`${searchColor ? styles.search_content_btn_click : styles.search_content_btn}`}>최근검색</button>
                        <button onClick={!searchColor && searchClick} className={`${searchColor ? styles.search_content_btn : styles.search_content_btn_click}`}>즐겨찾기</button>                     
                    </div>
                     <ul className={styles.search_content_ul}><li>음낭한놈</li></ul>
                </div>} */
    return(
        <div>
        <div className={styles.main}>
            <img className={styles.mainImg} src={require("./img/fifamainimg.jpg")} alt="mainimg"/>
        </div>
        <div className={styles.main_search}>
            <div>
                <form  className={styles.search_form} onSubmit={handleSubmit}>
                    <input onFocus={onFocusFunc} onBlur={onBlurFunc} onChange={onChange} className={styles.searchBar} type="text" placeholder="닉네임" />
                    <button className={styles.searchBtn_kr}>KR</button>
                    <button onClick={()=>{userSearch(apiKey, searchValue).then((e)=>setData(e.accessId)).then(console.log(data))}} className={styles.searchBtn_ys} >YS</button>
                    
                </form>
    
            </div>
        </div>
        </div>
    )
}

export default MainPage;