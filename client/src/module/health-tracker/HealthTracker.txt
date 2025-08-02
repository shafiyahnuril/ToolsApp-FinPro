import React, { useState, useMemo } from "react";
import { useHealthEntries } from "../../hooks/useHealthEntries";
import HeaderHealth from "./HeaderHealth";
import HealthStats from "./HealthStats";
import InputHealthForm from "./InputHealthForm";
import HistoryHealth from "./HistoryHealth";

const HealthTracker = () => {
  const { entries, addEntry, deleteEntry } = useHealthEntries();

  const [inputType, setInputType] = useState("calories");
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [filter, setFilter] = useState("all");

  // Today's stats
  const todayStats = useMemo(() => {
    const today = new Date().toDateString();
    const todayEntries = entries.filter(
      (entry) => entry.createdAt.toDateString() === today
    );

    const calories = todayEntries
      .filter((entry) => entry.type === "calories")
      .reduce((sum, entry) => sum + Number(entry.value), 0);

    const sugar = todayEntries
      .filter((entry) => entry.type === "sugar")
      .reduce((sum, entry) => sum + Number(entry.value), 0);

    const water = todayEntries
      .filter((entry) => entry.type === "water")
      .reduce((sum, entry) => sum + Number(entry.value), 0);

    const conditions = todayEntries
      .filter((entry) => entry.type === "condition")
      .map((entry) => entry.description);

    return { calories, sugar, water, conditions };
  }, [entries]);

  const filteredEntries = useMemo(() => {
    if (filter === "all") return entries;
    return entries.filter((entry) => entry.type === filter);
  }, [entries, filter]);

  const handleAddEntry = () => {
    if (
      (inputType !== "condition" && value && description.trim()) ||
      (inputType === "condition" && description.trim())
    ) {
      addEntry(inputType, value, description);
      setValue("");
      setDescription("");
    }
  };

  const getFilterCounts = () => {
    const counts = {
      all: entries.length,
      calories: entries.filter((e) => e.type === "calories").length,
      sugar: entries.filter((e) => e.type === "sugar").length,
      water: entries.filter((e) => e.type === "water").length,
      condition: entries.filter((e) => e.type === "condition").length,
    };
    return counts;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddEntry();
  };

  const getDescriptionPlaceholder = () => {
    switch (inputType) {
      case "calories":
        return "What did you eat?";
      case "sugar":
        return "Any worries?";
      case "water":
        return "Any notes?";
      case "condition":
        return "Describe your condition & mood";
      default:
        return "Any notes?";
    }
  };

  // Perbaiki logic validasi form
  const isFormValid = () => {
    if (inputType === "condition") {
      return description.trim() !== "";
    } else {
      return value !== "" && description.trim() !== "";
    }
  };

  const counts = getFilterCounts();

  return (
    <>
      {/* Header */}
      <HeaderHealth />
      {/* Today's Summary */}
      <HealthStats todayStats={todayStats} />

      {/* Input Track */}
      <InputHealthForm
        handleSubmit={handleSubmit}
        inputType={inputType}
        setInputType={setInputType}
        value={value}
        setValue={setValue}
        description={description}
        setDescription={setDescription}
        isFormValid={isFormValid}
        getDescriptionPlaceholder={getDescriptionPlaceholder}
      />

      {/* History */}
      <HistoryHealth
        setFilter={setFilter}
        counts={counts}
        filter={filter}
        filteredEntries={filteredEntries}
        deleteEntry={deleteEntry}
      />
    </>
  );
};

export default HealthTracker;
