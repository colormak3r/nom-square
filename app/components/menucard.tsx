export default function MenuCard(item: { name: string, image: string, description: string, rating: number, price: number }) {
    return (
        <div className="w-full rounded-2xl shadow-lg bg-white m-2">
            <div className="flex flex-col md:flex-row">
                <img src={item.image} alt={item.name} className="sm.w-full md.w-40 h-40 object-cover rounded-lg" />
                <div className="flex flex-col sm.flex-row justify-between w-full ml-2">
                    <div>
                        <p className="text-xl text-stone-700 font-semibold">{item.name}</p>
                        <p className="text-stone-700">{item.description}</p>
                    </div>
                    <div className="flex justify-end items-end m-2">
                        <p className="text-stone-700 font-semibold m-2">☆ {item.rating}</p>
                        <p className="text-stone-700 font-semibold m-2">${item.price.toFixed(2)}</p>
                        <button className="bg-red-400 text-white font-semibold py-2 px-4 mx-2 rounded-lg">+</button>
                    </div>
                </div>
            </div>
        </div>
    );
}