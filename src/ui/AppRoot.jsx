import { Outlet } from "react-router-dom";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export default function AppRoot({ isLoading }) {
  if (isLoading) {
    return <Spinner />;
  }
  return <Outlet />;
}

AppRoot.propTypes = {
  isLoading: PropTypes.bool,
};
