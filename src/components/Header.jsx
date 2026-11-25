import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <Navbar fluid rounded className="border-b border-gray-200 bg-white px-4 py-2.5 dark:border-gray-700 dark:bg-gray-900">
      {/* Brand / Logo */}
      <NavbarBrand as={Link} to="/home">
        <span className="self-center whitespace-nowrap text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          MyApp
        </span>
      </NavbarBrand>

      {/* Right Side Auth Buttons & Mobile Toggle */}
      <div className="flex items-center gap-2 md:order-2">
        <Button as={Link} to="/login" color="light" size="sm">
          Login
        </Button>
        <Button as={Link} to="/signup" color="blue" size="sm">
          Sign Up
        </Button>
        <NavbarToggle />
      </div>

      {/* Navigation Links */}
      <NavbarCollapse>
        <NavLink
          to="/home"
          className={({ isActive }) =>
            `block py-2 pr-4 pl-3 md:p-0 ${
              isActive
                ? "font-semibold text-blue-600 dark:text-blue-500"
                : "text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white"
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `block py-2 pr-4 pl-3 md:p-0 ${
              isActive
                ? "font-semibold text-blue-600 dark:text-blue-500"
                : "text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white"
            }`
          }
        >
          About
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `block py-2 pr-4 pl-3 md:p-0 ${
              isActive
                ? "font-semibold text-blue-600 dark:text-blue-500"
                : "text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white"
            }`
          }
        >
          Contact
        </NavLink>
      </NavbarCollapse>
    </Navbar>
  );
};

export default Header;