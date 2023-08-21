import Link from 'next/link';
import React from 'react';

export default function HomeLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <nav style={styles.nav}>
      <Link href="/dashboard">Dashboard</Link>
        <a href="/html/">HTML</a>
        <a href="/css/">CSS</a>
        <a href="/js/">JavaScript</a>
        <a href="/python/">Python</a>
      </nav>

      {children}
    </section>
  );
}

const styles = {
  nav: {
    backgroundColor: '#333',
    padding: '10px 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: "16px"
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    margin: '0 10px',
    padding: '5px 10px',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  },
  navLinkHover: {
    backgroundColor: '#555',
  },
};
