import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";

import StarRating from "../../ui/StarRating";
import styled from "styled-components";
import { useState } from "react";
import { useUser } from "../authentication/useUser";
import { useCreateRatings } from "./useCreateRatings";
import SpinnerMini from "../../ui/SpinnerMini";
// function onSubmit(e) {
//   e.preventDefault();
//   console.log("Form submitted!");
// }
const Textarea = styled.textarea`
  width: 100%;
  height: 10rem;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-md);
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);
  font-size: 1.5rem;
  color: var(--color-grey-700);
  margin-top: 1rem;
  resize: none;
`;
function RatingForm() {
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const { user, isLoading } = useUser();
  const { createRating, isLoading: isCreatingRating } = useCreateRatings();
  const disabled = rating === 0 || description === "";
  if (isLoading) return <p>Loading...</p>;

  function handleClick(e) {
    e.preventDefault();
    const newRating = {
      rating,
      description,
      guestId: user.user_metadata.guestId,
    };
    createRating(newRating, {
      onSuccess: () => {
        setRating(0);
        setDescription("");
      },
    });
  }
  return (
    <Form>
      <FormRow label="Rating">
        <StarRating key={rating} onSetRating={setRating} />
      </FormRow>

      <FormRow label="Description">
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button onClick={handleClick} disabled={disabled}>
          {isCreatingRating ? <SpinnerMini /> : "Rate"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default RatingForm;
