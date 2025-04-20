import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { initVacations } from "../../../redux/vacationProfileSlice";
import useService from "../../../hooks/useService";
import UserVacationsService from "../../../services/auth-aware/UserVacations";
import VacationCard from "../vacation/Vacation";


export default function UserVacations(): JSX.Element {
  const vacations = useAppSelector(state => state.vacationProfile.vacations);
  const dispatch = useAppDispatch();
  const profileService = useService(UserVacationsService);

  useEffect(() => {
    const fetch = async () => {
      try {
        const userVacations = await profileService.getUserVacations();
        dispatch(initVacations(userVacations));
      } catch (error) {
        console.error("Failed to fetch user vacations", error);
      }
    };
    fetch();
  }, []);

  return (
    <div className="UserVacations">
      {vacations.map(vacation => (
        <VacationCard
          key={vacation.id}
          vacation={vacation}
          isAllowActions={true}
        />
      ))}
    </div>
  );
}
