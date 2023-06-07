import "./Card.css";
import PropTypes from "prop-types";

function Card(props) {
  const { title, body } = props;
  return (
    <div className="Card">
      <h3>{title}</h3>
      <div>{body}</div>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
};

export default Card;
