import { useState } from 'react';
import { Item } from './interfaces';
import { Container, ItemWrapper, Tooltip } from './styles';

// eslint-disable-next-line react/require-default-props
export default ({ item, onClick }: { item: Item, onClick?: () => void; }) => {
  const { icon, name } = item;
  const [hover, setHover] = useState(false);
  const clickHandler = () => {
    if (onClick) onClick();
  };

  return (
    <Container>
      {hover && (
      <Tooltip>
        {name}
      </Tooltip>
    )}
      <ItemWrapper
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={clickHandler}
      >
        <img src={icon} alt={name} />
      </ItemWrapper>
    </Container>
  );
};
