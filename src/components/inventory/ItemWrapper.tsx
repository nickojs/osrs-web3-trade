import { useState } from 'react';
import { Item } from './interfaces';
import { ItemWrapper } from './styles';

export default ({ item }: { item: Item }) => {
  const { examine, image } = item;
  const [click, setClick] = useState(false);
  const clickHandler = () => setClick(!click);

  return (
    <ItemWrapper
      examine={examine}
      displayInformative={click}
      onClick={clickHandler}
    >
      <img src={`data:image/png;base64, ${image}`} alt="Item's icon" />
    </ItemWrapper>
  );
};
