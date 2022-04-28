import MainPage from './mainpage';
import Topnav from './topnav';
import Player from './Player';
import { Route, Routes } from 'react-router-dom';
import Search from './Search';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/*' element={<Topnav />}>
          <Route index element={<MainPage />} />
          <Route path='Player' element={<Player />} />
          <Route path='Search/:keyword' element={<Search />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
