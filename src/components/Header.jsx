import React from "react";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation().pathname;
  console.log(location);

  const activeLink = ["text-orange-500"];
  return (
    <header>
      <nav className="pt-3 pr-5 text-lg text-zinc-500">
        <ul className="flex justify-start max-w-screen-xl p-5 ml-5 text-white gap-x-12">
          <li>
            <Link to="/" className={location === "/" ? activeLink : null}>
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/expenses"
              className={location === "/expenses" ? activeLink : null}
            >
              Expenses
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
