import styled from "styled-components";
import { SortByProps } from "./SortBy";
import { ChangeEvent } from "react";

const StyledSelect = styled.select<{ value: string; type: string }>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${({ type }) =>
      type === "white" ? "var(--color-grey-100)" : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

type SelectProps = SortByProps & {
  value?: string;
  type: string;
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

function Select({ options, value, handleChange, ...props }: SelectProps) {
  return (
    <StyledSelect onChange={handleChange} value={value ?? ""} {...props}>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}

export default Select;
