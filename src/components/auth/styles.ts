import styled, { css } from 'styled-components';

export const resetInput = css` 
  -webkit-box-shadow:  none;
  -moz-box-shadow:  none;
  border: none;
  background-image: none;
  background-color: transparent;
  box-shadow:  none;
`;

export const Container = styled.div`
  min-width: 460px;
  min-height: 120px;
  padding: 24px;

  border-radius: 12px;
  border: 6px outset black;
  box-shadow: 0 0 0 1px black;

  background: rgb(90,92,102);
  background: linear-gradient(117deg, rgba(90,92,102,1) 0%, rgba(76,78,89,1) 35%, rgba(44,45,52,1) 100%); 

  & p{ 
    text-align: center;
    color: white;
  }
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;

  height: 100%;
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

export const LoginFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  width: 90%;
  margin: 12px auto;
  * { font-size: 14px; }
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 12px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  width: 100%;
  margin-top: 16px;
`;

export const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
  align-self: flex-end;
  text-align: right;
  margin-bottom: 6px;
`;
