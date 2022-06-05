import { render, RenderResult } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { PokemonTable } from "../../components";
import { initialState, pokemonsMockData } from "../mocks/initial-state.mock";
import thunk from "redux-thunk";

jest.mock("../../actions", () => ({
  selectPokemonAction: jest.fn(),
  requestDeletePokemonAction: jest.fn(),
  requestGetPokemonsListAction: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
let store = mockStore(initialState);

store.dispatch = jest.fn();

describe("PokemonTable ", () => {
  let wrapper: RenderResult;

  window.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(pokemonsMockData),
    })
  ) as jest.Mock;
  beforeEach(() => {
    wrapper = render(
      <Provider store={store}>
        <PokemonTable />
      </Provider>
    );
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should delete button of one row dispatch action to delete pokemon", async () => {
    const tableButtons = wrapper.queryAllByRole("button");
    const deleteButton = tableButtons[1];
    deleteButton.click();
    expect(store.dispatch).toHaveBeenCalled();
  });

  it("should update button of one row dispatch action to show form to update pokemon", async () => {
    const tableButtons = wrapper.queryAllByRole("button");
    const updateButton = tableButtons[0];
    updateButton.click();
    expect(store.dispatch).toHaveBeenCalled();
  });
});
