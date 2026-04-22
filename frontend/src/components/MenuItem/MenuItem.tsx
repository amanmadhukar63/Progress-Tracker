import "./MenuItem.scss";

interface IMenuItem {
  title: string;
  icon?: string;
  onClick: () => void;
  active?: boolean;
};

export default function MenuItem({
  title,
  icon: Icon,
  onClick,
  active = false,
} : IMenuItem ) {
  return (
    <button
      className={`menu-item ${active ? "menu-item--active" : ""}`}
      onClick={onClick}
    >
      {Icon && (
        <img className="menu-item__icon" src={Icon} alt="icon" />
      )}
      <span className="menu-item__title">{title}</span>
    </button>
  );
}