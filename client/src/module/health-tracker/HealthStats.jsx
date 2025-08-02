import React from "react";
import Container from "../../components/Container";
import { Activity, Droplets, Zap, AlertCircle } from "lucide-react";

function HealthStats({ todayStats }) {
  return (
    <Container className="flex flex-col gap-4">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-base-content mb-4 text-center">Today</h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4">
          {/* Body Condition */}
          <div className="card bg-gradient-to-br from-info/10 to-info/5 border border-info/20 shadow-lg">
            <div className="card-body p-3 sm:p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-base-content/70 font-medium text-xs sm:text-sm">Body Condition</span>
                <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-info" />
              </div>
              <div className="text-sm sm:text-lg font-bold text-info">
                {todayStats.conditions.length > 0 ? (
                  <span className="text-xs sm:text-sm">
                    {todayStats.conditions[todayStats.conditions.length - 1].substring(0, 15)}
                    {todayStats.conditions[todayStats.conditions.length - 1].length > 15 ? "..." : ""}
                  </span>
                ) : (
                  "Good"
                )}
              </div>
              <div className="text-base-content/60 text-xs mt-1">
                {todayStats.conditions.length} entries
              </div>
            </div>
          </div>

          {/* Glucose Level */}
          <div className="card bg-gradient-to-br from-warning/10 to-warning/5 border border-warning/20 shadow-lg">
            <div className="card-body p-3 sm:p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-base-content/70 font-medium text-xs sm:text-sm">Glucose</span>
                <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-warning" />
              </div>
              <div className="text-lg sm:text-xl font-bold text-warning">
                {todayStats.sugar > 0 ? todayStats.sugar : "100"}
              </div>
              <div className="text-base-content/60 text-xs mt-1">
                mg/dL
              </div>
            </div>
          </div>

          {/* Water Intake */}
          <div className="card bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 shadow-lg">
            <div className="card-body p-3 sm:p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-base-content/70 font-medium text-xs sm:text-sm">Water</span>
                <Droplets className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              </div>
              <div className="text-lg sm:text-xl font-bold text-primary">
                {todayStats.water || 0}
              </div>
              <div className="text-base-content/60 text-xs mt-1">
                glasses
              </div>
            </div>
          </div>

          {/* Calories */}
          <div className="card bg-gradient-to-br from-success/10 to-success/5 border border-success/20 shadow-lg">
            <div className="card-body p-3 sm:p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-base-content/70 font-medium text-xs sm:text-sm">Calories</span>
                <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-success" />
              </div>
              <div className="text-lg sm:text-xl font-bold text-success">
                {todayStats.calories || 0}
              </div>
              <div className="text-base-content/60 text-xs mt-1">
                kcal
              </div>
            </div>
          </div>
        </div>

        {/* Today's Status */}
        <div className="text-center">
          <div className={`badge badge-lg ${todayStats.conditions.length > 0 ? 'badge-error' : 'badge-success'}`}>
            <span className="text-sm sm:text-base font-bold">
              {todayStats.conditions.length > 0 ? "Sickly" : "Healthy"}
            </span>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default HealthStats;