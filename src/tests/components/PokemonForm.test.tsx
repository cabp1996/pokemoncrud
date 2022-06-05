import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { render, RenderResult, waitFor } from "@testing-library/react";
import configureStore from "redux-mock-store";
import {
  initialState,
  initialStateToUpdate,
} from "../mocks/initial-state.mock";
import { PokemonForm } from "../../components/PokemonForm";

jest.mock("../../actions", () => ({
  requestCreatePokemonAction: jest.fn(),
  requestUpdatePokemonAction: jest.fn(),
  hidePokemonForm: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
let storeToUpdate = mockStore(initialStateToUpdate);
let storeToCreate = mockStore(initialState);
storeToUpdate.dispatch = jest.fn();
storeToCreate.dispatch = jest.fn();

describe("PokemonForm tests", () => {
  let wrapperToCreate: RenderResult;
  let wrapperToUpdate: RenderResult;

  beforeEach(() => {
    wrapperToCreate = render(
      <Provider store={storeToCreate}>
        <PokemonForm />
      </Provider>
    );

    wrapperToUpdate = render(
      <Provider store={storeToUpdate}>
        <PokemonForm />
      </Provider>
    );
  });

  it("should match snapshot when theres no pokemon to update", () => {
    expect(wrapperToCreate).toMatchSnapshot();
  });

  it("should match snapshot when theres pokemon to update", () => {
    expect(wrapperToUpdate).toMatchSnapshot();
  });

  it("should cancel button call dispatch to hide form", () => {
    const buttons = wrapperToCreate.getAllByRole("button");
    const cancelButton = buttons[1];
    cancelButton.click();
    expect(storeToCreate.dispatch).toHaveBeenCalled();
  });

  it("should submit form call dispatch to update pokemon", () => {
    const form = wrapperToUpdate.container.querySelector(
      "form"
    ) as HTMLFormElement;
    form.submit();

    expect(storeToUpdate.dispatch).toHaveBeenCalled();
  });
});
