import { render, RenderResult } from "@testing-library/react";

import { Provider } from "react-redux";
import App from "../App";
import configureStore from "redux-mock-store";
import { initialState } from "./mocks/initial-state.mock";

const middlewares = [];
const mockStore = configureStore(middlewares);
let store = mockStore(initialState);
store.dispatch = jest.fn();

describe("App tests", () => {
  let wrapper: RenderResult;

  beforeEach(() => {
    wrapper = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  test("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
