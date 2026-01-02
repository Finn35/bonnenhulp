export default function Header() {
  return (
    <header className="border-b border-gray-100 bg-white sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <a
            href="/"
            className="text-gray-900 font-medium text-base sm:text-lg hover:text-gray-700 transition-colors"
          >
            Bonnenhulp
          </a>
          <nav>
            <a
              href="/privacy"
              className="text-xs sm:text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Privacy
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}

