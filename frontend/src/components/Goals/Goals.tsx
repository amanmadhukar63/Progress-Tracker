import { useEffect, useRef, useState } from "react";
import "./Goals.scss";
import Modal from 'react-modal';
import { useSearchParams } from "react-router-dom";
import type z from "zod";
import { goalSchema } from "../../types/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../Button/Button";
import PlusIcon from "../../assets/plus-icon.svg";
import { animate } from "animejs";

type FormData = z.infer<typeof goalSchema>;
type StatusTab = "all" | "active" | "completed";

export default function Goals() {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(goalSchema),
  });

  const tabsRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  const [activeTab, setActiveTab] = useState<StatusTab>("all");
  const [hoveredTab, setHoveredTab] = useState<StatusTab | null>(null);

  const currentVisibleTab = hoveredTab || activeTab;

  const [searchParams, setSearchParams] = useSearchParams();
  const isOpen = searchParams.get("create");

  const [modalOpen, setModalOpen] = useState(
    isOpen?.toLowerCase() === "true" ? true : false
  );

  useEffect(() => {
    const tabs = tabsRef.current?.querySelectorAll(".tab");

    if (!tabs || !indicatorRef.current || !tabsRef.current) return;

    const activeElement = Array.from(tabs).find(
      (tab) => tab.getAttribute("data-tab") === currentVisibleTab
    ) as HTMLElement | undefined;

    if (!activeElement) return;

    const parentRect = tabsRef.current.getBoundingClientRect();
    const rect = activeElement.getBoundingClientRect();

    animate(indicatorRef.current, {
      translateX: rect.left - parentRect.left,
      width: rect.width,
      duration: 300,
      easing: "cubic-bezier(.22,1,.36,1)",
    });
  }, [activeTab, hoveredTab, currentVisibleTab]);

  function closeModal() {
    setModalOpen(false);
    setSearchParams("?create=false", { replace: true });
  }

  function handleCreateGoal() {
    setModalOpen(true);
    setSearchParams("?create=true", { replace: true });
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
    <div className="goals-container">
      <div className="goals-container__goals-subcontainer">
        <div className="header">
          <div className="left">
            <div className="subtitle">PERFORMANCE HUB</div>
            <div className="title">My Goals</div>
          </div>

          <div className="right">
            <button onClick={handleCreateGoal}>
              <img src={PlusIcon} alt="plus-icon" /> Create Goal
            </button>
          </div>
        </div>

        <div className="status-container">
          <div
            className="left"
            ref={tabsRef}
            onMouseLeave={() => setHoveredTab(null)}
          >
            <span className="indicator" ref={indicatorRef}></span>

            <div
              className={`tab ${
                currentVisibleTab === "all" ? "active" : ""
              }`}
              data-tab="all"
              onClick={() => setActiveTab("all")}
              onMouseEnter={() => setHoveredTab("all")}
            >
              All
            </div>

            <div
              className={`tab ${
                currentVisibleTab === "active" ? "active" : ""
              }`}
              data-tab="active"
              onClick={() => setActiveTab("active")}
              onMouseEnter={() => setHoveredTab("active")}
            >
              Active
            </div>

            <div
              className={`tab ${
                currentVisibleTab === "completed" ? "active" : ""
              }`}
              data-tab="completed"
              onClick={() => setActiveTab("completed")}
              onMouseEnter={() => setHoveredTab("completed")}
            >
              Completed
            </div>
          </div>

          <div className="right">
            <div>
              <div className="stat-title">ACTIVE RATE</div>
              <div className="stat success">84%</div>
            </div>

            <div className="line"></div>

            <div>
              <div className="stat-title">COMPLETED</div>
              <div className="stat">12</div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
      >
        <div className="goal-modal-container">
          <h3 className="goal-modal-container__title">Create Goal</h3>

          <form
            className="goal-modal-container__form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="field">
              <label className="label">Title *</label>

              <input {...register("title")} placeholder="Title" />

              {errors.title && <p>{errors.title.message}</p>}
            </div>

            <div className="field">
              <label className="label">Description</label>

              <input
                {...register("description")}
                placeholder="Description"
              />

              {errors.description && <p>{errors.description.message}</p>}
            </div>

            <div className="field-container">
              <div className="field">
                <label className="label">Start Date *</label>

                <input
                  {...register("start_date")}
                  placeholder="Start Date"
                  type="date"
                />

                {errors.start_date && <p>{errors.start_date.message}</p>}
              </div>

              <div className="field">
                <label className="label">End Date</label>

                <input
                  {...register("end_date")}
                  placeholder="End Date"
                  type="date"
                />

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