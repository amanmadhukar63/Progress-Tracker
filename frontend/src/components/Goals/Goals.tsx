import { useState } from "react";
import "./Goals.scss";
import Modal from 'react-modal';
import { useSearchParams } from "react-router-dom";
import type z from "zod";
import { goalSchema } from "../../types/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../Button/Button";

type FormData = z.infer<typeof goalSchema>;

export default function Goals() {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(goalSchema),
  })

  const [searchParams, setSearchParams] = useSearchParams();
  const isOpen = searchParams.get("create");
  const [modalOpen, setModalOpen] = useState(isOpen?.toLowerCase()==="true" ? true : false);

  function closeModal() {
    setModalOpen(false);
    setSearchParams("?create=false", { replace: true});
  }

  function handleCreateGoal() {
    setModalOpen(true);
    setSearchParams("?create=true", {replace: true});
  }

  async function onSubmit(data: FormData) {
    try {
      // simulate API call
      await new Promise((res) => setTimeout(res, 1000));

      console.log(data);
    } catch (err) {
      setError("root", {
        message: "Something went wrong. Try again.",
      });
    }
  }

  return (
    <div>
      Goals
      <button onClick={handleCreateGoal}>Create</button>
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
      >
        <div className="goal-modal-container">
          <h3 className="goal-modal-container__title">Create Goal</h3>
          <form className="goal-modal-container__form" onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
              <label className="label">Title *</label>
              <input {...register("title")} placeholder="Title" />
              {errors.title && <p>{errors.title.message}</p>}
            </div>

            <div className="field">
              <label className="label">Description</label>
              <input {...register("description")} placeholder="Description" />
              {errors.description && <p>{errors.description.message}</p>}
            </div>

            <div className="field-container">
              <div className="field">
                <label className="label">Start Date *</label>
                <input {...register("start_date")} placeholder="Start Date" type="date" />
                {errors.start_date && <p>{errors.start_date.message}</p>}
              </div>
              <div className="field">
                <label className="label">End Date</label>
                <input {...register("end_date")} placeholder="End Date" type="date" />
                {errors.end_date && <p>{errors.end_date.message}</p>}
              </div>
            </div>

            {errors.root && <p>{errors.root.message}</p>}

            <Button
              title={isSubmitting ? "Creating..." : "Create"}
              type="submit"
              style={{
                borderRadius: "12px",
                padding: "10px",
                marginTop: "30px",
              }}
            />
          </form>
        </div>
      </Modal>
    </div>
  );
}