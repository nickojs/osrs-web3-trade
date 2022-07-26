import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import useToast, { ToastType } from '../../../context/NotificationContext';
import useAuth from '../../../context/AuthContext';
import { generateErrorLabel } from '../../../helpers/formValidator';
import { AuthBody, login } from '../../../services/endpoints';
import {
  ButtonWrapper,
  ErrorMessage,
  InputWrapper,
  LoginFormContainer,
  RuneButton,
  RuneInput,
  RuneLabel
} from '../styles';
import { api } from '../../../services/api';
import handleError from '../../../helpers/handleError';

type SuccessResponse = {
  token: string;
}

export default ({ onCancel }: { onCancel: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AuthBody>();
  const { setToast } = useToast();
  const { setToken } = useAuth();

  const submitMutation = useMutation(({ data }: { data: AuthBody }) => {
    const { username, password } = data;
    const requestObj = login(username, password);
    return api(requestObj);
  }, {
    onError: (error) => {
      const typedError = error as AxiosError;
      const errorFeedback = handleError(typedError);
      return setToast({ message: errorFeedback, type: ToastType.ERROR });
    },
    onSuccess: (d) => {
      const { data }: { data: SuccessResponse} = d;
      if (data.token) {
        setToken(data.token);
        setToast({ message: 'redirecting to app...', type: ToastType.SUCCESS });
      }
    }
  });

  const onSubmit = (formData: AuthBody) => {
    submitMutation.mutate({ data: formData });
  };

  return (
    <LoginFormContainer>
      <div>
        <InputWrapper>
          <RuneLabel htmlFor="username">
            <span>
              username:
            </span>
          </RuneLabel>
          <RuneInput
            type="text"
            id="username"
            {...register('username', { required: true })}
          />
        </InputWrapper>
        {errors?.username?.type
            && <ErrorMessage>{generateErrorLabel(errors?.username?.type, 'username', 4, 20)}</ErrorMessage>}
        <InputWrapper>
          <RuneLabel htmlFor="password">
            <span>
              password:
            </span>
          </RuneLabel>
          <RuneInput
            type="password"
            id="password"
            {...register('password', { required: true })}
          />
        </InputWrapper>
        {errors?.password?.type
            && <ErrorMessage>{generateErrorLabel(errors?.password?.type, 'password', 6, 20)}</ErrorMessage>}
      </div>
      <ButtonWrapper>
        <RuneButton
          disabled={Object.keys(errors).length > 0 || submitMutation.isLoading}
          type="submit"
          onClick={handleSubmit((data) => onSubmit(data))}
        >
          Log in
        </RuneButton>
        <RuneButton
          disabled={submitMutation.isLoading}
          type="submit"
          onClick={onCancel}
        >
          Return
        </RuneButton>
      </ButtonWrapper>
    </LoginFormContainer>
  );
};
