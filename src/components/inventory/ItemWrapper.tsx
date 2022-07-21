/* eslint-disable react/require-default-props */
import { useState } from 'react';
import { Item } from './interfaces';
import { Container, ItemWrapper, Tooltip } from './styles';

interface ItemWrapperProps {
  item: Item;
  onClick?: () => void;
}

export default ({ item, onClick }: ItemWrapperProps) => {
  const { icon, name } = item;
  const [hover, setHover] = useState(false);
  const clickHandler = () => {
    if (onClick) onClick();
  };

  return (
    <Container>
      {hover && (
      <Tooltip isHovering={hover}>
        {name}
      </Tooltip>
    )}
      <ItemWrapper
        indicator="remove"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={clickHandler}
      >
        <img src={icon} alt={name} />
      </ItemWrapper>
    </Container>
  );
};
