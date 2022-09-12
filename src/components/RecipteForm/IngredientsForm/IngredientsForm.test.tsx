import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProtoRecipte } from "../../../types/interfaces";
import IngredientsForm from "./IngredientsForm";

describe("Given a component IngredientsForm", () => {
  const recipte: ProtoRecipte = {
    autor: "Mock autor",
    dificulty: "Mock dificulty",
    image: " Mock image",
    ingredients: "Mock ingredients",
    name: " Mock name",
    persons: 4,
    process: "Mock process",
  };

  const props = {
    recipte: recipte,
    nextPage: jest.fn(),
    previousPage: jest.fn(),
    handleChange: jest.fn(),
  };
  describe("When rendered", () => {
    test("Then it should show a form with 3 inputs, a spinbutton and a button", () => {
      render(
        <IngredientsForm
          handleChange={props.handleChange}
          nextPage={props.nextPage}
          previousPage={props.previousPage}
          recipte={recipte}
        />
      );

      const inputs = screen.getAllByRole("textbox");
      const spin = screen.getByRole("spinbutton", { name: "Personas:" });
      const button = screen.getByRole("button", { name: "Siguiente" });

      expect(inputs.length).toBe(3);
      expect(spin).toBeInTheDocument();
      expect(button).toBeInTheDocument();
    });

    test("Then it should update the input value with the typed data from user.", async () => {
      render(
        <IngredientsForm
          handleChange={props.handleChange}
          nextPage={props.nextPage}
          previousPage={props.previousPage}
          recipte={recipte}
        />
      );

      const nameInput: HTMLInputElement = screen.getByRole("textbox", {
        name: "Nombre:",
      });
      const dificultyInput: HTMLInputElement = screen.getByRole("textbox", {
        name: "Dificultad:",
      });
      const personsInput: HTMLInputElement = screen.getByRole("spinbutton", {
        name: "Personas:",
      });
      const ingredientsInput: HTMLInputElement = screen.getByRole("textbox", {
        name: "Ingredientes:",
      });

      await userEvent.type(nameInput, recipte.name);
      await userEvent.type(dificultyInput, recipte.dificulty);
      await userEvent.type(personsInput, recipte.persons.toString());
      await userEvent.type(ingredientsInput, recipte.ingredients);

      expect(nameInput.value).toBe(recipte.name);
      expect(dificultyInput.value).toBe(recipte.dificulty);
      expect(personsInput.value).toBe(recipte.persons.toString());
      expect(ingredientsInput.value).toBe(recipte.ingredients);
    });
  });

  describe("And the user click on 'Siguiente'", () => {
    test("Then it should call the function nextPage", async () => {
      render(
        <IngredientsForm
          handleChange={props.handleChange}
          nextPage={props.nextPage}
          previousPage={props.previousPage}
          recipte={recipte}
        />
      );

      const button = screen.getByRole("button", { name: "Siguiente" });

      await userEvent.click(button);

      expect(props.nextPage).toHaveBeenCalled();
    });
  });
});