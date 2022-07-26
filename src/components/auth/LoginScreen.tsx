import { useState } from 'react';
import { ButtonWrapper, Container, RuneButton } from './styles';
import { Login, Create } from './forms';

type FormType = 'login' | 'create';

export default () => {
  const [formType, setFormType] = useState<FormType | null>(null);

  const returnHandler = () => setFormType(null);

  return (
    <>
      {formType && formType === 'login' && <Login onCancel={returnHandler} />}
      {formType && formType === 'create' && <Create onCancel={returnHandler} />}
      {!formType && (
        <Container>
          <p>Select an Option</p>
          <ButtonWrapper>
            <RuneButton
              type="button"
              onClick={() => setFormType('create')}
            >
              New User
            </RuneButton>
            <RuneButton
              type="button"
              onClick={() => setFormType('login')}
            >
              Existing Account
            </RuneButton>
          </ButtonWrapper>
        </Container>
      )}
    </>
  );
};
