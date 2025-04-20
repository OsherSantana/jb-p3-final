import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useService from "../../../hooks/useService";
import UserVacationsService from "../../../services/auth-aware/UserVacations";
import "./AddVacation.css";

export default function AddVacation(): JSX.Element {
    const service = useService(UserVacationsService);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm();

    const imageFile = watch("imageFile");

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
            await service.addVacation(formData);
            navigate("/home");
        } catch (err) {
            alert("Failed to add vacation");
            console.error(err);
        }
    }

    return (
        <div className="AddVacation">
            <form onSubmit={handleSubmit(submit)}>
                <h2>Add New Vacation</h2>

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

                <label>
                    Upload Image:
                    <input type="file" accept="image/*" {...register("imageFile", { required: true })} />
                </label>
                {errors.imageFile && <span>Image is required</span>}

                <button type="submit">Add Vacation</button>
            </form>
        </div>
    );
}
