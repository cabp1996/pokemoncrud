import { Provider } from "react-redux";
import { store } from "./store/store";
import { PokemonsView } from "./views";

import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      <PokemonsView />
    </Provider>
  );
};

export default App;
