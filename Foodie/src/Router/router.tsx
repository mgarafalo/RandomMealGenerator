// import { Routes, Route } from "react-router";
import { Routes, Route } from "react-router-dom";
import RandomMeal from "../views/RandomMeal";

export default function AppRouter() {
  return (
    <div className="min-h-screen" style={{ paddingTop: "65px" }}>
      <Routes>
        <Route path="/" element={<RandomMeal />} />
      </Routes>
    </div>
  );
}
