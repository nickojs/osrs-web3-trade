/* eslint-disable react/require-default-props */
import { useState } from 'react';
import { Item } from './interfaces';
import { Container, ItemWrapper, Tooltip } from './styles';

interface ItemWrapperProps {
  item: Item;
  indicator: 'remove' | 'add' | 'trade';
  isTrading?: boolean;
  onClick?: () => void;
}

export default ({
 item, indicator, isTrading = false, onClick
}: ItemWrapperProps) => {
  const { icon, name } = item;
  const [hover, setHover] = useState(false);
  const clickHandler = () => {
    if (onClick) onClick();
  };

  return (
    <Container>
      <ItemWrapper
        indicator={indicator}
        isTrading={isTrading}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={clickHandler}
      >
        {hover
          && indicator !== 'trade'
          && (
          <Tooltip isHovering={hover}>
            {name}
          </Tooltip>
        )}
        <img src={icon} alt={name} />
      </ItemWrapper>
    </Container>
  );
};
