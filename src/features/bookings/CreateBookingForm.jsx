import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";

import { useCreateBooking } from "./useCreateBooking";
import { getCode } from "country-list";

import { useSettings } from "../settings/useSettings";
import styled from "styled-components";
import PropTypes from "prop-types";
import { differenceInDays } from "date-fns/differenceInDays";
import { useSearchParams } from "react-router-dom";
import { useRole } from "../../context/RoleContext";
import { useUser } from "../authentication/useUser";
const Select = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;
export default function CreateBookingForm({
  onCloseModal,
  id,
  regularPrice,
  discount,
  maxCapacity,
}) {
  console.log(maxCapacity);
  const [searchParams] = useSearchParams();
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const { register, formState, handleSubmit, reset } = useForm({});
  const { errors } = formState;

  const { isCreating, createBooking } = useCreateBooking();
  const { settings, isLoading } = useSettings();
  const { user, isLoading2 } = useUser();
  const isWorking = isCreating || isLoading || isLoading2;
  const { role } = useRole();
  console.log(startDate, endDate);
  function onSubmit(data) {
    const cc = getCode(data.nationality).toLowerCase();
    const flag = `https://flagcdn.com/${cc}.svg`;

    if (role === "admin") {
      const guestData = {
        fullName: data.fullName,
        email: data.email,
        nationality: data.nationality,
        nationalID: Number(data.nationalID),
        countryFlag: flag,
      };
      const extra = data.needBreakfast === "true" ? settings.breakfastPrice : 0;
      const bookingData = {
        startDate: startDate,
        endDate: endDate,
        numGuests: Number(data.numGuests),
        hasBreakfast: data.needBreakfast,
        observations: data.observations,
        extrasPrice: extra * data.numGuests,
        totalPrice: regularPrice - discount + extra * data.numGuests,
        cabinId: id,
        cabinPrice: regularPrice - discount,
        status: "unconfirmed",
        isPaid: false,
        numNights: differenceInDays(new Date(endDate), new Date(startDate)),
      };
      const cabindata = {
        booked_from: startDate,
        booked_to: endDate,
      };
      const p = null;
      createBooking(
        {
          guestData: guestData,
          bookingData: bookingData,
          cabindata: cabindata,
          guestId: p,
          cabinId: id,
          role: role,
        },
        {
          onSuccess: () => {
            reset();
            onCloseModal();
          },
        }
      );
    } else {
      const guestData = {
        nationality: data.nationality,
        nationalID: Number(data.nationalID),
        countryFlag: flag,
      };
      const extra = data.needBreakfast === "true" ? settings.breakfastPrice : 0;
      const bookingData = {
        startDate: startDate,
        endDate: endDate,
        numGuests: Number(data.numGuests),
        hasBreakfast: data.needBreakfast,
        observations: data.observations,
        extrasPrice: extra * data.numGuests,
        totalPrice: regularPrice - discount + extra * data.numGuests,
        guestId: user.user_metadata.guestId,
        cabinId: id,
        cabinPrice: regularPrice - discount,
        status: "unconfirmed",
        isPaid: false,
        numNights: differenceInDays(new Date(endDate), new Date(startDate)),
      };
      const cabindata = {
        booked_from: startDate,
        booked_to: endDate,
      };
      const guestId = user.user_metadata.guestId;
      createBooking(
        {
          guestData: guestData,
          bookingData: bookingData,
          cabindata: cabindata,
          guestId: guestId,
          cabinId: id,
          role: role,
        },
        {
          onSuccess: () => {
            reset();
            onCloseModal();
          },
        }
      );
    }
  }
  return (
    <Form
      type={onCloseModal ? "modal" : "regular"}
      onSubmit={handleSubmit(onSubmit)}
    >
      {role === "admin" && (
        <FormRow label="Full name" error={errors?.fullName?.message}>
          <Input
            type="text"
            id="name"
            disabled={isWorking}
            {...register("fullName", {
              required: "This field is required",
            })}
          />
        </FormRow>
      )}

      {role === "admin" && (
        <FormRow label="Email" error={errors?.email?.message}>
          <Input
            type="email"
            id="name"
            disabled={isWorking}
            {...register("email", {
              required: "This field is required",
            })}
          />
        </FormRow>
      )}

      <FormRow label="Nationality" error={errors?.nationality?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("nationality", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="NationalId" error={errors?.nationalID?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("nationalID", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Start date" error={errors?.startDate?.message}>
        <Input
          type="datetime-local"
          value={startDate}
          disabled
          id="maxCapacity"
        />
      </FormRow>

      <FormRow label="End date" error={errors?.endDate?.message}>
        <Input
          type="datetime-local"
          id="regularPrice"
          disabled
          value={endDate}
        />
      </FormRow>

      <FormRow label="Number of guests" error={errors?.numGuests?.message}>
        <Input
          type="number"
          id="numGuests"
          disabled={isWorking}
          {...register("numGuests", {
            required: "This field is required",
            validate: (value) =>
              value <= maxCapacity ||
              `Cabin only fits up to ${maxCapacity} guests`,
          })}
        />
      </FormRow>

      <FormRow label="needBreakfast">
        <Select
          {...register("needBreakfast", {
            required: "This field is required",
          })}
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </Select>
      </FormRow>

      <FormRow label="Observations" error={errors?.observations?.message}>
        <Textarea
          disabled={isWorking}
          type="number"
          id="description"
          defaultValue=""
          {...register("observations", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset" disabled={isWorking}>
          Cancel
        </Button>
        <Button disabled={isWorking}>Create Booking</Button>
      </FormRow>
    </Form>
  );
}

CreateBookingForm.propTypes = {
  onCloseModal: PropTypes.func,
  id: PropTypes.number,
  regularPrice: PropTypes.number,
  discount: PropTypes.number,
  maxCapacity: PropTypes.number,
};
