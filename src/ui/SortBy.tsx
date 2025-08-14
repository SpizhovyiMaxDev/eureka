import { useSearchParams } from "react-router-dom";
import Select from "./Select";
import { ChangeEvent } from "react";

type SortOption = { value: string; label: string };

export interface SortByProps {
  options: SortOption[];
}

function SortBy({ options }: SortByProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  function handleChange(e: ChangeEvent<HTMLSelectElement>): void {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      handleChange={handleChange}
      options={options}
      type="white"
      value={sortBy}
    ></Select>
  );
}

export default SortBy;
