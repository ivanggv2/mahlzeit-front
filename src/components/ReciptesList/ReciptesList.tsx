import { useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import useReciptes from "../../hooks/useReciptes";
import RecipteCard from "../RecipteCard/RecipteCard";
import RecipteListStyled from "./ReciptesListStyled";

const ReciptesList = () => {
  const apiUrl = `${process.env.REACT_APP_API_URL}/reciptes/getAll`;
  const { getReciptes } = useReciptes();

  useEffect(() => {
    (async () => {
      await getReciptes(apiUrl);
    })();
  }, [getReciptes, apiUrl]);

  const items = useAppSelector((state: RootState) => state.reciptes);

  return (
    <RecipteListStyled>
      {items.map((item) => (
        <li data-testid="test-list" key={item.name}>
          <RecipteCard item={item} />
        </li>
      ))}
    </RecipteListStyled>
  );
};

export default ReciptesList;
