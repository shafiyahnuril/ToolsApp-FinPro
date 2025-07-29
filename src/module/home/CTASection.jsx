import { ArrowRight } from "lucide-react";
import { CheckSquare } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../../components/Container";

function CTASection() {
  return (
    <div className="py-16 sm:py-20 bg-gradient-to-r from-primary to-secondary">
      <Container>
        <div className="text-center">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
              Let's Use This Tool
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-6 sm:mb-8">
              Start with try the to-do list
            </p>
            <Link
              to="/todolist"
              className="btn btn-lg bg-white text-primary hover:bg-base-100 border-none shadow-xl hover:shadow-2xl transition-all duration-300 gap-2 w-full sm:w-auto"
            >
              <CheckSquare className="h-5 w-5 sm:h-6 sm:w-6" />
              Start TodoList Here
              <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default CTASection;