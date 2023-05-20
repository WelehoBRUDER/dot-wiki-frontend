export default function Button({
  type,
  onClick,
  children,
  className = "menu-button",
}) {
  return (
    <div className="animation-wrapper">
      <button
        type={type}
        className={className}
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/image/menu_button.png)`,
        }}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
}
