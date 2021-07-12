import React, { useState, useReducer } from "react";
import "./FormV4.css";

const initialFormData = {
  firstName: "",
  lastName: "",
};

const ACTIONS = {
  ADD: "ADD",
  SAVE: "SAVE",
  //   CANCEL: "CANCEL",
  EDIT: "EDIT",
  DELETE: "DELETE",
};

const reducer = (forms, action) => {
  switch (action.type) {
    case ACTIONS.SAVE:
      return [
        ...forms,
        {
          id: Date.now(),
          formData: action.payload.formData,
          complete: false,
          showForm: false,
        },
      ];

    case ACTIONS.EDIT:
      return forms.map((form) => {
        if (form.id === action.payload.id) {
          return { ...form, showForm: !form.showForm };
        }
        return form;
      });
    case ACTIONS.DELETE:
      return forms.filter((form) => form.id !== action.payload.id);

    default:
      return forms;
  }
};

const Form = ({ form, editForm, deleteForm }) => {
  const [formData, setFormData] = useState(form.formData);
  const [open, setOpen] = useState(false);

  const toggleForm = () => {
    setOpen(!open);
    console.log(`toggleForm: ${form.id}`, open);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="fv3-header">
        <button disabled>Add</button>
        {/* FORM SUMMARY */}
        {!open && (
          <>
            <button onClick={toggleForm}>Edit</button>
            <button onClick={() => deleteForm(form.id)}>Delete</button>
          </>
        )}
      </div>

      {!open && (
        <>
          <div className="fv3-summary">
            <p>{form.formData.firstName}</p>
            <p>{form.formData.lastName}</p>
          </div>
        </>
      )}

      {/* FORM */}
      {open && (
        <div className="fv3-group">
          <div className="fv3-body">
            <form>
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
          </div>

          <div className="fv3-footer">
            <button onClick={toggleForm}>Cancel</button>
            <button>Save</button>
          </div>
        </div>
      )}
    </div>
  );
};

const FormV4 = () => {
  const [forms, dispatch] = useReducer(reducer, []);
  const [formData, setFormData] = useState(initialFormData);

  const [open, setOpen] = useState(false);

  const toggleForm = () => {
    setOpen(!open);
    console.log("toggleForm", open);
  };

  const cancelForm = () => {
    setFormData(initialFormData);
    toggleForm();
  };

  const handleFormChange = (e) => {
    console.log("handleFormChange", formData);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const saveForm = (e) => {
    e.preventDefault();
    dispatch({ type: ACTIONS.SAVE, payload: { formData: formData } });
    setFormData(initialFormData);
    toggleForm();
  };

  const editForm = (id) => {
    dispatch({ type: ACTIONS.EDIT, payload: { id: id } });
  };

  const deleteForm = (id) => {
    dispatch({ type: ACTIONS.DELETE, payload: { id: id } });
  };

  console.log("forms", forms);

  return (
    <div className="fv3-container">
      <div className="fv3-group">
        <div className="fv3-list">
          {forms.map((form) => {
            return (
              <Form
                key={form.id}
                form={form}
                editForm={editForm}
                deleteForm={deleteForm}
                handleFormChange={handleFormChange}
              />
            );
          })}
        </div>

        <div className="fv3-header">
          <button onClick={toggleForm}>Add</button>
        </div>

        {open && (
          <>
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
            </div>

            <div className="fv3-footer">
              <button onClick={cancelForm}>Cancel</button>
              <button
                onClick={(e) => {
                  saveForm(e);
                  toggleForm();
                }}
              >
                Save
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FormV4;
