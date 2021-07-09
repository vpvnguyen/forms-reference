import { useState, useReducer, useEffect } from "react";

const INIT = "INIT";
const SHOW = "SHOW";
const HIDE = "HIDE";
const SAVE = "SAVE";
const COMPLETED = "COMPLETED";

// reducer to manage state of current form
// need new state to set saved forms to
// new state to pass all forms to
const formReducer = (formState, action) => {
  switch (action.type) {
    case INIT:
      return { ...formState, showForm: false, completed: false };
    case SHOW:
      return {
        ...formState,
        showForm: true,
      };
    case HIDE:
      return {
        ...formState,
        showForm: false,
      };
    case SAVE:
      return {
        ...formState,
        showForm: false,
        completed: true,
        data: action.payload,
      };
    case COMPLETED:
      return { ...formState };
    default:
      throw new Error(
        "formReducer error: formState, action",
        formState,
        action
      );
  }
};

const useFormReducer = () => {
  const [formState, dispatchForm] = useReducer(formReducer, {
    data: [],
    showForm: false,
    completed: false,
  });

  return [formState, dispatchForm];
};

const Form1 = () => {
  const [formData, setFormData] = useState({ firstName: "", lastName: "" });
  const [formState, dispatchForm] = useFormReducer();

  const cancel = () => {
    dispatchForm({ type: HIDE });
  };

  const save = (e) => {
    e.preventDefault();
    dispatchForm({ type: SAVE, payload: formData });
    console.log("formState.data", formState.data);
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    console.log("formData", formData);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form action="">
      <h1>Form1</h1>
      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleOnChange}
      />
      <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleOnChange}
      />
      <button onClick={cancel}>Cancel</button>
      <button onClick={save}>Save</button>
    </form>
  );
};

const FormComponent = ({ form }) => {
  const [formState, dispatchForm] = useFormReducer();
  console.log(formState);

  const addForm = () => {
    dispatchForm({ type: SHOW });
  };

  useEffect(() => {
    dispatchForm({ type: COMPLETED });
  }, []);

  return (
    <div>
      <div>
        {formState.COMPLETED &&
          formState.data &&
          formState.data.map((value, index) => (
            <div key={`${value.firstName}-${index}`}>
              <div>{value.firstName}</div>
              <div>{value.lastName}</div>
            </div>
          ))}
      </div>
      <div>
        <button onClick={addForm}>Add</button>
        {formState.showForm && <div>{form}</div>}
      </div>
    </div>
  );
};

export const FormV2 = () => {
  return (
    <div>
      <div
        style={{
          margin: "40px",
          backgroundColor: "lightgrey",
          width: "500px",
        }}
      >
        <FormComponent form={<Form1 />} />
      </div>
    </div>
  );
};
