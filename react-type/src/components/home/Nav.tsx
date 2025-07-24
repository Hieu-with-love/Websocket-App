import { NavLink } from "react-router-dom";
import chatlogo from "../../assets/chat.svg";
import "./Nav.css";

const Nav = () => {
  return (
    <div className="nav">
      <nav>
        <ul>
          <NavLink
            to={"/"}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <img
              style={{
                width: "30px",
                height: "30px",
                marginRight: "8px",
              }}
              src={chatlogo}
              alt=""
            />
            <span>Home</span>
          </NavLink>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
