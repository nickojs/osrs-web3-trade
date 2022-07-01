import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import useToast, { ToastType } from '../../context/NotificationContext';
import useAuth from '../../context/AuthContext';
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
import { api } from '../../services/api';
import handleError from '../../helpers/handleError';

type FormType = 'login' | 'create'

interface MutationRequest {
  data: AuthBody;
  type: FormType
}

type SuccessResponse = {
  message?: string;
  token?: string;
}

export default () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AuthBody>();
  const { setToast } = useToast();
  const { setToken } = useAuth();

  const submitMutation = useMutation(({ data, type }: MutationRequest) => {
    const { username, password } = data;
    let requestObj = {};

    if (type === 'login') {
      requestObj = login(username, password);
    }

    if (type === 'create') {
      requestObj = create(username, password);
    }

    return api(requestObj);
  }, {
    onError: (error) => {
      const typedError = error as AxiosError;
      const errorFeedback = handleError(typedError);
      return setToast({ message: errorFeedback, type: ToastType.ERROR });
    },
    onSuccess: (d) => {
      const { data }: { data: SuccessResponse} = d;
      if (data.message) {
        setToast({ message: 'user created! please log in', type: ToastType.WARNING });
      }
      if (data.token) {
        setToken(data.token);
        setToast({ message: 'redirecting to app...', type: ToastType.SUCCESS });
      }
    }
  });

  const onSubmit = (formData: AuthBody, type: FormType) => {
    submitMutation.mutate({ data: formData, type });
  };

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
            disabled={Object.keys(errors).length > 0 || submitMutation.isLoading}
            type="submit"
            onClick={handleSubmit((data) => onSubmit(data, 'login'))}
          >
            Existing User
          </RuneButton>
          <RuneButton
            disabled={Object.keys(errors).length > 0 || submitMutation.isLoading}
            type="submit"
            onClick={handleSubmit((data) => onSubmit(data, 'create'))}
          >
            New User
          </RuneButton>
        </ButtonWrapper>
      </FormContainer>
    </Container>
  );
};
