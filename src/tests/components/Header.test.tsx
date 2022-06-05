import configureStore from "redux-mock-store";
import { initialState } from "../mocks/initial-state.mock";
import { Provider } from "react-redux";
import { Header } from "../../components";
import { fireEvent, render, RenderResult } from "@testing-library/react";
import thunk from "redux-thunk";

jest.mock("../../actions", () => ({
  showPokemonForm: jest.fn(),
  searchPokemon: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
let store = mockStore(initialState);

store.dispatch = jest.fn();

describe("Header tests", () => {
  let wrapper: RenderResult;

  beforeEach(() => {
    wrapper = render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should new button call dispatch action to show pokemon form", async () => {
    const spy = jest.spyOn(store, "dispatch");
    const button = await wrapper.getByRole("button");
    button.click();
    expect(spy).toHaveBeenCalled();
  });

  it("should onChange search filter input dispatch filter text", async () => {
    const spy = jest.spyOn(store, "dispatch");
    const searchInput = wrapper.container.querySelector(
      ".form-input"
    ) as HTMLInputElement;

    fireEvent.change(searchInput, { target: { value: "pokemon" } });

    expect(spy).toHaveBeenCalled();
  });
});
