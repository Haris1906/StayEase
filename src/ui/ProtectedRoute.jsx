import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import styled from "styled-components";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { useRole } from "../context/RoleContext";
const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export function ProtectedRoute({ children }) {
  console.log("ProtectedRoute");
  const navigate = useNavigate();
  const { setRole } = useRole();
  const { isLoading, isAuthenticated, user } = useUser();
  const role = user?.user_metadata?.role;
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  useEffect(() => {
    if (role) {
      setRole(role);
    }
  }, [role, setRole]);
  if (isLoading) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }
  console.log(isAuthenticated);
  if (isAuthenticated) {
    return children;
  }
}

ProtectedRoute.propTypes = {
  children: PropTypes.node,
};
