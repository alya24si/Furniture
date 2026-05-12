export default function PageHeader({ title, breadcrumb, children }) {
    return (
        <div className="flex items-center justify-between p-4">
            <div className="flex flex-col">

                {/* PRIORITAS: props title */}
                {title ? (
                    <span className="text-3xl font-semibold">
                        {title}
                    </span>
                ) : (
                    <span className="text-3xl font-semibold">
                        Dashboard
                    </span>
                )}

                <div className="flex items-center space-x-2 mt-2 text-gray-500">

                    {/* PRIORITAS: props breadcrumb */}
                    {breadcrumb ? (
                        <span>
                            {Array.isArray(breadcrumb)
                                ? breadcrumb.join(" / ")
                                : breadcrumb}
                        </span>
                    ) : (
                        <>
                            <span>Dashboard</span>
                            <span>/</span>
                            <span>Order</span>
                        </>
                    )}

                </div>
            </div>

            {/* PRIORITAS: children */}
            <div>
                {children ? (
                    children
                ) : (
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
                        Add Button
                    </button>
                )}
            </div>
        </div>
    );
}