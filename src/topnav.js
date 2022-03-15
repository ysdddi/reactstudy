import styles from "./styles/index.module.css";
function Topnav (){
    return (
        <div className={styles.Topnav_bar}>
           <div className={styles.Topnav_1thdiv}>
            <button className={styles.Topnav_btn}>ys.gg</button>
            <div className={styles.Topnav_imgspan}>
                <img className={styles.Topnav_img} src={require("./img/lollogo.png")} alt="logo"/>
            </div>
            </div>
            <div>
                <select className={styles.Topnav_select} value="language">
                    <option value="Korean">Korean</option>
                    <option value="English">English</option>
                </select>
            <button className={styles.Topnav_loginBtn}>Log In</button>
            </div>
        </div>
    )
}
export default Topnav;