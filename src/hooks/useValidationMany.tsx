import * as yup from "yup";
import { useState } from "react";

export type ValidateFunction = (value: unknown) => Promise<unknown>;

export const useValidationMany = () => {
  const [error, setError] = useState<(string | null)[]>([]);

  const validate = <
    T extends { [key: string]: T },
    N extends keyof T,
    S extends { validate: ValidateFunction }
  >(
    validateArr: T[],
    property: N,
    schema: S
  ): void => {
    (async () => {
      const results = await Promise.all(
        validateArr.map(async (option: T) => {
          try {
            await schema.validate({ email: option[property] });
            return null;
          } catch (err) {
            const error = err as yup.ValidationError;
            return error.message;
          }
        })
      );
      const result = results.filter((result) => result !== null);

      setError(result);
    })();
  };

  return { error, validate };
};
