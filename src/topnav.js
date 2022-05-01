import styles from "./styles/topnav.module.css";
import { Link, Outlet, useLocation } from "react-router-dom";
function Topnav() {
  const {pathname} = useLocation();

  return (
    <>
      <div className={styles.Topnav_bar}>
        <div className={styles.Topnav_1thdiv}>
          <Link to="/">
            <div className={styles.Topnav_btn} href="http://localhost:3000/">
              ys.gg
            </div>
          </Link>
          <div className={styles.Topnav_imgspan}>
            <img
              className={styles.Topnav_img}
              src={require("./img/fifalogo.png")}
              alt="logo"
            />
            FIFA Online 4
          </div>
        </div>
        <div className={styles.Topnav_rightbox}>       

        {
          pathname !== '/' &&
          <>
          <input className={styles.Topnav_searchbox}>
            
            </input>
            <button className={styles.Topnav_searchBtn}>Go</button>

          </>
        }
          

          <select className={styles.Topnav_select} defaultValue="Language">
            <option defaultValue="Korean">Korean</option>
            <option defaultValue="English">English</option>
          </select>
          <button className={styles.Topnav_loginBtn}>Log In</button>
        </div>
      </div>
      <div className={styles.Topnav_bar2}>
        <Link to="/">
          <div className={`${styles.Topnav_bar2_btn}`}>Home</div>
        </Link>
        <Link to="/Player">
          <div className={`${styles.Topnav_bar2_btn}`}>Player</div>
        </Link>
        <Link to="/Stats">
          <div className={`${styles.Topnav_bar2_btn}`}>Stats</div>
        </Link>
        <Link to="/Ranking">
          <div className={`${styles.Topnav_bar2_btn}`}>Ranking</div>
        </Link>
      </div>
      <>
        <Outlet />
      </>
    </>
  );
}
export default Topnav;
