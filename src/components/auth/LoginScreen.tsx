import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useRequest from '../../hooks/useRequest';
import useToast, { ToastType } from '../../context/NotificationContext';
import useAuth from '../../hooks/useAuth';
import { generateErrorLabel } from '../../helpers/formValidator';
import { AuthBody, create, login } from '../../services/endpoints';
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
  const { data, loading, error } = useRequest(params);
  const { setToast } = useToast();

  const navigate = useNavigate();
  const token = useAuth();

  const onLogin = (formData: AuthBody) => {
    const requestObj = login(formData.username, formData.password);
    setParams(requestObj);
  };

  const onCreate = (formData: AuthBody) => {
    const requestObj = create(formData.username, formData.password);
    setParams(requestObj);
  };

  useEffect(() => {
    if (error) {
      setToast({ message: error, type: ToastType.ERROR });
    }
  }, [error]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (data) {
      if (data.message) {
        return setToast({ message: 'user created! please log in', type: ToastType.WARNING });
      }

      localStorage.setItem('auth_token', data.token);
      dispatchEvent(new Event('storage'));

      setToast({ message: 'redirecting to app...', type: ToastType.SUCCESS });
    }
  }, [data]);

  useEffect(() => {
    if (token) {
      setTimeout(() => navigate('/app'), 1500);
    }
  }, [token]);

  return (
    <Container>
      <FormContainer>
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
            type="submit"
            onClick={handleSubmit(onLogin)}
          >
            Existing User
          </RuneButton>
          <RuneButton
            disabled={Object.keys(errors).length > 0 || loading}
            type="submit"
            onClick={handleSubmit(onCreate)}
          >
            New User
          </RuneButton>
        </ButtonWrapper>
      </FormContainer>
    </Container>
  );
};
