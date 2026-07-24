import { useEffect, useState } from "react";

import { getDashboard } from "../services/adminService";

function AdminDashboard() {

    const [dashboard, setDashboard] = useState<any>(null);

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const data = await getDashboard();

            setDashboard(data);

        } catch (err) {

            console.error(err);

        }

    };

    if (!dashboard) {

        return (

            <div className="flex h-screen items-center justify-center">

                <h2 className="text-3xl font-bold">

                    Đang tải Dashboard...

                </h2>

            </div>

        );

    }

    return (

        <section className="mx-auto max-w-7xl px-8 py-10">

            <h1 className="mb-10 text-4xl font-bold">

                Dashboard Admin

            </h1>

            <div className="grid grid-cols-4 gap-8">

                <div className="rounded-3xl bg-blue-600 p-8 text-white shadow-xl">

                    <h3 className="text-xl">

                        👤 Người dùng

                    </h3>

                    <p className="mt-5 text-5xl font-bold">

                        {dashboard.users}

                    </p>

                </div>

                <div className="rounded-3xl bg-green-600 p-8 text-white shadow-xl">

                    <h3 className="text-xl">

                        📖 Mẹo

                    </h3>

                    <p className="mt-5 text-5xl font-bold">

                        {dashboard.tips}

                    </p>

                </div>

                <div className="rounded-3xl bg-yellow-500 p-8 text-white shadow-xl">

                    <h3 className="text-xl">

                        💬 Bình luận

                    </h3>

                    <p className="mt-5 text-5xl font-bold">

                        {dashboard.comments}

                    </p>

                </div>

                <div className="rounded-3xl bg-red-500 p-8 text-white shadow-xl">

                    <h3 className="text-xl">

                        ❤️ Đã lưu

                    </h3>

                    <p className="mt-5 text-5xl font-bold">

                        {dashboard.favorites}

                    </p>

                </div>

            </div>

            <div className="mt-14 rounded-3xl bg-white p-10 shadow-xl">

                <h2 className="mb-8 text-3xl font-bold">

                    Mẹo mới nhất

                </h2>

                <table className="w-full">

                    <thead>

                        <tr className="border-b">

                            <th className="py-4 text-left">

                                Tiêu đề

                            </th>

                            <th className="py-4 text-left">

                                Danh mục

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {dashboard.latestTips.map((tip: any) => (

                            <tr
                                key={tip.id}
                                className="border-b hover:bg-gray-50"
                            >

                                <td className="py-4">

                                    {tip.title}

                                </td>

                                <td>

                                    {tip.category}

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </section>

    );

}

export default AdminDashboard;