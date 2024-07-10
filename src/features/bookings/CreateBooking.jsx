import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateBookingForm from "./CreateBookingForm";
import PropTypes from "prop-types";

export default function CreateBooking({
  id,
  regularPrice,
  discount,
  all,
  maxCapacity,
}) {
  return (
    <div>
      <Modal>
        <Modal.Open opens="booking-form">
          <Button size="small" disabled={all === "all"}>
            book
          </Button>
        </Modal.Open>
        <Modal.Window name="booking-form">
          <CreateBookingForm
            id={id}
            regularPrice={regularPrice}
            discount={discount}
            maxCapacity={maxCapacity}
          />
        </Modal.Window>
      </Modal>
    </div>
  );
}

CreateBooking.propTypes = {
  id: PropTypes.number.isRequired,
  regularPrice: PropTypes.number.isRequired,
  discount: PropTypes.number,
  all: PropTypes.string,
  maxCapacity: PropTypes.number.isRequired,
};
