"use client";

import { useState } from "react";
import IntentModal from "@/components/IntentModal";
import ContactForm from "@/components/ContactForm";
import Header from "@/components/Header";
import { Briefcase, Wrench, Truck, Code } from "lucide-react";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="pt-6 sm:pt-8 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight tracking-tight px-2">
              Ben je het zat om bonnetjes steeds naar je boekhouder te sturen?
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-2">
              Wij onderzoeken een simpele oplossing: maak een foto van je bon
              en je administratie wordt automatisch overzichtelijk.
            </p>

            {/* Primary CTA */}
            <div className="mb-8 sm:mb-10">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center bg-gray-900 hover:bg-gray-800 text-white font-medium px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] text-base sm:text-lg w-full sm:w-auto"
              >
                Check of dit mij zou helpen (30 sec)
              </button>
            </div>

            {/* Target audience - subtle cards */}
            <div className="mb-8 sm:mb-10">
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg">
                  <Briefcase className="w-3.5 h-3.5 text-gray-400" strokeWidth={1.5} />
                  <span className="text-xs text-gray-500">ZZP'ers</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg">
                  <Wrench className="w-3.5 h-3.5 text-gray-400" strokeWidth={1.5} />
                  <span className="text-xs text-gray-500">Klussers</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg">
                  <Truck className="w-3.5 h-3.5 text-gray-400" strokeWidth={1.5} />
                  <span className="text-xs text-gray-500">Monteurs</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg">
                  <Code className="w-3.5 h-3.5 text-gray-400" strokeWidth={1.5} />
                  <span className="text-xs text-gray-500">Freelancers</span>
                </div>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-500 px-4">
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
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
                <span>Geen account nodig</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
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
                <span>Geen verplichtingen</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
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
                <span>In ontwikkeling</span>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-100 py-20 sm:py-24 px-4 sm:px-6 lg:px-8 mt-24 sm:mt-32">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[10px] sm:text-xs text-gray-400">
              <a
                href="/privacy"
                className="hover:text-gray-500 transition-colors"
              >
                Privacybeleid
              </a>
              <ContactForm />
            </div>
            <p className="text-[10px] sm:text-xs text-gray-400">
              © {new Date().getFullYear()} Bonnenhulp.nl
            </p>
          </div>
        </footer>
      </main>

      {/* Modal */}
      <IntentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
