const Header = () => (
  <div className="text-center mb-16">
    <h1 className="text-5xl font-semibold bg-gradient-to-r from-red-900 to-red-600 bg-clip-text text-transparent mb-4">
      F1 LEAGUES
    </h1>
    <div className="flex items-center justify-center gap-4">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-red-600 to-transparent" />
      <p className="text-[var(--primary-grey)] uppercase tracking-widest text-xl">
        Join the ultimate racing competition
      </p>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent" />
    </div>
  </div>
);

export default Header;
