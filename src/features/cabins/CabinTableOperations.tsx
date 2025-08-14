import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "with-discount", label: "With discount" },
          { value: "no-discount", label: "No discount" },
        ]}
      />

      <SortBy
        options={[
          { value: "name-ascending", label: "Sort by name (A-Z)" },
          { value: "name-descending", label: "Sort by name (Z-A)" },
          {
            value: "regularPrice-descending",
            label: "Sort by price (low first)",
          },
          {
            value: "regularPrice-ascending",
            label: "Sort by price (high first)",
          },
          {
            value: "maxCapacity-descending",
            label: "Sort by capacity (low first)",
          },
          {
            value: "maxCapacity-ascending",
            label: "Sort by capacity (high first)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
