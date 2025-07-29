import React from "react";
import Container from "../../components/Container";
import { Heart } from "lucide-react";

function HeaderHealth() {
  return (
    <Container className="flex flex-col gap-4">
      <div className="text-center mb-6 sm:mb-8 animate-slide-down mt-8 sm:mt-14">
        <h1 className="text-3xl sm:text-4xl font-bold text-base-content mb-2 flex items-center justify-center gap-2 sm:gap-3">
          <Heart className="h-8 w-8 sm:h-10 sm:w-10 text-error" />
          Health Tracker
        </h1>
        <p className="text-base-content/70 text-base sm:text-lg px-4">
          Knowing and keeping your health in prime conditions
        </p>
      </div>
    </Container>
  );
}

export default HeaderHealth;