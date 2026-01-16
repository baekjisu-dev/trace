import ProfileButton from "./parts/profile-button";

const Header = () => {
  return (
    <header className="w-full shadow-sm px-4 py-2 h-12 flex items-center justify-center">
      <h1 className="text-2xl font-bold">Trace</h1>
      <div className="absolute right-4">
        <ProfileButton />
      </div>
    </header>
  );
};

export default Header;
