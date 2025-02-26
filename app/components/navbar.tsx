export default function Navbar() {
    return (
        <nav className="flex items-center justify-between p-4 bg-red-400 sticky top-0 shadow-md z-50">
            <div className="text-xl font-bold text-stone-700">Nom<sup>2</sup></div>
            <div className="space-x-4">
                <a href="/" className="text-stone-700 hover:text-stone-900">
                    Home
                </a>
                <a href="/about" className="text-stone-700 hover:text-stone-900">
                    About
                </a>
            </div>
        </nav>
    );
}