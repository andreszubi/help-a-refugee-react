const capitalize = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
export const Filter = ({ title, isActive, onClick }) => {
  return React.createElement(
    "div",
    {
      className: styles.wrapper,
      onClick: onClick,
      style: { backgroundColor: `${isActive ? "lavender" : "white"}` },
    },
    React.createElement("div", {
      className: styles.circle,
      style: {
        borderColor: `${
          title === "draft"
            ? "gold"
            : title === "rejected"
            ? "tomato"
            : "limegreen"
        }`,
      },
    }),
    React.createElement("h3", { className: styles.title }, capitalize(title))
  );
};
