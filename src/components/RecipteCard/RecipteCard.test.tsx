import { fireEvent, render, screen } from "@testing-library/react";
import { Recipte } from "../../types/interfaces";
import RecipteCard from "./RecipteCard";

describe("Given a component ItemCard", () => {
  describe("When rendered and receives by props an item with the name 'Patatas bravas'", () => {
    const name = "Patatas bravas";
    const item: Recipte = {
      name: name,
      dificulty: "Fácil",
      autor: "",
      id: "",
      image: "",
      ingredients: "",
      persons: 0,
      process: "",
      backupImage: "",
    };
    test("Then it should show a card with a heading with the received name", () => {
      render(<RecipteCard item={item} />);

      screen.getByRole("heading", { name: item.name });
    });

    test("And if the image src returns an error it should use the backupImage as src", () => {
      render(<RecipteCard item={item} />);

      const image = screen.getByRole("img");
      fireEvent.error(image);

      expect(image.getAttribute("src")).toBe(item.backupImage);
    });
  });
});