import React, { useState, useReducer } from "react";
import "./FormV4.css";

const initialFormData = {
  firstName: "",
  lastName: "",
};

const ACTIONS = {
  ADD: "ADD",
  SAVE: "SAVE",
  DELETE: "DELETE",
};

const reducer = (forms, action) => {
  switch (action.type) {
    case ACTIONS.ADD:
      return [
        ...forms,
        {
          id: forms.length + 1,
          formData: action.payload.formData,
          complete: true,
          showForm: false,
        },
      ];
    case ACTIONS.SAVE:
      return forms.map((form) =>
        form.id === action.payload.id
          ? { ...form, formData: action.payload.formData }
          : form
      );
    case ACTIONS.DELETE:
      return forms.filter((form) => form.id !== action.payload.id);

    default:
      return forms;
  }
};

const Form = ({ form, saveForm, deleteForm }) => {
  const [formData, setFormData] = useState(form.formData);
  const [open, setOpen] = useState(false);

  const toggleForm = () => {
    setOpen(!open);
    console.log(`toggleForm - ${form.id}`, open);
  };

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(`handleFormData - ${form.id}`, formData);
  };

  const cancelForm = () => {
    setFormData(form.formData);
    toggleForm();
  };

  return (
    <div>
      {/* FORM HEADER */}
      <div className="fv4-header">
        <button disabled>Add</button>
        {!open && (
          <>
            <button onClick={toggleForm}>Edit</button>
            <button onClick={() => deleteForm(form.id)}>Delete</button>
          </>
        )}
      </div>

      {/* FORM SUMMARY */}
      {!open && (
        <>
          <div className="fv4-summary">
            <p>{formData.firstName}</p>
            <p>{formData.lastName}</p>
          </div>
        </>
      )}

      {/* FORM BODY*/}
      {open && (
        <div className="fv4-group">
          <div className="fv4-body">
            <form>
              <input
                value={formData.firstName}
                name="firstName"
                placeholder="firstName"
                onChange={handleFormData}
              />
              <input
                value={formData.lastName}
                name="lastName"
                placeholder="lastName"
                onChange={handleFormData}
              />
            </form>
          </div>

          {/* FORM FOOTER */}
          <div className="fv4-footer">
            <button onClick={cancelForm}>Cancel</button>
            <button
              onClick={() => {
                saveForm(form.id, formData);
                toggleForm();
              }}
            >
              Save
            </button>
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

  const handleFormData = (e) => {
    console.log("handleFormData", formData);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addForm = (e) => {
    e.preventDefault();
    dispatch({ type: ACTIONS.ADD, payload: { formData: formData } });
    setFormData(initialFormData);
    toggleForm();
  };

  const saveForm = (id, formData) => {
    dispatch({ type: ACTIONS.SAVE, payload: { id: id, formData: formData } });
  };

  const deleteForm = (id) => {
    dispatch({ type: ACTIONS.DELETE, payload: { id: id } });
  };

  const submitPage = (e) => {
    e.preventDefault();
    console.log("submitPage forms", forms);
  };

  console.log("useReducer - forms", forms);

  return (
    <div className="fv4-container">
      <div className="fv4-group">
        {/* FORM SUMMARY */}
        <div className="fv4-list">
          {forms.map((form) => {
            return (
              <Form
                key={form.id}
                form={form}
                saveForm={saveForm}
                deleteForm={deleteForm}
                handleFormData={handleFormData}
              />
            );
          })}
        </div>

        {/* FORM HEADER */}
        <div className="fv4-header">
          <button onClick={toggleForm}>Add</button>
        </div>

        {/* FORM BODY */}
        {open && (
          <>
            <div className="fv4-body">
              <form onSubmit={addForm}>
                <input
                  value={formData.firstName}
                  name="firstName"
                  placeholder="firstName"
                  onChange={handleFormData}
                />
                <input
                  value={formData.lastName}
                  name="lastName"
                  placeholder="lastName"
                  onChange={handleFormData}
                />
              </form>
            </div>

            {/* FORM FOOTER */}
            <div className="fv4-footer">
              <button onClick={cancelForm}>Cancel</button>
              <button
                onClick={(e) => {
                  addForm(e);
                  toggleForm();
                }}
              >
                Save
              </button>
            </div>
          </>
        )}
      </div>

      <button onClick={submitPage}>Submit Page</button>
    </div>
  );
};

export default FormV4;
