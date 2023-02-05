import { Form, FormProps, useTransition } from "@remix-run/react";
import { useState } from "react";

interface PersonFormProps {
  initialNames?: string[];
  formProps: FormProps;
}

export default function PersonForm(props: PersonFormProps) {
  const { initialNames, formProps } = props;
  const { state } = useTransition();
  const [names, setNames] = useState<(string | undefined)[]>(
    initialNames ?? [""]
  );

  if (state === "loading") {
    return (
      <div className="progress">
        <div className="indeterminate"></div>
      </div>
    );
  }
  return (
    <Form {...formProps}>
      {names.filter((n) => n !== undefined).length > 0 ? (
        names.map(
          (name, index) =>
            name !== undefined && (
              <div
                key={index}
                className="card-panel"
                style={{ display: "flex", alignItems: "baseline", gap: "5mm" }}
              >
                <input
                  placeholder="Volunteer name"
                  type="text"
                  name={`name-${index}`}
                  id={`name-${index}`}
                  defaultValue={name}
                  required
                />
                <a
                  className="waves-effect waves-light btn"
                  onClick={() => {
                    const newNames = [...names];
                    // We don't want to screw up the field names, so we mark deleted fields
                    // with undefined
                    newNames[index] = undefined;
                    setNames(newNames);
                  }}
                >
                  <i className="material-icons">delete</i>
                </a>
              </div>
            )
        )
      ) : (
        <div className="card-panel">
          <p className="flow-text">
            Wait, there is noone to perform the review?
          </p>
          <p className="flow-text">
            So who is clicking buttons on this computer?
          </p>
        </div>
      )}
      <div style={{ display: "flex", gap: "5mm" }}>
        <a
          className="waves-effect waves-light btn"
          onClick={() => setNames([...names, ""])}
        >
          Add another person
        </a>
        <button
          className={`btn waves-effect waves-light ${
            names.filter((n) => n !== undefined).length === 0 ? "disabled" : ""
          }`}
          type="submit"
          name="action"
        >
          Submit
          <i className="material-icons right">send</i>
        </button>
      </div>
    </Form>
  );
}
