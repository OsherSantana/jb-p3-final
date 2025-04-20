import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import useService from "../../../hooks/useService";
import UserVacationsService from "../../../services/auth-aware/UserVacations";
import { useEffect, useState } from "react";
import Vacation from "../../../models/vacation/Vacation";
import "./EditVacation.css";

export default function EditVacation(): JSX.Element {
    const { vacationId } = useParams();
    const service = useService(UserVacationsService);
    const navigate = useNavigate();
    const [original, setOriginal] = useState<Vacation | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        watch
    } = useForm();

    useEffect(() => {
        (async () => {
            try {
                const vacation = await service.getVacationById(vacationId!);
                setOriginal(vacation);
                setPreview(`${import.meta.env.VITE_REST_SERVER_URL}/uploads/${vacation.imageFileName}`);
                Object.entries(vacation).forEach(([key, value]) => {
                    setValue(key as any, value);
                });
            } catch (err) {
                alert("Vacation not found");
                navigate("/home");
            }
        })();
    }, []);

    const imageFile = watch("imageFile");

    useEffect(() => {
        if (imageFile && imageFile.length > 0) {
            const file = imageFile[0];
            setPreview(URL.createObjectURL(file));
        }
    }, [imageFile]);

    async function submit(data: any) {
        const formData = new FormData();

        formData.append("destination", data.destination);
        formData.append("description", data.description);
        formData.append("startDate", data.startDate);
        formData.append("endDate", data.endDate);
        formData.append("price", data.price);
        if (data.imageFile?.[0]) {
            formData.append("image", data.imageFile[0]);
        }

        try {
            await service.updateVacation(vacationId!, formData);
            navigate("/home");
        } catch (err) {
            alert("Failed to update vacation");
            console.error(err);
        }
    }

    if (!original) return <div>Loading...</div>;

    return (
        <div className="EditVacation">
            <form onSubmit={handleSubmit(submit)}>
                <input
                    placeholder="Destination"
                    {...register("destination", { required: true })}
                />
                {errors.destination && <span>Destination is required</span>}

                <textarea
                    placeholder="Description"
                    {...register("description", { required: true })}
                />
                {errors.description && <span>Description is required</span>}

                <input
                    type="date"
                    {...register("startDate", { required: true })}
                />
                {errors.startDate && <span>Start date is required</span>}

                <input
                    type="date"
                    {...register("endDate", {
                        required: true,
                        validate: value => {
                            const start = new Date(watch("startDate"));
                            const end = new Date(value);
                            return end > start || "End date must be after start date";
                        }
                    })}
                />
                {errors.endDate && <span>{String(errors.endDate.message)}</span>}

                <input
                    type="number"
                    placeholder="Price"
                    {...register("price", {
                        required: true,
                        min: { value: 0, message: "Price must be at least 0" },
                        max: { value: 10000, message: "Price must be ≤ 10,000" }
                    })}
                />
                {errors.price && <span>{String(errors.price.message)}</span>}

                <label>Replace Image:
                    <input type="file" accept="image/*" {...register("imageFile")} />
                </label>

                {preview && (
                    <div className="image-preview">
                        <img src={preview} alt="Vacation preview" height={150} />
                    </div>
                )}

                <button type="submit">Update Vacation</button>
            </form>
        </div>
    );
}
