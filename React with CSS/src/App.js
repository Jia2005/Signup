import { HashRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
