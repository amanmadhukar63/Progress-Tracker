import type { ReactElement } from "react";
import "./Button.scss";
import type React from "react";

interface IButton {
  type: "button" | "submit";
  title: String;
  style?: React.CSSProperties;
}

export default function Button({
  title,
  type = "button",
  style = {}
}: IButton) : ReactElement {
  return (
    <button type={type} className="button" style={style}>
      {title}
    </button>
  );
}