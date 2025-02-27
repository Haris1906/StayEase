import styled from "styled-components";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import UserSignupForm from "../features/authentication/UserSignupForm";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 2.5rem;
  background-color: var(--color-grey-50);
`;

export default function Signup() {
  return (
    <LoginLayout>
      <Logo />
      <Heading as="h4">Create your account</Heading>
      <UserSignupForm />
    </LoginLayout>
  );
}
