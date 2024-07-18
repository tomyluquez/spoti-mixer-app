import { Children } from "../../models/children.interface";
import "./cards.css";

const SimpleCard = ({ children }: Children) => {
  return <div className="simple-card">{children}</div>;
};

export default SimpleCard;
