import Link from "next/link";

export const metadata = {
  title: "Page Not Found — Find Care BC",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Illustration */}
        <div className="text-8xl mb-6 select-none">🧸</div>

        <h1 className="text-6xl font-serif font-bold text-primary-dark mb-2">
          404
        </h1>

        <p className="text-xl font-serif text-primary-dark mb-3">
          We lost this one at drop-off.
        </p>

        <p className="text-neutral-muted text-sm mb-8">
          The page you're looking for wandered off. Don't worry — finding
          the right childcare is hard enough without a broken link too.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="bg-primary-green text-white px-6 py-3 rounded-card hover:bg-opacity-90 transition font-medium text-sm"
          >
            Back to Home
          </Link>
          <Link
            href="/find"
            className="border border-neutral-border text-primary-dark px-6 py-3 rounded-card hover:bg-white transition font-medium text-sm"
          >
            Browse All Centres
          </Link>
        </div>
      </div>
    </div>
  );
}
