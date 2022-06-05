import { useState } from "react";

export const useForm = (initialState: any) => {
  const [values, setValues] = useState(initialState);

  const handleInputChange = ({ target }: { target: any }) => {
    setValues({
      ...values,
      [target.name]: target.value,
    });
  };

  return [values, handleInputChange, setValues];
};
