import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Label } from "../components/ui/label";
import NavigationBar from "../components/NavigationBar";

interface Question {
  id: number;
  question: string;
  options: string[];
}

const FragranceQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      question: "What type of scents do you typically prefer?",
      options: ["Floral", "Woody", "Citrus", "Oriental", "Fresh"],
    },
    {
      id: 2,
      question: "How would you describe your personality?",
      options: [
        "Adventurous",
        "Sophisticated",
        "Playful",
        "Mysterious",
        "Relaxed",
      ],
    },
    {
      id: 3,
      question: "When do you typically wear fragrance?",
      options: [
        "Daily",
        "Special occasions",
        "Work",
        "Evenings out",
        "Seasonally",
      ],
    },
    {
      id: 4,
      question: "What season do you most look forward to?",
      options: ["Spring", "Summer", "Fall", "Winter"],
    },
    {
      id: 5,
      question: "How long do you prefer your fragrance to last?",
      options: ["Just a few hours", "Half a day", "All day", "Multiple days"],
    },
  ];

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: answer });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  const getRecommendation = () => {
    // This is a simplified recommendation logic
    // In a real application, this would be more sophisticated
    const personalityType = answers[2] || "";

    const recommendations = {
      Adventurous:
        "Wild Spirit - A bold, spicy fragrance with notes of black pepper and cedarwood.",
      Sophisticated:
        "Elegant Essence - A refined blend of rose, jasmine, and amber.",
      Playful:
        "Joyful Bloom - A light, fruity scent with notes of peach and vanilla.",
      Mysterious:
        "Enigma - A deep, sensual fragrance with oud and dark chocolate notes.",
      Relaxed:
        "Serene - A calming lavender and sandalwood blend perfect for everyday wear.",
    };

    return (
      recommendations[personalityType as keyof typeof recommendations] ||
      "Essentia Signature - Our balanced signature scent with notes of bergamot, jasmine, and sandalwood."
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-3xl font-serif text-center mb-8">
          Find Your Perfect Fragrance
        </h1>

        {!showResults ? (
          <Card className="max-w-2xl mx-auto p-6">
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <span>
                  {Math.round(((currentQuestion + 1) / questions.length) * 100)}
                  % Complete
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gray-800 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                  }}
                ></div>
              </div>
            </div>

            <h2 className="text-xl font-medium mb-4">
              {questions[currentQuestion].question}
            </h2>

            <RadioGroup
              value={answers[questions[currentQuestion].id] || ""}
              onValueChange={handleAnswer}
              className="space-y-3 mb-6"
            >
              {questions[currentQuestion].options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                Previous
              </Button>
              <Button
                onClick={handleNext}
                disabled={!answers[questions[currentQuestion].id]}
              >
                {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </Card>
        ) : (
          <Card className="max-w-2xl mx-auto p-6 text-center">
            <h2 className="text-2xl font-serif mb-4">
              Your Perfect Fragrance Match
            </h2>
            <p className="text-lg mb-6">{getRecommendation()}</p>
            <p className="mb-8">
              Based on your preferences, we've selected this fragrance that we
              believe will resonate with your personality and style.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button onClick={handleRestart}>Take Quiz Again</Button>
              <Button
                variant="outline"
                onClick={() => (window.location.href = "/shop")}
              >
                Shop This Fragrance
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FragranceQuiz;
