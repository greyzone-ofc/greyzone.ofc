import { LogoLoader } from "./logo-loader";
import { Nav } from "./nav";

export function Header() {
  return (
    <header className="border-b border-mist">
      <div className="header-bar">
        <LogoLoader />
        <Nav />
      </div>
    </header>
  );
}
