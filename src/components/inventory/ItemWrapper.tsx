import { useState } from 'react';
import { Item } from './interfaces';
import { ItemWrapper } from './styles';

export default ({ item }: { item: Item }) => {
  const { description, icon } = item;
  const [click, setClick] = useState(false);
  const clickHandler = () => setClick(!click);

  return (
    <ItemWrapper
      examine={description}
      displayInformative={click}
      onClick={clickHandler}
    >
      <img src={icon} alt="Item's icon" />
    </ItemWrapper>
  );
};
