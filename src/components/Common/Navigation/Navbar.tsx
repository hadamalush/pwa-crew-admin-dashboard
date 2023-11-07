import NavItem from "./NavItem";
// import Button from "../../UI/Button";

const Navbar = () => {
  return (
    <nav className="h-screen bg-primary w-96">
      <ul>
        <NavItem to="dsd" icon="dsd">
          Benc
        </NavItem>
        <li>blabla</li>
        <li>blabla</li>
        <li>blabla</li>
      </ul>
    </nav>
  );
};

export default Navbar;
