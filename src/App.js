import MainPage from "./mainpage";
import Topnav from "./topnav";
import Player from "./Player";
import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/reduxstore.js";
import Search from "./Search";

function App() {
  return (
    <div>
      <Provider store={store}>
        <Routes>
          <Route path="/*" element={<Topnav />}>
            <Route index element={<MainPage />} />
            <Route path="Player" element={<Player />} />
            <Route path="Search" element={<Search />} />
          </Route>
        </Routes>
      </Provider>
    </div>
  );
}

export default App;
