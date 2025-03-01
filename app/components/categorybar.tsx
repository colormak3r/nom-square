export default function CategoryBar({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div className="w-full">
            <details className="group" open>
                <summary className="flex justify-between items-center cursor-pointer bg-gray-100 rounded-xl p-4 m-2">
                    <h2 className="text-xl text-stone-700 font-semibold">○ {title}</h2>
                </summary>
                <div className="mr-6 m-2">{children}</div>
            </details>
        </div>
    )
}