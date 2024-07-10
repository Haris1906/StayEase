import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSignUp } from "./useSignup";
import SpinnerMini from "../../ui/SpinnerMini";
import { createguest } from "../../services/apiguests";
import { useState } from "react";
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

export default function UserSignupForm() {
  const { handleSubmit, register, formState, getValues, reset } = useForm();
  const { signup, isLoading } = useSignUp();
  const [isLoading1, setisLoading1] = useState(false);
  function onSubmit({ fullName, email, password }) {
    const role = "user";
    const guestData = {
      fullName: fullName,
      email: email,
    };
    createguest(guestData, setisLoading1).then((data) => {
      signup(
        { fullName, email, password, role, guestId: data },
        {
          onSettled: () => {
            reset();
          },
        }
      );
    });
  }
  const { errors } = formState;
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRowVertical label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", {
            required: "This field is required",
          })}
          disabled={isLoading || isLoading1}
          // This makes this form better for password managers
        />
      </FormRowVertical>
      <FormRowVertical label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
          disabled={isLoading || isLoading1}
          // This makes this form better for password managers
        />
      </FormRowVertical>
      <FormRowVertical label="Password" error={errors?.password?.message}>
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          disabled={isLoading || isLoading1}
        />
      </FormRowVertical>
      <FormRowVertical
        label="ConfirmPassword"
        error={errors?.confirmpassword?.message}
      >
        <Input
          type="password"
          id="confirmpassword"
          {...register("confirmpassword", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Passwords do not match",
          })}
          disabled={isLoading || isLoading1}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isLoading}>
          {!isLoading ? "Sign up" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
      <Div>
        <p>Already have an account ?</p>
        <Linkd to="/login">Login</Linkd>
      </Div>
    </Form>
  );
}
