"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

const PAIN_POINTS = [
  "Ik vergeet ze vaak",
  "Ik raak bonnetjes kwijt",
  "Het kost te veel tijd",
  "Mijn boekhouder klaagt altijd",
  "BTW of categorieën zijn onduidelijk",
  "Anders",
];

const WOULD_USE_OPTIONS = ["Ja", "Misschien", "Nee"];

const CURRENT_TOOLS = [
  "Excel of spreadsheet",
  "Boekhoudsoftware (zoals Exact, AFAS, etc.)",
  "Papier en mapjes",
  "WhatsApp naar boekhouder",
  "Nog niets",
  "Anders",
];

interface IntentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function IntentModal({ isOpen, onClose }: IntentModalProps) {
  const [step, setStep] = useState(1);
  const [painPoint, setPainPoint] = useState("");
  const [painPointOther, setPainPointOther] = useState("");
  const [wouldUse, setWouldUse] = useState("");
  const [currentTool, setCurrentTool] = useState("");
  const [currentToolOther, setCurrentToolOther] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setPainPoint("");
      setPainPointOther("");
      setWouldUse("");
      setCurrentTool("");
      setCurrentToolOther("");
      setEmail("");
      setIsSubmitted(false);
      setError("");
    }
  }, [isOpen]);

  const handleNext = () => {
    setError("");

    if (step === 1) {
      if (!painPoint) {
        setError("Selecteer een optie.");
        return;
      }
      if (painPoint === "Anders" && !painPointOther.trim()) {
        setError("Beschrijf wat je vervelend vindt.");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!wouldUse) {
        setError("Selecteer een optie.");
        return;
      }
      // Only show question 3 if Ja or Misschien
      if (wouldUse === "Ja" || wouldUse === "Misschien") {
        setStep(3);
      } else {
        setStep(4); // Skip to email step
      }
    } else if (step === 3) {
      if (!currentTool) {
        setError("Selecteer een optie.");
        return;
      }
      if (currentTool === "Anders" && !currentToolOther.trim()) {
        setError("Beschrijf wat je nu gebruikt.");
        return;
      }
      setStep(4);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setError("");
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pain_point: painPoint === "Anders" ? painPointOther : painPoint,
          pain_point_other: painPoint === "Anders" ? painPointOther : null,
          would_use: wouldUse || null,
          current_tool:
            currentTool === "Anders" ? currentToolOther : currentTool || null,
          email: email.trim() || null,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setError(result.error || "Er ging iets mis. Probeer het opnieuw.");
      }
    } catch (err) {
      setError("Er ging iets mis. Probeer het opnieuw.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200" />
      
      {/* Modal */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 sm:p-10 overflow-y-auto max-h-[90vh]">
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-lg text-gray-900 font-medium">
                Dank je! Jouw feedback helpt bepalen of we dit bouwen.
              </p>
            </div>
          ) : (
            <>
              {/* Progress indicator */}
              <div className="mb-8">
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((s) => (
                    <div
                      key={s}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        s <= step ? "bg-gray-900" : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Step 1: Pain Point */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                      Wat vind jij het meest vervelend aan bonnetjes bijhouden?
                    </h2>
                    <p className="text-sm text-gray-500">Selecteer één optie</p>
                  </div>
                  <div className="space-y-2">
                    {PAIN_POINTS.map((option) => (
                      <label
                        key={option}
                        className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 cursor-pointer transition-all"
                      >
                        <input
                          type="radio"
                          name="pain_point"
                          value={option}
                          checked={painPoint === option}
                          onChange={(e) => setPainPoint(e.target.value)}
                          className="mt-1 w-4 h-4 text-gray-900 border-gray-300 focus:ring-gray-900"
                        />
                        <span className="text-gray-700 flex-1">{option}</span>
                      </label>
                    ))}
                  </div>
                  {painPoint === "Anders" && (
                    <div>
                      <input
                        type="text"
                        value={painPointOther}
                        onChange={(e) => setPainPointOther(e.target.value)}
                        placeholder="Beschrijf wat je vervelend vindt..."
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900 placeholder-gray-400"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Step 2: Would Use */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                      Zou je dit gebruiken als dit automatisch ging?
                    </h2>
                  </div>
                  <div className="space-y-2">
                    {WOULD_USE_OPTIONS.map((option) => (
                      <label
                        key={option}
                        className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 cursor-pointer transition-all"
                      >
                        <input
                          type="radio"
                          name="would_use"
                          value={option}
                          checked={wouldUse === option}
                          onChange={(e) => setWouldUse(e.target.value)}
                          className="w-4 h-4 text-gray-900 border-gray-300 focus:ring-gray-900"
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Current Tool */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                      Wat gebruik je nu?
                    </h2>
                  </div>
                  <div className="space-y-2">
                    {CURRENT_TOOLS.map((option) => (
                      <label
                        key={option}
                        className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 cursor-pointer transition-all"
                      >
                        <input
                          type="radio"
                          name="current_tool"
                          value={option}
                          checked={currentTool === option}
                          onChange={(e) => setCurrentTool(e.target.value)}
                          className="mt-1 w-4 h-4 text-gray-900 border-gray-300 focus:ring-gray-900"
                        />
                        <span className="text-gray-700 flex-1">{option}</span>
                      </label>
                    ))}
                  </div>
                  {currentTool === "Anders" && (
                    <div>
                      <input
                        type="text"
                        value={currentToolOther}
                        onChange={(e) => setCurrentToolOther(e.target.value)}
                        placeholder="Beschrijf wat je nu gebruikt..."
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900 placeholder-gray-400"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Step 4: Email (optional) */}
              {step === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                      Wil je dat we je informeren als dit er komt?
                    </h2>
                    <p className="text-sm text-gray-500">Max. 1 bericht (optioneel)</p>
                  </div>
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jouw@email.nl"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900 placeholder-gray-400"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Bezig..." : "Verzenden"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEmail("");
                      handleSubmit();
                    }}
                    disabled={isSubmitting}
                    className="w-full text-gray-600 hover:text-gray-900 text-sm font-medium py-2 transition-colors"
                  >
                    Overslaan
                  </button>
                </div>
              )}

              {error && (
                <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-red-800 text-sm">{error}</p>
                </div>
              )}

              {/* Navigation buttons */}
              {step < 4 && (
                <div className="mt-8 flex gap-3">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      Terug
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={
                      (step === 1 &&
                        (!painPoint ||
                          (painPoint === "Anders" && !painPointOther.trim()))) ||
                      (step === 2 && !wouldUse) ||
                      (step === 3 &&
                        (!currentTool ||
                          (currentTool === "Anders" && !currentToolOther.trim())))
                    }
                    className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Volgende
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

