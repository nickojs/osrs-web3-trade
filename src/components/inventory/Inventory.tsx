import { Inventory, InventoryContent, ItemWrapper } from './styles';

export default () => {
  const mockItem = 'data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAACQAAAAgCAYAAAB6kdqOAAABvUlEQVR4Xu2XPW7DMAyF7UtkyRIgQ4AAAYwAQaZOnbJ16NKhQ4fe/whqaeJVj5RkO7biLH0Ah0i0+Zk/stM0/6qmNgzbKooBd9utsffTMdwOh/C634eX3S4DWB0yhWD76E7h63IOn+euh3s7WsDrr09FqLYP4CHEfBYABjj5LYDw7frsLZYCeSgEYGM4gH1fL+4BFqk1JeCsRAj1Y/Nw/iFsjLukQOgHBuGg+VI2DXxyezOkPSFAHqYEAkubuAqUAkl2MMq5J84ZX+Phpfxxb7Lafkr44qkwYtLMcq1kNmar/QO195wkzQ7fcAyIs4Gx5z2GmQXEN+PeKUH4Zmc/DAWf5NF3klIgrEuTc39YOPXhdYZJh2OycpnQdZQDpfTZ4usAlDs2bLxRpUCcJZzCPnjJBGgBDJRC8d49QBVgRAqEs2jssPOGElaCgTQTgLKl0/2SAaIiDBQbWQ47myV9X5WM/SorQmFavMcTFKer22xciaxfuvYw5Uee4fID8FANj7wMwMw3+hINjzy+p1fuNzvmHoo/fVfrKzviGlSyU/o7tAoUC2D49PVZXOF8ykmBGGClw3JIT8tGWTVgfgDysYBPjVasdQAAAABJRU5ErkJggg==';

  return (
    <Inventory>
      <InventoryContent>
        {Array.from(Array(27).keys()).map((i) => (
          <ItemWrapper key={i}>
            <img src={mockItem} />
          </ItemWrapper>
        ) ) }
      </InventoryContent>
    </Inventory>
  );
};

