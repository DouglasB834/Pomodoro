//
import { HeaderContainer } from "./styles";
import { Timer, ClipboardList } from "lucide-react";
import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <HeaderContainer>
      <h3>🚀 Pomodoro Power</h3>

      <nav>
        <NavLink to="/" title="home">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="history">
          <ClipboardList size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  );
};
