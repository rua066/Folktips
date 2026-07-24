import {
    FaEnvelope,
    FaIdBadge,
    FaUserShield,
    FaSignOutAlt,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function Profile() {

    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    if (!user) {

        return (

            <div className="mt-32 text-center">

                <h2 className="text-3xl font-bold">

                    Bạn chưa đăng nhập

                </h2>

            </div>

        );

    }

    const logout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        navigate("/login");

    };

    return (

       <div className="min-h-screen bg-slate-100">
            <section className="mx-auto max-w-7xl px-8 py-14">
            <div className="overflow-hidden rounded-[35px] bg-white shadow-2xl">

                {/* Header */}

                <div className="bg-gradient-to-r from-sky-500 to-blue-600 p-12 text-center text-white">

                    <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-full border-8 border-white bg-white text-6xl text-blue-600">

                        {user.full_name[0].toUpperCase()}

                    </div>

                    <h1 className="mt-8 text-4xl font-bold">

                        {user.full_name}

                    </h1>

                    <p className="mt-3 text-lg">

                        {user.email}

                    </p>

                </div>

                {/* Body */}

                <div className="grid gap-6 p-10 md:grid-cols-2">

                    <div className="rounded-3xl bg-gray-50 p-8">

                        <FaEnvelope
                            size={28}
                            className="text-blue-600"
                        />

                        <p className="mt-5 text-gray-500">

                            Email

                        </p>

                        <h2 className="mt-2 text-2xl font-bold">

                            {user.email}

                        </h2>

                    </div>

                    <div className="rounded-3xl bg-gray-50 p-8">

                        <FaIdBadge
                            size={28}
                            className="text-blue-600"
                        />

                        <p className="mt-5 text-gray-500">

                            ID

                        </p>

                        <h2 className="mt-2 text-2xl font-bold">

                            #{user.id}

                        </h2>

                    </div>

                    <div className="rounded-3xl bg-gray-50 p-8">

                        <FaUserShield
                            size={28}
                            className="text-blue-600"
                        />

                        <p className="mt-5 text-gray-500">

                            Vai trò

                        </p>

                        <h2 className="mt-2 text-2xl font-bold capitalize">

                            {user.role}

                        </h2>

                    </div>

                    <div className="flex items-center justify-center">

                        <button
                            onClick={logout}
                            className="
                            flex
                            items-center
                            gap-3
                            rounded-2xl
                            bg-blue-600
                            px-8
                            py-4
                            text-lg
                            font-semibold
                            text-white
                            transition
                            hover:bg-blue-700
                            "
                        >

                            <FaSignOutAlt />

                            Đăng xuất

                        </button>

                    </div>

                </div>

            </div>

        </section>
    </div>
    );

}

export default Profile;