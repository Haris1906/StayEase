import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const RoleContext = createContext();

function RoleProvider({ children }) {
  const [role, setRole] = useState(null);

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
}

function useRole() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error("RoleContext was used outside of RoleContextProvider");
  }
  return context;
}

RoleProvider.propTypes = {
  children: PropTypes.node,
};

export { RoleProvider, useRole };
