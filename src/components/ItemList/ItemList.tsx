import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import ItemCard from "../ItemCard/ItemCard";
import ItemListStyled from "./ItemListStyled";

const ItemList = () => {
  const items = useAppSelector((state: RootState) => state.itemReducer);

  return (
    <ItemListStyled>
      {items.map((item) => (
        <li>
          <ItemCard item={item} />
        </li>
      ))}
    </ItemListStyled>
  );
};

export default ItemList;
