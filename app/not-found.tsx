import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-28 text-center">
      <p className="text-7xl font-bold tracking-tight text-gradient">404</p>
      <h1 className="mt-4 text-2xl font-bold tracking-tight">
        This scent trailed off
      </h1>
      <p className="mt-3 text-muted">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-gradient-to-br from-accent to-accent-2 px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform duration-200 hover:scale-[1.02]"
      >
        Back home
      </Link>
    </div>
  );
}
