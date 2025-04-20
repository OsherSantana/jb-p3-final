import Vacation from "../../../models/vacation/Vacation";
import "./Vacation.css";
import { useAppSelector } from "../../../redux/hooks";
import useService from "../../../hooks/useService";
import VacationFollowService from "../../../services/auth-aware/VacationFollow";
import { useState } from "react";

interface VacationProps {
  vacation: Vacation;
  isAllowActions?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function VacationCard({
  vacation,
  isAllowActions = true,
  onEdit,
  onDelete
}: VacationProps): JSX.Element {
  console.log("VacationCard rendered");

  const [isTagged, setIsTagged] = useState(vacation.isTagged);
  const auth = useAppSelector((state) => state.auth);
  const service = useService(VacationFollowService);

  const canTag = auth.user && auth.user.role === "user";
  const canEdit = auth.user?.role === "admin" && isAllowActions;

  async function toggleTag() {
    try {
      if (isTagged) {
        await service.unfollow(vacation.id);
      } else {
        await service.follow(vacation.id);
      }
      setIsTagged(!isTagged);
    } catch (err) {
      alert("Failed to update tag");
      console.error(err);
    }
  }

  return (
    <div className="VacationCard">
      <div className="follower-count">{vacation.taggedByUsers?.length ?? 0} followers</div>

      <img
        src={`${import.meta.env.VITE_REST_SERVER_URL}/uploads/${vacation.imageFileName}`}
        alt={vacation.destination}
      />

      <h3>{vacation.destination}</h3>
      <p>{vacation.description}</p>
      <p>
        {vacation.startDate} - {vacation.endDate}
      </p>
      <p>${Number(vacation.price).toFixed(2)}</p>

      {canTag && isAllowActions && (
        <button onClick={toggleTag}>{isTagged ? "Unfollow" : "Follow"}</button>
      )}

      {/* 🔧 Here's the missing part: */}
      {canEdit && (
        <div className="admin-actions">
          <button onClick={() => { console.log("Edit clicked"); onEdit?.(); }}>✏️ Edit</button>
          <button onClick={() => { console.log("Delete clicked"); onDelete?.(); }}>🗑 Delete</button>
        </div>
      )}
    </div>
  );
}
