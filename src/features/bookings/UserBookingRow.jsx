import PropTypes from "prop-types";
import styled from "styled-components";

import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { HiEye, HiTrash } from "react-icons/hi2";
import ConfirmDelete from "../../ui/ConfirmDelete";

import Menus from "../../ui/Menus";
import { useNavigate } from "react-router-dom";
import Modal from "../../ui/Modal";

import { useDeleteBooking } from "./useDeleteBooking";
import { useUser } from "../authentication/useUser";
import Spinner from "../../ui/Spinner";
import { format } from "date-fns";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

const Span = styled.div`
  padding-left: 1.5rem;
  font-weight: 500;
`;

const Span1 = styled.div`
  padding-left: 1.5rem;
  font-weight: 500;
`;

function UserBookingRow({
  booking: {
    startDate,
    endDate,
    numNights,
    totalPrice,
    id: bookingId,
    cabins: { name: cabinName },
  },
}) {
  const navigate = useNavigate();
  const { deleteBooking, isDeleting } = useDeleteBooking();
  const { user, isLoading } = useUser();
  const role = user?.user_metadata?.role;
  if (isLoading) return <Spinner />;
  console.log(endDate);
  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Span>
        {numNights} {numNights > 1 ? "nights" : "night"}
      </Span>
      <Span1>{format(new Date(startDate), "yyyy-MM-dd")}</Span1>
      <Span>{format(new Date(startDate), "HH:mm:ss")}</Span>
      <Span1>{format(new Date(endDate), "yyyy-MM-dd")}</Span1>
      <Span>{format(new Date(endDate), "HH:mm:ss")}</Span>

      <Amount>{formatCurrency(totalPrice)}</Amount>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />
          <Menus.List id={bookingId}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/${role}/bookings/${bookingId}`)}
            >
              See Details
            </Menus.Button>
            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />} onClick={() => {}}>
                Delete Booking
              </Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>
        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="booking"
            disabled={isDeleting}
            onConfirm={() => {
              deleteBooking(bookingId);
            }}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

UserBookingRow.propTypes = {
  booking: PropTypes.shape({
    id: PropTypes.number.isRequired,
    created_at: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    numNights: PropTypes.number.isRequired,
    numGuests: PropTypes.number.isRequired,
    totalPrice: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    guests: PropTypes.shape({
      fullName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
    cabins: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default UserBookingRow;
