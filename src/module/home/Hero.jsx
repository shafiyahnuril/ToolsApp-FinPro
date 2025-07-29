import React from "react";
import Container from "../../components/Container";
import { Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Target } from "lucide-react";
import { ArrowRight } from "lucide-react";

function Hero() {
  return (
    <div className="hero min-h-[70vh] bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <Container className="items-center justify-center">
        <div className="hero-content text-center max-w-4xl mx-auto">
          <div className="animate-slide-down">
            <div className="flex justify-center mb-6">
              <div className="p-3 sm:p-4 bg-primary/10 rounded-full">
                <Zap className="h-12 w-12 sm:h-16 sm:w-16 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4 sm:mb-6">
              Tools App
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-base-content/80 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-4">
              Manage your tasks here !!!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
              <Link
                to="/todolist"
                className="btn btn-primary btn-lg gap-2 shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
              >
                <Target className="h-5 w-5" />
                Get Started
                <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href="#features"
                className="btn btn-outline btn-lg gap-2 hover:btn-primary transition-all duration-300 w-full sm:w-auto"
              >
                Explore Features
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Hero;