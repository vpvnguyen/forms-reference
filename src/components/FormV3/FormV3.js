import React, { useState, useReducer } from "react";
import "./FormV3.css";

const initialFormData = {
  firstName: "",
  lastName: "",
};

const ACTIONS = {
  //   ADD: "ADD",
  SAVE: "SAVE",
  //   CANCEL: "CANCEL",
  EDIT: "EDIT",
  DELETE: "DELETE",
};

const newForm = (formData) => {
  return { id: Date.now(), formData: formData, complete: false };
};

const reducer = (forms, action) => {
  switch (action.type) {
    // case ACTIONS.ADD:
    //   return { showForm: true };
    case ACTIONS.SAVE:
      return [...forms, newForm(action.payload.formData)];

    case ACTIONS.EDIT:
      return forms.map((form) => {
        if (form.id === action.payload.id) {
          return { ...form, complete: !form.complete };
        }
        return form;
      });
    case ACTIONS.DELETE:
      return forms.filter((form) => form.id !== action.payload.id);

    default:
      return forms;
  }
};

const useFormReducer = () => {
  const [forms, dispatch] = useReducer(reducer, []);
  const [formData, setFormData] = useState("");

  const saveForm = (e) => {
    e.preventDefault();
    dispatch({ type: ACTIONS.SAVE, payload: { formData: formData } });
    setFormData("");
  };
};

const Form = ({ form, dispatch }) => {
  const editForm = () => {
    dispatch({ type: ACTIONS.EDIT, payload: { id: form.id } });
  };

  const deleteForm = () => {
    dispatch({ type: ACTIONS.DELETE, payload: { id: form.id } });
  };

  return (
    <div>
      <div className="fv3-summary">
        <p>{form.formData.firstName}</p>
        <p>{form.formData.lastName}</p>
      </div>

      <div>
        <button onClick={editForm}>Edit</button>
        <button onClick={deleteForm}>Delete</button>
      </div>
    </div>
  );
};

const FormV3 = () => {
  const [forms, dispatch] = useReducer(reducer, []);
  const [formData, setFormData] = useState(initialFormData);

  const handleFormChange = (e) => {
    console.log(formData);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const saveForm = (e) => {
    e.preventDefault();
    dispatch({ type: ACTIONS.SAVE, payload: { formData: formData } });
    setFormData(initialFormData);
  };

  console.log("forms", forms);

  return (
    <div>
      <div className="fv3-container">
        <div className="fv3-list">
          {forms.map((form) => {
            return <Form key={form.id} form={form} dispatch={dispatch} />;
          })}
        </div>

        <div className="fv3-header">
          <button>Add</button>
        </div>

        <div className="fv3-body">
          <form onSubmit={saveForm}>
            <input
              value={formData.firstName}
              name="firstName"
              placeholder="firstName"
              onChange={handleFormChange}
            />
            <input
              value={formData.lastName}
              name="lastName"
              placeholder="lastName"
              onChange={handleFormChange}
            />
          </form>

          <div className="fv3-footer">
            <button>Cancel</button>
            <button onClick={saveForm}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormV3;
