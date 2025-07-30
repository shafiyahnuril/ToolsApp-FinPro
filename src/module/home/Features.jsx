import React from "react";
import { tools } from "../../helpers/HomeHelper";
import Container from "../../components/Container";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function Features() {
  return (
    <div id="features" className="py-12 sm:py-16 lg:py-20 bg-base-100">
      <Container>
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-base-content mb-4">
            Made by Sophie & Aly
          </h2>
          <p className="text-lg sm:text-xl text-base-content/70 max-w-2xl mx-auto px-4">
            Tools by Sophie & Aly
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.title}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in border border-base-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="card-body p-6 sm:p-8">
                  <div
                    className={`w-12 h-12 sm:w-16 sm:h-16 ${tool.bgColor} rounded-2xl flex items-center justify-center mb-4 sm:mb-6`}
                  >
                    <Icon className={`h-6 w-6 sm:h-8 sm:w-8 ${tool.color}`} />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-base-content mb-3">
                    {tool.title}
                  </h3>

                  <p className="text-base-content/70 mb-4 sm:mb-6 leading-relaxed">
                    {tool.description}
                  </p>

                  <div className="mb-4 sm:mb-6">
                    <h4 className="font-semibold text-base-content mb-3">
                      Key Features:
                    </h4>
                    <ul className="space-y-2">
                      {tool.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-sm text-base-content/70"
                        >
                          <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="card-actions justify-end mt-auto">
                    {tool.available ? (
                      <Link
                        to={tool.path}
                        className="btn btn-primary gap-2 hover:shadow-lg transition-all duration-300 w-full sm:w-auto"
                      >
                        Launch Tool
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    ) : (
                      <button className="btn btn-disabled gap-2 w-full sm:w-auto">
                        Coming Soon
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}

export default Features;