export interface NavItem {
  name: string;
  href: string;
  badge?: string;
  description?: string;
}

/**
 * Single source of truth for portfolio navigation across Header, Footer, and Command Palette.
 */
export const MAIN_NAV_ITEMS: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Python Lab", href: "/python-lab" },
  { name: "Experience", href: "/experience" },
  { name: "Skills", href: "/skills" },
  { name: "Academics", href: "/academics" },
  { name: "Contact", href: "/contact" },
];
