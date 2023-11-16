import styled from "styled-components";
import {font} from "../../assets/styles/mixins";

export const OptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 700px;
`;

export const OptionsForm = styled.div`
  display: flex;
  flex-direction: column;
  ${font(`50px, 17px, 400, #000`)}
`

export const OptionWrapper  = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

export const OptionsTitle = styled.h2`
  ${font(`17px, 18px, 500, #000 `)};
  width: 500px;
  text-align: center;
`;

export const RadioInput = styled.input.attrs({ type: 'radio' })`
  appearance: none;
  position: relative;
  width: 20px;
  height: 20px;
  background-color: #fff;
  border: 2px solid #0073FF;
  border-radius: 50%;


  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    background-color: #0073FF;
    border-radius: 50%;
    opacity: ${(props) => (props.checked ? 1 : 0)};
    transition: opacity 0.2s ease-in-out; 
  }

  &:checked {
    border-color: #0073FF; 
  }
`;
