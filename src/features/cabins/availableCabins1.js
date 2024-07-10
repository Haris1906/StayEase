export default function availableCabins1(cabins, startDate, endDate) {
  console.log(cabins);
  const availableCabins = cabins.filter((cabin) => {
    const len = cabin.booked_from?.length;
    let h = true;
    for (let i = 0; i < len; i++) {
      let cabinstartDate = cabin["booked_from"][i]?.split("T") || null;
      let cabinendDate = cabin["booked_to"][i]?.split("T") || null;
      if (cabinstartDate && cabinendDate) {
        const cabinstartTime = cabinstartDate[1].split(":");
        const cabinendTime = cabinendDate[1].split(":");
        cabinstartDate[1] =
          Number(cabinstartTime[0]) * 60 * 60 +
          Number(cabinstartTime[1]) * 60 +
          Number(cabinstartTime[2]);
        cabinendDate[1] =
          Number(cabinendTime[0]) * 60 * 60 +
          Number(cabinendTime[1]) * 60 +
          Number(cabinendTime[2]);
      }

      const r =
        (cabinstartDate === null && cabinendDate === null) ||
        ((cabinstartDate[0] > endDate[0] ||
          (cabinstartDate[0] === endDate[0] &&
            cabinstartDate[1] >= endDate[1])) &&
          (cabinstartDate[0] > startDate[0] ||
            (cabinstartDate[0] === startDate[0] &&
              cabinstartDate[1] >= startDate[1]))) ||
        ((cabinendDate[0] < endDate[0] ||
          (cabinendDate[0] === endDate[0] && cabinendDate[1] <= endDate[1])) &&
          (cabinendDate[0] < startDate[0] ||
            (cabinendDate[0] === startDate[0] &&
              cabinendDate[1] <= startDate[1])));

      if (r === false) {
        h = false;
        break;
      }
    }
    return h;
  });
  return availableCabins;
}
