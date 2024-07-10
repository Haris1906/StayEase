import styled from "styled-components";
import Logout from "../features/authentication/Logout";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import Spinner from "./Spinner";
import { useUser } from "../features/authentication/useUser";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4 rem;
`;

export default function HeaderMenu() {
  const navigate = useNavigate();
  const { user, isLoading } = useUser();
  if (isLoading) return <Spinner />;
  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon
          onClick={() => navigate(`/${user.user_metadata.role}/account`)}
        >
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
}
