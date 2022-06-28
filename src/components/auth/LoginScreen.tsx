import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { generateErrorLabel } from '../../helpers/formValidator';
import useRequest from '../../hooks/useRequest';
import { AuthBody } from '../../services/endpoints';
import {
  ButtonWrapper,
  Container,
  ErrorMessage,
  FormContainer,
  InputWrapper,
  LoginFormContainer,
  RuneButton,
  RuneInput,
  RuneLabel
} from './styles';

export default () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AuthBody>();

  const [params, setParams] = useState({});
  const onSubmit = (data: AuthBody) => setParams(data);

  const { data, loading, error } = useRequest(params);

  useEffect(() => {
    if (data) console.log(data);
    if (error) console.log(error);
  }, [data, error]);

  return (
    <Container>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <LoginFormContainer>
          <InputWrapper>
            <RuneLabel htmlFor="username">
              <span>
                username:
              </span>
            </RuneLabel>
            <RuneInput
              type="text"
              id="username"
              {...register('username', { required: true, maxLength: 12, minLength: 4 })}
            />
          </InputWrapper>
          {errors?.username?.type
            && <ErrorMessage>{generateErrorLabel(errors?.username?.type, 'username', 4, 12)}</ErrorMessage>}
          <InputWrapper>
            <RuneLabel htmlFor="password">
              <span>
                password:
              </span>
            </RuneLabel>
            <RuneInput
              type="password"
              id="password"
              {...register('password', { required: true, maxLength: 20, minLength: 6 })}
            />
          </InputWrapper>
          {errors?.password?.type
            && <ErrorMessage>{generateErrorLabel(errors?.password?.type, 'password', 6, 20)}</ErrorMessage>}
        </LoginFormContainer>
        <ButtonWrapper>
          <RuneButton
            disabled={Object.keys(errors).length > 0 || loading}
          >
            New User
          </RuneButton>
          <RuneButton
            disabled={Object.keys(errors).length > 0 || loading}
          >
            Existing User
          </RuneButton>
        </ButtonWrapper>
      </FormContainer>
    </Container>
  );
};
