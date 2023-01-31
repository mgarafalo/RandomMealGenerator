// import { Routes, Route } from "react-router";
import { Routes, Route } from "react-router-dom";
import RandomMeal from "../views/RandomMeal";
import SavedMeals from "../views/SavedMeals";

export default function AppRouter() {
  return (
    <div className="flex items-center" style={{ paddingTop: "65px" }}>
      <Routes>
        <Route path="/" element={<RandomMeal />} />
        <Route path="/meals" element={<SavedMeals />} />
      </Routes>
    </div>
  );
}
