import { LoaderContainer, LoaderInner } from './styles';

export default (): JSX.Element => {
  return (
    <LoaderContainer>
      <LoaderInner>
        <p>Loading...</p>
      </LoaderInner>
    </LoaderContainer>
  );
};

