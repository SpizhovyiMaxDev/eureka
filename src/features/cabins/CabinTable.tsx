import { useCabins } from "./useCabins";
import { Cabin } from "../../types/cabin";
import { useSearchParams } from "react-router-dom";

import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

type FilterKey = "all" | "with-discount" | "no-discount";

type SortKey =
  | "name-descending"
  | "name-ascending"
  | "regularPrice-descending"
  | "regularPrice-ascending"
  | "maxCapacity-descending"
  | "maxCapacity-ascending";

type SortHandler = (cabins: Cabin[]) => Cabin[];

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
  const sortingHandlers: Record<SortKey, SortHandler> = {
    "name-descending": (cabins: Cabin[]) =>
      cabins.sort((a, b) => b.name.localeCompare(a.name)),
    "name-ascending": (cabins: Cabin[]) =>
      cabins.sort((a, b) => a.name.localeCompare(b.name)),
    "regularPrice-descending": (cabins: Cabin[]) =>
      cabins.sort((a, b) => b.regularPrice - a.regularPrice),
    "regularPrice-ascending": (cabins: Cabin[]) =>
      cabins.sort((a, b) => a.regularPrice - b.regularPrice),
    "maxCapacity-descending": (cabins: Cabin[]) =>
      cabins.sort((a, b) => b.maxCapacity - a.maxCapacity),
    "maxCapacity-ascending": (cabins: Cabin[]) =>
      cabins.sort((a, b) => a.maxCapacity - b.maxCapacity),
  };

  const displayCabins: Cabin[] = sortingHandlers[sortBy]?.(
    cabinsData[filteredValue]
  );

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
          data={displayCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
