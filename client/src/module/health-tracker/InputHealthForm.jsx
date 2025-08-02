import React from "react";
import Container from "../../components/Container";
import { ArrowRight, TrendingUp } from "lucide-react";

function InputHealthForm({
  handleSubmit,
  inputType,
  setInputType,
  value,
  setValue,
  description,
  setDescription,
  isFormValid,
  getDescriptionPlaceholder,
}) {
  const getInputTypeOptions = () => [
    { value: "glucose", label: "Glucose", color: "warning" },
    { value: "calories", label: "Calories", color: "success" },
    { value: "water", label: "Water", color: "primary" },
    { value: "condition", label: "Body Condition", color: "info" },
  ];

  const getSubmitButtonColor = () => {
    switch (inputType) {
      case "glucose":
        return "btn-warning";
      case "calories":
        return "btn-success";
      case "water":
        return "btn-primary";
      case "condition":
        return "btn-info";
      default:
        return "btn-primary";
    }
  };

  return (
    <Container className="flex flex-col gap-4">
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body p-4 sm:p-6">
          <h2 className="card-title mb-4 flex items-center gap-2 text-lg sm:text-xl">
            <TrendingUp className="h-5 w-5" />
            Input Track
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Type Selection */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Track Type</span>
              </label>
              <select
                value={inputType}
                onChange={(e) => setInputType(e.target.value)}
                className="select select-bordered focus:select-primary w-full"
              >
                {getInputTypeOptions().map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col lg:flex-row gap-4">
              {/* Value Input - Only show for non-condition types */}
              {inputType !== "condition" && (
                <div className="form-control flex-1">
                  <label className="label">
                    <span className="label-text font-medium text-sm sm:text-base">
                      {inputType === "glucose" && "Level (mg/dL)"}
                      {inputType === "calories" && "Amount (kcal)"}
                      {inputType === "water" && "Glasses"}
                    </span>
                  </label>
                  <input
                    type="number"
                    step={inputType === "glucose" ? "0.1" : "1"}
                    placeholder="0"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="input input-bordered w-full focus:input-primary"
                  />
                </div>
              )}

              {/* Description Input */}
              <div className="form-control flex-1">
                <label className="label">
                  <span className="label-text font-medium text-sm sm:text-base">
                    {inputType === "condition" ? "Description" : "Notes"}
                  </span>
                </label>
                <input
                  type="text"
                  placeholder={getDescriptionPlaceholder()}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="input input-bordered focus:input-primary w-full"
                />
              </div>

              {/* Submit Button */}
              <div className="form-control lg:self-end">
                <label className="label lg:opacity-0">
                  <span className="label-text">Submit</span>
                </label>
                <button
                  type="submit"
                  className={`btn gap-2 ${getSubmitButtonColor()} w-full lg:w-auto`}
                  disabled={!isFormValid()}
                >
                  Submit
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
}

export default InputHealthForm;