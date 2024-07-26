//React Router를 사용하여 애플리케이션의 다양한 페이지를 설정하고 관리
import React, { useState } from "react"; // useState 추가
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import TodoContainer from "./todos/TodoContainer";
import EduInfo from "./edu-info/Eduinfo";
import Favorites from "./favorites/favorites";
import Hello from "./favorites/favor";

const App = () => {
  const [festivalData, setFestivalData] = useState([]); // 상태 추가

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/todos*" element={<TodoContainer />} />
          <Route path="/eduinfo*" element={<EduInfo setFestivalData={setFestivalData} />} /> {/* setFestivalData 전달 */}
          <Route path="/favorites" element={<Hello />} />
          <Route path="/favorites/:id" element={<Favorites festivalData={festivalData} />} /> {/* festivalData 전달 */}
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App


