import styles from './styles/topnav.module.css';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Topnav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [topSearchValue, setTopSearchValue] = useState('');
  const setValue = (value) => setTopSearchValue(value);
  //검색창 설정
  const onClick = () => {
    if (topSearchValue !== '') {
      window.location.href = '/Search/' + topSearchValue;
    } else {
      alert('닉네임을 입력해주세요');
    }
  };
  const onKeyPress = (e) => {
    if (e.key === 'Enter' && topSearchValue !== '') {
      window.location.href = '/Search/' + topSearchValue;
    } else if (e.key === 'Enter' && topSearchValue === '') {
      alert('닉네임을 입력해주세요');
    }
  };

  return (
    <>
      <div className={styles.Topnav_bar}>
        <div className={styles.Topnav_1thdiv}>
          <Link to='/'>
            <div className={styles.Topnav_btn} href='http://localhost:3000/'>
              ys.gg
            </div>
          </Link>
          <div className={styles.Topnav_imgspan}>
            <img
              className={styles.Topnav_img}
              src={require('./img/fifalogo.png')}
              alt='logo'
            />
            FIFA Online 4
          </div>
        </div>
        <div className={styles.Topnav_rightbox}>
          {pathname !== '/' && (
            <>
              <input
                onKeyPress={onKeyPress}
                className={styles.Topnav_searchbox}
                onChange={(e) => setValue(e.target.value)}
                value={topSearchValue}
                type='text'
                placeholder='구단주명'
              ></input>
              <button onClick={onClick} className={styles.Topnav_searchBtn}>
                Go
              </button>
            </>
          )}

          {/* <select className={styles.Topnav_select} defaultValue="Language">
            <option defaultValue="Korean">Korean</option>
            <option defaultValue="English">English</option>
          <button className={styles.Topnav_loginBtn}>Log In</button>
          </select> */}
        </div>
      </div>
      <div className={styles.Topnav_bar2}>
        <Link to='/'>
          <div className={`${styles.Topnav_bar2_btn}`}>Home</div>
        </Link>
      </div>
      <>
        <Outlet />
      </>
      {pathname === '/' && <div className={styles.footerSpace}></div>}
      <div className={styles.footer}>
        <p>Data based on NEXON DEVELOPERS</p>
        <p>Fifa Online4</p>
      </div>
    </>
  );
}
export default Topnav;
