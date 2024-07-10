import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useRole } from "../../context/RoleContext";
const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;
  margin-top: 1rem;
  font-size: 1.4rem;
  color: var(--color-grey-500);
`;
const Linkd = styled(Link)`
  color: var(--color-indigo-700);
  font-weight: 500;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
function LoginForm() {
  const { setRole } = useRole();
  const [email, setEmail] = useState("haris@gmail.com");
  const [password, setPassword] = useState("Haris@123");
  const { login, isLoading } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
        onSuccess: (user) => {
          setRole(user?.user_metadata?.role);
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isLoading}>
          {!isLoading ? "Log in" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
      <Div>
        <p>New user ?</p>
        <Linkd to="/signup"> Sign up</Linkd>
      </Div>
    </Form>
  );
}

export default LoginForm;
