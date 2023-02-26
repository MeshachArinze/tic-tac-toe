import { value } from "../tictactoe";

const Square = (props: value) => {
  return (
    <button
      className={props.value ? "btn disabled" : "btn"}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
};

export default Square;
