import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
import availableCabins1 from "./availableCabins1";
import { useRole } from "../../context/RoleContext";

function CabinTable() {
  const { role } = useRole();
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();
  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty resourceName="cabins" />;
  let startDate = searchParams.get("startDate")?.split("T");
  let endDate = searchParams.get("endDate")?.split("T");
  let all = "all";
  let availableCabins = cabins;
  if (startDate && endDate) {
    all = "not-all";
    const startTime = startDate[1].split(":");
    const endTime = endDate[1].split(":");
    startDate[1] = Number(startTime[0]) * 60 * 60 + Number(startTime[1]) * 60;
    endDate[1] = Number(endTime[0]) * 60 * 60 + Number(endTime[1]) * 60;
    availableCabins = availableCabins1(cabins, startDate, endDate);
  } else {
    if (role === "user") {
      availableCabins = [];
      console.log("availableCabins", availableCabins);
    }
  }
  const filterValue = searchParams.get("discount") || "all";
  let filteredCabins;
  if (filterValue === "no-discount") {
    filteredCabins = availableCabins.filter((cabin) => cabin.discount === 0);
  } else if (filterValue === "with-discount") {
    filteredCabins = availableCabins.filter((cabin) => cabin.discount > 0);
  } else {
    filteredCabins = availableCabins;
  }

  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const SortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );
  const coloumns =
    role === "admin"
      ? all == "all"
        ? "0.6fr 1.8fr 2.2fr 1fr 1fr  1fr"
        : "0.6fr 1.8fr 2.2fr 1fr 1fr 0.6fr 1fr"
      : "0.6fr 1.8fr 2.2fr 1fr 1fr 0.6fr";
  console.log("SortedCabins", SortedCabins);
  return (
    <Menus>
      <Table columns={coloumns}>
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          {all && all !== "all" && <div>Book</div>}
          {role === "admin" && <div></div>}
        </Table.Header>
        <Table.Body
          data={SortedCabins}
          render={(cabin) => (
            <CabinRow cabin={cabin} key={cabin.id} all={all} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
