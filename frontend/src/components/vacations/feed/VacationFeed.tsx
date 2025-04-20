
import { useEffect, useState } from "react";
import VacationCard from "../vacation/Vacation";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { initVacations } from "../../../redux/vacationFeedSlice";
import useService from "../../../hooks/useService";
import VacationFeedService from "../../../services/auth-aware/VacationFeed";
import Vacation from "../../../models/vacation/Vacation";
import "./VacationFeed.css";

export default function VacationFeed(): JSX.Element {
    const dispatch = useAppDispatch();
    const vacations = useAppSelector(state => state.vacationFeed.vacations);
    const user = useAppSelector(state => state.auth.user);
    const isAdmin = user?.role === "admin";
    const feedService = useService(VacationFeedService);

    const [page, setPage] = useState(1);
    const [followedOnly, setFollowedOnly] = useState(false);
    const [activeOnly, setActiveOnly] = useState(false);
    const [upcomingOnly, setUpcomingOnly] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            try {
                const filters: any = { page };
                if (followedOnly) filters.followedOnly = true;
                if (activeOnly) filters.activeOnly = true;
                if (upcomingOnly) filters.upcomingOnly = true;

                const data: Vacation[] = await feedService.getFeed(filters);
                dispatch(initVacations(data));
            } catch (err) {
                console.error("Failed to fetch vacation feed", err);
            }
        };
        fetch();
    }, [page, followedOnly, activeOnly, upcomingOnly]);

    return (
        <div className="VacationFeed">
            {!isAdmin && (
                <div className="filters">
                    <label>
                        <input
                            type="checkbox"
                            checked={followedOnly}
                            onChange={() => setFollowedOnly(!followedOnly)}
                        />
                        Followed only
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            checked={activeOnly}
                            onChange={() => setActiveOnly(!activeOnly)}
                        />
                        Active only
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            checked={upcomingOnly}
                            onChange={() => setUpcomingOnly(!upcomingOnly)}
                        />
                        Upcoming only
                    </label>
                </div>
            )}

            <div className="cards">
                {vacations.map(v => (
                    <VacationCard key={v.id} vacation={v} isAllowActions={true} />
                ))}
            </div>

            <div className="pagination">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Prev</button>
                <span>Page {page}</span>
                <button onClick={() => setPage(p => p + 1)} disabled={vacations.length < 10}>Next</button>
            </div>
        </div>
    );
}
