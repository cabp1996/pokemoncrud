import { render, RenderResult } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { PokemonsView } from "../../views";
import { initialState, pokemonsMockData } from "../mocks/initial-state.mock";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

let store = mockStore(initialState);
store.dispatch = jest.fn();

describe("PokemonsView Tests", () => {
  let wrapper: RenderResult;

  beforeEach(async () => {
    window.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(pokemonsMockData),
      })
    ) as jest.Mock;
  });

  beforeEach(() => {
    wrapper = render(
      <Provider store={store}>
        <PokemonsView />
      </Provider>
    );
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
