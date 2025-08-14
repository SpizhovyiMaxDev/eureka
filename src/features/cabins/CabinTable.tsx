import { useCabins } from "./useCabins";

import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import { Cabin } from "../../types/cabin";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const { cabins: data, error, isFetching } = useCabins();
  const [searchParams] = useSearchParams();
  const cabins: Cabin[] = data ?? [];

  if (isFetching) return <Spinner />;
  if (error) return <p>{error.message}</p>;

  const filteredValue = searchParams.get("discount") || "all";
  const cabinsData: Record<string, Cabin[]> = {
    all: cabins,
    "with-discount": cabins.filter((cabin) => cabin.discount > 0),
    "no-discount": cabins.filter((cabin) => cabin.discount === 0),
  };

  const filteredCabins: Cabin[] = cabinsData[filteredValue];

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
          data={filteredCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
