import styled, { css } from "styled-components";
import { RowProps } from "./Row.types";

const Row = styled.div<RowProps>`
    display:flex;

    ${(props) =>
        props.type === "horizontal" && 
        css`
           justify-content: space-between;
           align-items: center;
        `}

    ${(props) =>
        props.type === "vertical" && 
        css`
           flex-direction: column;
           gap: 1.5rem;
        `}
`;

Row.defaultProps = {
    type:"vertical"
}

export default Row