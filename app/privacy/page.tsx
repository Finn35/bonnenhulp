export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
          Privacybeleid
        </h1>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            Bonnenhulp respecteert je privacy. We verzamelen alleen de informatie
            die nodig is om onze service te leveren.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Wanneer je je e-mailadres achterlaat, gebruiken we dit alleen om je
            op de hoogte te houden over de beschikbaarheid van Bonnenhulp. We
            delen je gegevens niet met derden.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Voor vragen over privacy, neem contact met ons op via{" "}
            <a
              href="mailto:contact@bonnenhulp.nl"
              className="text-primary-700 hover:text-primary-800"
            >
              contact@bonnenhulp.nl
            </a>
            .
          </p>
        </div>
        <div className="mt-8">
          <a
            href="/"
            className="text-primary-700 hover:text-primary-800 transition-colors"
          >
            ← Terug naar home
          </a>
        </div>
      </div>
    </main>
  );
}

