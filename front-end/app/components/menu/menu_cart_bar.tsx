export default function MenuCartBar({
  isMenuView,
  onMenuButtonClick,
  onCartButtonClick,
}: {
  isMenuView: boolean;
  onMenuButtonClick: () => void;
  onCartButtonClick: () => void;
}) {
  return (
    <nav className="flex w-full items-stretch justify-evenly bg-red-400 fixed bottom-0 z-50 p-4 inset-shadow-sm inset-shadow-orange-200">
      <button
        onClick={onMenuButtonClick}
        className={`grow rounded-full rounded-r-none ${
          isMenuView ? "bg-red-300" : "bg-gray-50"
        }`}
      >
        <div className="text-stone-700 font-semibold text-lg text-center p-2">
          Menu
        </div>
      </button>
      <button
        onClick={onCartButtonClick}
        className={`grow rounded-full rounded-l-none ${
          isMenuView ? "bg-gray-50" : "bg-red-300"
        }`}
      >
        <div className="text-stone-700 font-semibold text-lg text-center p-2">
          Cart
        </div>
      </button>
    </nav>
  );
}
