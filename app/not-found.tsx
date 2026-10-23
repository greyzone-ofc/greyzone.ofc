import Link from 'next/link';

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: '100svh',
        display: 'grid',
        placeContent: 'center',
        gap: '1rem',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <h1>Page not found</h1>
      <p>That route is not part of this site yet.</p>
      <p>
        <Link href="/">Back to GREYZONE</Link>
      </p>
    </main>
  );
}
