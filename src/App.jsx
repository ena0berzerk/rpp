import React from "react";
import { Routes, Route } from "react-router-dom";

import "./scss/app.scss";
import Header from "./components/Header";
import Card from "./pages/Card";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

export const AppSearchContext = React.createContext();

export default function App() {
  const [searchValue, setSearchValue] = React.useState("");

  return (
    <div className="wrapper">
      <AppSearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/card" element={<Card />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </AppSearchContext.Provider>
    </div>
  );
}
