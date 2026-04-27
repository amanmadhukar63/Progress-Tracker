import type { ReactElement } from "react";
import "./Button.scss";
import type React from "react";

interface IButton {
  type: "button" | "submit";
  variant?: "primary" | "secondary";
  title: String;
  style?: React.CSSProperties;
}

export default function Button({
  title,
  type = "button",
  variant = "primary",
  style = {}
}: IButton) : ReactElement {
  return (
    <button type={type} className={`button button--${variant}`} style={style}>
      {title}
    </button>
  );
}