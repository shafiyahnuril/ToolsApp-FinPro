import React from "react";
import Container from "../../components/Container";

function Stats({ active, completed, total }) {
  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-primary/10 border border-primary/20 shadow-lg">
          <div className="card-body p-6">
            <h3 className="text-base-content/70 font-medium">Active Todos</h3>
            <p className="text-3xl font-bold text-primary">{active}</p>
          </div>
        </div>

        <div className="card bg-success/10 border border-success/20 shadow-lg">
          <div className="card-body p-6">
            <h3 className="text-base-content/70 font-medium">Completed Todos</h3>
            <p className="text-3xl font-bold text-success">{completed}</p>
          </div>
        </div>

        <div className="card bg-info/10 border border-info/20 shadow-lg">
          <div className="card-body p-6">
            <h3 className="text-base-content/70 font-medium">Total Todos</h3>
            <p className="text-3xl font-bold text-info">{total}</p>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Stats;