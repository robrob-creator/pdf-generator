import { useEffect } from "react";
import "./App.css";
import Grades from "./grades";
import TeachingLoad from "./teaching-load";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import store from "store";
import ProgressReport from "./reports";
import StudentList from "./student_list";

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [type, setType] = useState();

  useEffect(() => {
    store.set("accessToken", searchParams.get("token"));
    setType(searchParams.get("type"));
  }, [type, setType, searchParams]);
  return (
    <div>
      {searchParams.get("type") === "teaching-load" ? (
        <TeachingLoad />
      ) : searchParams.get("type") === "progress-report" ? (
        <ProgressReport />
      ) : searchParams.get("type") === "student-list" ? (
        <StudentList />
      ) : (
        <Grades />
      )}
    </div>
  );
}

export default App;
