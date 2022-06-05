import { renderHook, act } from "@testing-library/react-hooks";
import { useForm } from "../../hooks";

describe("useForm", () => {
  const initialFormValues = {
    name: "",
    image: "",
    attack: 0,
    defense: 0,
  };

  test("should return initial values", () => {
    const { result } = renderHook(() => useForm(initialFormValues));
    const [values] = result.current;
    expect(values).toEqual(initialFormValues);
  });

  test("should update values on change", () => {
    const dummieName: string = "pokemonName";
    const { result } = renderHook(() => useForm(initialFormValues));
    const [, handleInputChange] = result.current;

    act(() => {
      handleInputChange({
        target: {
          name: "name",
          value: dummieName,
        },
      });
    });

    const [values] = result.current;

    expect(values.name).toBe(dummieName);
  });
});
