import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Vacation from "../../../models/vacation/Vacation";
import useService from "../../../hooks/useService";
import UserVacationsService from "../../../services/auth-aware/UserVacations";
import VacationCard from "../../vacations/vacation/Vacation";
import "./AdminVacations.css";

export default function AdminVacations(): JSX.Element {
    const [vacations, setVacations] = useState<Vacation[]>([]);
    const service = useService(UserVacationsService);
    const navigate = useNavigate();

    useEffect(() => {
        reload();
    }, []);

    async function reload() {
        try {
            const all = await service.getAllVacations();
            setVacations(all);
        } catch (err) {
            alert("Failed to load vacations");
            console.error(err);
        }
    }

    async function handleDelete(id: string) {
        const confirmDelete = window.confirm("Are you sure you want to delete this vacation?");
        if (!confirmDelete) return;

        try {
            await service.deleteVacation(id);
            reload();
        } catch (err) {
            alert("Failed to delete vacation");
            console.error(err);
        }
    }

    return (
        <div className="AdminVacations">
            <button onClick={() => navigate("/admin/add-vacation")}>+ Add Vacation</button>

            <div className="vacation-list">
                {vacations.map(vacation => (
                    <div key={vacation.id} className="vacation-card-wrapper">
                        <VacationCard
                            vacation={vacation}
                            isAllowActions={true}
                            onEdit={() => navigate(`/admin/edit-vacation/${vacation.id}`)}
                            onDelete={() => handleDelete(vacation.id)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
