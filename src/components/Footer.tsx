"use client";

import React, { useState, useEffect } from "react";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const socialLinks = [
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://linkedin.com/in/nagyarthur",
      label: "LinkedIn",
    },
    {
      icon: <Github className="w-5 h-5" />,
      href: "https://github.com/ArthurNagy",
      label: "GitHub",
    },
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5 fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
        </svg>
      ),
      href: "https://medium.com/@arthur.nagy",
      label: "Medium",
    },
    {
      icon: <Mail className="w-5 h-5" />,
      href: "mailto:arthur.nagy@outlook.com",
      label: "Email",
    },
  ];

  const year = mounted ? new Date().getFullYear().toString() : '';

  return (
    <footer className="py-8 px-4 border-t border-outline-variant bg-surface-container">
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <div className="flex justify-center gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-surface/60 hover:text-primary transition-colors"
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
        </div>
        <p className="text-on-surface/60" suppressHydrationWarning>
          © {year} Arthur Nagy. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
