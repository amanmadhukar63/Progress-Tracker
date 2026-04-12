import type { ReactElement } from "react";
import "./Button.scss";

interface IButton {
  type: "button" | "submit";
  title: String;
}

export default function Button({
  title,
  type = "button",
}: IButton) : ReactElement {
  return (
    <button type={type} className="button">
      {title}
    </button>
  );
}