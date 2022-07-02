import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';
import useToast, { ToastType } from '../../../context/NotificationContext';
import { generateErrorLabel } from '../../../helpers/formValidator';
import { AuthBody, create } from '../../../services/endpoints';
import {
  ButtonWrapper,
  ErrorMessage,
  FormContainer,
  InputWrapper,
  LoginFormContainer,
  RuneButton,
  RuneInput,
  RuneLabel
} from '../styles';
import { api } from '../../../services/api';
import handleError from '../../../helpers/handleError';
import ProfilePicSelector, { PicType } from '../../profilePicSelector/ProfilePicSelector';

interface AuthBodyWithPic extends AuthBody {
  picId: number;
}

interface MutationRequest {
  data: AuthBodyWithPic;
}

type SuccessResponse = {
  message: string;
}

export default ({ onCancel }: { onCancel: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AuthBody>();
  const { setToast } = useToast();
  const [pic, setPic] = useState<PicType>({} as PicType);

  const setPicHandler = (data: PicType) => setPic(data);

  const submitMutation = useMutation(({ data }: MutationRequest) => {
    const { username, password, picId } = data;
    const requestObj = create(username, password, picId);
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
    }
  });

  const onSubmit = (formData: AuthBody) => {
    submitMutation.mutate({ data: { ...formData, picId: pic.id } });
  };

  return (
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
            {...register('username', { required: true, maxLength: 20, minLength: 4 })}
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
            type="text"
            id="password"
            {...register('password', { required: true, maxLength: 20, minLength: 4 })}
          />
        </InputWrapper>
        {errors?.password?.type
            && <ErrorMessage>{generateErrorLabel(errors?.password?.type, 'password', 4, 20)}</ErrorMessage>}

        <ProfilePicSelector onSelect={setPicHandler} selectedPic={pic} />

      </LoginFormContainer>
      <ButtonWrapper>
        <RuneButton
          type="submit"
          onClick={handleSubmit((data) => onSubmit(data))}
        >
          Confirm
        </RuneButton>
        <RuneButton
          type="button"
          onClick={onCancel}
        >
          Return
        </RuneButton>
      </ButtonWrapper>
    </FormContainer>
  );
};
