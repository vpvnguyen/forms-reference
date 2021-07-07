import "./FormV1.css";
import { useState, useReducer } from "react";

const initialState = {
  name: "",
  phone: "",
  jobTitle: "",
  jobType: "",
  jobStartDate: "",
  baseYearlyIncome: "",
  bonus: [
    {
      year: "",
      amount: "",
    },
  ],
  commission: [
    {
      year: "",
      amount: "",
    },
  ],
  overtime: [
    {
      year: "",
      amount: "",
    },
  ],
  isFamilyInvolve: false,
};

export const FormV1 = () => {
  return (
    <div className="fv1-container">
      <div className="fv1-form">
        <div className="fv1-form-header">
          <h1>Header</h1> {/* add button */}
        </div>

        <div className="fv1-form-fieldset">
          <div className="fv1-form-field-group">
            <label htmlFor="name">name</label>
            <input
              className="fv1-form-field"
              type="text"
              name="name"
              id="name"
            />
          </div>
          <div className="fv1-form-field-group">
            <label htmlFor="phone">phone</label>
            <input
              className="fv1-form-field"
              type="text"
              name="phone"
              id="phone"
            />
          </div>
        </div>

        <div className="fv1-form-fieldset">
          <div className="fv1-form-field-group">
            <label htmlFor="jobTitle">jobTitle</label>
            <input
              className="fv1-form-field"
              type="text"
              name="jobTitle"
              id="jobTitle"
            />
          </div>

          <div className="fv1-form-field-group">
            <label htmlFor="jobType">jobType</label>
            <input
              className="fv1-form-field"
              type="text"
              name="jobType"
              id="jobType"
            />
          </div>
        </div>

        <div className="fv1-form-fieldset">
          <div className="fv1-form-field-group">
            <label htmlFor="jobStartDate">jobStartDate</label>
            <input
              className="fv1-form-field"
              type="text"
              name="jobStartDateMonth"
              id="jobStartDateMonth"
            />
            <input
              className="fv1-form-field"
              type="text"
              name="jobStartDateYear"
              id="jobStartDateYear"
            />
          </div>
        </div>

        <div className="fv1-form-fieldset">
          <div className="fv1-form-field-group">
            <label htmlFor="baseYearlyIncome">baseYearlyIncome</label>
            <input
              className="fv1-form-field"
              type="text"
              name="baseYearlyIncome"
              id="baseYearlyIncome"
            />
          </div>
        </div>

        <div className="fv1-form-fieldset">
          <div className="fv1-form-field-group">
            <label htmlFor="bonus">bonus</label>
            <input
              className="fv1-form-field"
              type="text"
              name="bonus"
              id="bonus"
            />
          </div>
        </div>

        <div className="fv1-form-fieldset">
          <div className="fv1-form-field-group">
            <label htmlFor="commission">commission</label>
            <input
              className="fv1-form-field"
              type="text"
              name="commission"
              id="commission"
            />
          </div>
        </div>

        <div className="fv1-form-fieldset">
          <div className="fv1-form-field-group">
            <label htmlFor="overtime">overtime</label>
            <input
              className="fv1-form-field"
              type="text"
              name="overtime"
              id="overtime"
            />
          </div>
        </div>

        <div className="fv1-form-fieldset">
          <div className="fv1-form-field-group">
            <label htmlFor="isFamilyInvolved">isFamilyInvolved</label>
            <input
              className="fv1-form-field"
              type="radio"
              name="isFamilyInvolvedYes"
              id="isFamilyInvolvedYes"
            />
            <input
              className="fv1-form-field"
              type="radio"
              name="isFamilyInvolvedNo"
              id="isFamilyInvolvedNo"
            />
          </div>
        </div>

        <div className="fv1-form-fieldset">
          <button className="fv1-form-button">Cancel</button>
          <button className="fv1-form-button">Save</button>
        </div>
      </div>
    </div>
  );
};
