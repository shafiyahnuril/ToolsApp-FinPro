import React from "react";
import Container from "../../components/Container";
import { FilterIcon, Trash2, Calendar, Activity, Droplets, Zap, AlertCircle } from "lucide-react";

function HealthEntryItem({ entry, onDelete }) {
  const getTypeIcon = () => {
    switch (entry.type) {
      case "glucose":
        return <Zap className="h-5 w-5 text-warning" />;
      case "calories":
        return <AlertCircle className="h-5 w-5 text-success" />;
      case "water":
        return <Droplets className="h-5 w-5 text-primary" />;
      case "condition":
        return <Activity className="h-5 w-5 text-info" />;
      default:
        return <Activity className="h-5 w-5 text-base-content" />;
    }
  };

  const getTypeColor = () => {
    switch (entry.type) {
      case "glucose":
        return "border-warning/30 bg-warning/5";
      case "calories":
        return "border-success/30 bg-success/5";
      case "water":
        return "border-primary/30 bg-primary/5";
      case "condition":
        return "border-info/30 bg-info/5";
      default:
        return "border-base-300/30";
    }
  };

  const getTypeLabel = () => {
    switch (entry.type) {
      case "glucose":
        return "Glucose";
      case "calories":
        return "Calories";
      case "water":
        return "Water";
      case "condition":
        return "Body";
      default:
        return "Health";
    }
  };

  const getValueDisplay = () => {
    if (entry.type === "condition") return "";
    
    switch (entry.type) {
      case "glucose":
        return `${entry.value} mg/dL`;
      case "calories":
        return `${entry.value} kcal`;
      case "water":
        return `${entry.value} glasses`;
      case "sugar":
        return `${entry.value}`;
      default:
        return entry.value;
    }
  };

  return (
    <div className={`card bg-base-100 shadow-md hover:shadow-lg transition-all duration-200 border ${getTypeColor()}`}>
      <div className="card-body p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            {/* Type Indicator */}
            <div className="flex items-center gap-2">
              {getTypeIcon()}
              <span className="font-medium text-sm">
                {getTypeLabel()}
              </span>
            </div>

            {/* Content */}
            <div className="flex-1">
              {/* Value Display */}
              {entry.type !== "condition" && (
                <div className="font-bold text-lg text-base-content mb-1">
                  {getValueDisplay()}
                </div>
              )}

              {/* Description */}
              <div className="text-base-content font-medium mb-1">
                {entry.description}
              </div>

              {/* Date */}
              <div className="flex items-center gap-1 text-base-content/60 text-sm">
                <Calendar className="h-3 w-3" />
                <span>
                  {entry.createdAt.toLocaleDateString()} at{" "}
                  {entry.createdAt.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Delete Button */}
          <button
            onClick={() => onDelete(entry.id)}
            className="btn btn-sm btn-circle btn-ghost hover:btn-error transition-all duration-200"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function HistoryHealth({ setFilter, counts, filter, filteredEntries, deleteEntry }) {
  const filterOptions = [
    { value: "all", label: "All", count: counts.all },
    { value: "sugar", label: "Blood", count: counts.sugar || 0 },
    { value: "condition", label: "Body Condition", count: counts.condition || 0 },
  ];

  return (
    <Container>
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
            <h2 className="card-title">History</h2>

            {/* Filter Buttons */}
            <div className="btn-group flex flex-wrap items-center gap-2">
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFilter(option.value)}
                  className={`btn btn-sm ${
                    filter === option.value
                      ? "btn-primary btn-active"
                      : "btn-outline"
                  }`}
                >
                  {option.value === "all" && <FilterIcon className="h-4 w-4 mr-2" />}
                  {option.label} ({option.count})
                </button>
              ))}
            </div>
          </div>

          {/* Entry List */}
          <div className="space-y-3">
            {filteredEntries.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-base-content/50 text-lg">
                  <p>No {filter === "all" ? "entries" : filter} found</p>
                  <p className="text-sm mt-2">
                    Start by adding your first health entry above
                  </p>
                </div>
              </div>
            ) : (
              filteredEntries.map((entry) => (
                <HealthEntryItem
                  key={entry.id}
                  entry={entry}
                  onDelete={deleteEntry}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default HistoryHealth;