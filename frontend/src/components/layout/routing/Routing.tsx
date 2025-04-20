import { Navigate, Route, Routes } from "react-router-dom";
import Feed from "../../vacations/feed/VacationFeed";
import NotFound from "../not-found/NotFound";
import EditPost from "../../vacations/edit/EditVacation";
import AdminReports from "../../vacations/admin reports/AdminReports";
import Login from "../../auth/login/Login";
import Signup from "../../auth/signup/Signup";
import { useAppSelector } from "../../../redux/hooks";
import AddVacation from "../../vacations/admin add vacation/AddVacation";


export default function Routing(): JSX.Element {
  const isLoggedIn = !!useAppSelector(state => state.auth.user);

  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Feed />} />
      <Route path="/admin/edit-vacation/:vacationId" element={<EditPost />} />
      <Route path="/admin/add-vacation" element={<AddVacation />} />
      <Route path="/admin/reports" element={<AdminReports />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );


}
