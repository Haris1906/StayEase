import styled from "styled-components";
import PropTypes from "prop-types";
const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.2rem 0;
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function FormRowVertical({ label, error, children }) {
  // Add 'label' to the props validation
  FormRowVertical.propTypes = {
    label: PropTypes.string, // or the appropriate prop type
    error: PropTypes.string, // or the appropriate prop type
    children: PropTypes.node.isRequired,
  };
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRowVertical;
