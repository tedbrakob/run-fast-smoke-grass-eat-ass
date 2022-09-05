import { Outlet, Route, Routes, useSearchParams } from "react-router-dom";
import DivisionsResults from "../../nyrr/components/DivisionsResults";
import YearSwitcher from "../../nyrr/components/YearSwitcher";
import DivisionDetails from "./DivisionDetails";

export default function RoutesWithYearSwitcher() {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleYearChange(year: string) {
    setSearchParams({ year });
  }

  const year = parseInt(searchParams.get('year') ?? (new Date()).getFullYear().toString());

  return (
    <div className="w-full">
      <YearSwitcher
        year={year}
        setYear={handleYearChange}
      />

      <div className="p-2 max-w-fit m-auto">
        <Routes>
          <Route index element={
            <DivisionsResults
              year={year}
            />
          } />
          <Route path="division/:divisionCode" element={
            <DivisionDetails
              year={year}
            />
          } />
        </Routes>


        <Outlet></Outlet>
      </div>
    </div>
  );
};