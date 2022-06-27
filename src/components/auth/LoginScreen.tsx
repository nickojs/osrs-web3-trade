import { useForm } from 'react-hook-form';
import {
  ButtonWrapper,
  Container, InputWrapper, LoginFormContainer, RuneButton, RuneInput, RuneLabel
} from './styles';

export default () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const onSubmit = (data: any) => console.log(data);
  console.log(errors);

  return (
    <Container>
      <LoginFormContainer onSubmit={handleSubmit(onSubmit)}>
        <InputWrapper>
          <RuneLabel htmlFor="username">
            <span>
              username:
            </span>
          </RuneLabel>
          <RuneInput
            type="text"
            id="username"
            {...register('username', { required: true, maxLength: 12 })}
          />
        </InputWrapper>
        <InputWrapper>
          <RuneLabel htmlFor="password">
            <span>
              password:
            </span>
          </RuneLabel>
          <RuneInput
            type="password"
            id="password"
            {...register('password', { required: true, maxLength: 20 })}
          />
        </InputWrapper>
      </LoginFormContainer>
      <ButtonWrapper>
        <RuneButton>
          New User
        </RuneButton>
        <RuneButton>
          Existing User
        </RuneButton>
      </ButtonWrapper>
    </Container>
  );
};
