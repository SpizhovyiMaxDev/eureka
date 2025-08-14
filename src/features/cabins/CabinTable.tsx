import { useCabins } from "./useCabins";
import { Cabin } from "../../types/cabin";
import { useSearchParams } from "react-router-dom";

import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

type FilterKey = "all" | "with-discount" | "no-discount";

type Direction = "ascending" | "descending";
type SortKey = `${string}-${Direction}`;

function CabinTable() {
  const { cabins: data, error, isFetching } = useCabins();
  const [searchParams] = useSearchParams();
  const cabins: Cabin[] = data ?? [];

  if (isFetching) return <Spinner />;
  if (error) return <p>{error.message}</p>;

  const filteredValue = (searchParams.get("discount") ?? "all") as FilterKey;
  const cabinsData: Record<FilterKey, Cabin[]> = {
    all: cabins,
    "with-discount": cabins.filter((cabin) => cabin.discount > 0),
    "no-discount": cabins.filter((cabin) => cabin.discount === 0),
  };

  const sortBy = (searchParams.get("sortBy") ?? "name-descending") as SortKey;
  const [field, direction]: string[] = sortBy.split("-");
  const order = direction === "ascending" ? -1 : 1;

  const sortedCabins: Cabin[] = [...cabinsData[filteredValue]].sort((a, b) => {
    const valueA = (a as Record<string, unknown>)[field];
    const valueB = (b as Record<string, unknown>)[field];

    if (typeof valueA === "string" && typeof valueB === "string") {
      return valueA.localeCompare(valueB) * order;
    }

    if (typeof valueA === "number" && typeof valueB === "number") {
      return (valueA - valueB) * order;
    }

    const numA = Number(valueA);
    const numB = Number(valueB);
    return Number.isFinite(numA) && Number.isFinite(numB)
      ? (numA - numB) * order
      : 0;
  });

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body<Cabin>
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
