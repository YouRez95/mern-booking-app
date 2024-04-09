import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import SignOutButton from "./SignOutButton";

export default function Header() {
  const { isLoggedIn } = useAppContext();

  console.log(isLoggedIn);

  return (
    <div className="bg-primary py-6">
      <header className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">ReserveEase.com</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link
                to="my-bookings"
                className="flex items-center text-white px-3 font-bold hover:bg-secondary"
              >
                My Bookings
              </Link>
              <Link
                to="my-hotels"
                className="flex items-center text-white px-3 font-bold hover:bg-secondary"
              >
                My Hotels
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex items-center text-secondary bg-white px-5 rounded-full font-bold hover:bg-gray-100"
            >
              Sign In
            </Link>
          )}
        </span>
      </header>
    </div>
  );
}
