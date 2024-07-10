import AddCabins from "../features/cabins/AddCabin";
import CabinTable from "../features/cabins/CabinTable";
import CabinTableOperations from "../features/cabins/CabinTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import SearchByDate from "../ui/SearchByDate";
import { useRole } from "../context/RoleContext";

function Cabins() {
  const { role } = useRole();
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">
          {role === "user" ? "Available Cabins" : "All cabins"}
        </Heading>
        <CabinTableOperations />
      </Row>
      <Row>
        <SearchByDate />
      </Row>
      <Row>
        <CabinTable />
        {role === "admin" && <AddCabins />}
      </Row>
    </>
  );
}

export default Cabins;
