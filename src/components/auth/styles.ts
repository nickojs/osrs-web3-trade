import styled from 'styled-components';
import { resetInput } from '../../globalStyles';

const Base = styled.div`
  width: 500px;
  padding: 24px;

  border-radius: 12px;
  border: 6px outset black;
  box-shadow: 0 0 0 1px black;
  box-sizing: border-box;

  background: rgb(90,92,102);
  background: linear-gradient(117deg, rgba(90,92,102,1) 0%, rgba(76,78,89,1) 35%, rgba(44,45,52,1) 100%); 
  
  & p{ 
    text-align: center;
    color: white;
  }
`;

export const Container = styled(Base)`
  height: 180px;
`;

export const LoginFormContainer = styled(Base)` 
  min-height: 180px;
  margin: 0 auto;
  
  * { font-size: 14px; }
`;

export const CreatFormContainer = styled(Base)` 
  height: 280px;
  margin: 12px auto;
  
  * { font-size: 14px; }
`;

export const RuneInput = styled.input`
  ${resetInput}
  color: gold;
  border-bottom: 1px solid black;
`;

export const RuneLabel = styled.label`
  margin-right: 6px;
  span { 
    color: white;
    font-weight: bold;
    font-family: 'Press Start 2P', cursive;
  }
`;

export const RuneButton = styled.button`
  ${resetInput}

  padding: 12px;
  background: white;

  border-radius: 12px;
  border: 4px double black;

  cursor: pointer;

  &:hover{
    background: lightgray;
  }

  &:disabled{
    background-color: black;
    cursor: not-allowed;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 16px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  width: 100%;
  margin-top: 16px;
`;

export const ErrorMessage = styled.span`
  display: block;
  
  width: 100%;
  margin-bottom: 6px;
  
  font-size: 12px;
  text-align: right;
  
  color: red;
`;
