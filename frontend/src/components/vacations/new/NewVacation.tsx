import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../../redux/hooks";
import { newVacation } from "../../../redux/vacationProfileSlice";
import useService from "../../../hooks/useService";
import UserVacationsService from "../../../services/auth-aware/UserVacations";
import { useNavigate } from "react-router-dom";
import "./NewVacation.css";

type NewVacationForm = {
  destination: string;
  description: string;
  startDate: string;
  endDate: string;
  price: number;
  imageFile: FileList;
  isDraft: boolean;
};

export default function NewVacation(): JSX.Element {
  const { register, handleSubmit } = useForm<NewVacationForm>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const service = useService(UserVacationsService);

  async function submit(data: NewVacationForm) {
    const formData = new FormData();

    formData.append("destination", data.destination);
    formData.append("description", data.description);
    formData.append("startDate", data.startDate);
    formData.append("endDate", data.endDate);
    formData.append("price", data.price.toString());

    if (data.imageFile?.[0]) {
      formData.append("image", data.imageFile[0]);
    }

    try {
      const created = await service.addVacation(formData);
      dispatch(newVacation(created));
      navigate("/profile"); // or wherever admin dashboard is
    } catch (err) {
      alert("Failed to add vacation");
      console.error(err);
    }
  }

  return (
    <div className="NewVacation">
      <form onSubmit={handleSubmit(submit)}>
        <input placeholder="Destination" {...register("destination", { required: true })} />
        <textarea placeholder="Description" {...register("description", { required: true })} />

        <input type="date" {...register("startDate", { required: true })} />
        <input type="date" {...register("endDate", { required: true })} />

        <input
          type="number"
          placeholder="Price"
          {...register("price", {
            required: true,
            min: 0,
            max: 10000,
          })}
        />

        <input type="file" {...register("imageFile")} />

        <button type="submit">Add Vacation</button>
      </form>
    </div>
  );
}
