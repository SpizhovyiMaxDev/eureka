import styled from "styled-components";
import { useState } from "react";

import { Cabin } from "../../types/cabin";
import { formatCurrency } from "../../utils/currency";
import useDeleteCabin from "./useDeleteCabin";

import CreateCabinForm from "./CreateCabinForm";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

type ImgProps = { src: string };

const Img = styled.img<ImgProps>`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const CabinContainer = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

type CabinRowProps = {
  cabin: Cabin;
  key: number;
};

function CabinRow({ cabin }: CabinRowProps) {
  const [showForm, setShowForm] = useState<boolean>(false);
  const { isDeleting, deleteMutation } = useDeleteCabin();

  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
  } = cabin;

  return (
    <>
      <TableRow role="row">
        <Img src={image} />
        <CabinContainer>{name}</CabinContainer>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div>
          <button onClick={() => deleteMutation(cabinId)} disabled={isDeleting}>
            Delete
          </button>
          <button onClick={() => setShowForm((show) => !show)}>Edit</button>
        </div>
      </TableRow>
      {showForm && <CreateCabinForm cabin={cabin} />}
    </>
  );
}

export default CabinRow;
