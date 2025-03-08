export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-red-400 sticky top-0 shadow-md z-50">
      <div className="text-xl font-bold text-stone-700 border rounded-2xl p-4">
        Nom<sup>2</sup>
      </div>
      <div className="flex flex-row space-x-4">
        <a
          href="/"
          className="text-stone-700 font-semibold hover:text-stone-900"
        >
          Home
        </a>
        <p className="text-stone-700 font-semibold">•</p>
        <a
          href="/about"
          className="text-stone-700 font-semibold hover:text-stone-900"
        >
          About Us
        </a>
        <p className="text-stone-700 font-semibold">•</p>
        <a
          href="/employee"
          className="text-stone-700 font-semibold hover:text-stone-900"
        >
          Employee
        </a>
        <p className="text-stone-700 font-semibold">•</p>
        <a
          href="/menuedit"
          className="text-stone-700 font-semibold hover:text-stone-900"
        >
          Menu Editer
        </a>
      </div>
    </nav>
  );
}
