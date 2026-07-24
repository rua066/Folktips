import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  getTipById,
  updateTip,
} from "../services/tipService";

function EditTip() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [title, setTitle] = useState("");

    const [content, setContent] = useState("");

    const [categoryId, setCategoryId] = useState(9);

    useEffect(() => {

        if (!id) return;

        loadTip();

    }, [id]);

    const loadTip = async () => {

        try {

            const tip = await getTipById(Number(id));

            setTitle(tip.title);

            setContent(tip.description);

            setCategoryId(tip.category_id);

        } catch (error) {

            console.error(error);

        }

    };

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        try {

            await updateTip(Number(id), {

                title,

                content,

                category_id: categoryId,

            });

            toast.success("Cập nhật thành công!");

            navigate("/");

        } catch (error) {

            console.error(error);

            toast.error("Có lỗi xảy ra!");

        }

    };

    return (

        <div className="mx-auto mt-10 max-w-xl">

            <h1 className="mb-6 text-3xl font-bold">
                Sửa mẹo
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >

                <input
                    className="w-full rounded border p-3"
                    placeholder="Tiêu đề"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    className="w-full rounded border p-3"
                    rows={6}
                    placeholder="Nội dung"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <select
                    className="w-full rounded border p-3"
                    value={categoryId}
                    onChange={(e) => setCategoryId(Number(e.target.value))}
                >
                    <option value={9}>Sức khỏe</option>
                    <option value={10}>Nhà bếp</option>
                    <option value={11}>Làm vườn</option>
                    <option value={12}>Gia đình</option>
                </select>

                <button
                    type="submit"
                    className="rounded bg-yellow-600 px-5 py-2 text-white hover:bg-yellow-700"
                >
                    Lưu thay đổi
                </button>

            </form>

        </div>

    );

}

export default EditTip;