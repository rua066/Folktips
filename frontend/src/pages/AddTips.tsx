import { useState } from "react";
import { createTip } from "../services/tipService";
import { toast } from "react-toastify";

function AddTip() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [categoryId, setCategoryId] = useState(9);

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        try {

            await createTip({
                title,
                content,
                category_id: categoryId,
            });

            toast.success("Thêm mẹo thành công!");

            setTitle("");
            setContent("");
            setCategoryId(9);

        } catch (error) {

            console.error(error);
            toast.error("Có lỗi xảy ra!");

        }

    };

    return (

        <div className="mx-auto mt-10 max-w-xl">

            <h1 className="mb-6 text-3xl font-bold">
                Thêm mẹo
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
                    placeholder="Nội dung"
                    rows={6}
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
                    className="rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
                >
                    Thêm mẹo
                </button>

            </form>

        </div>

    );

}

export default AddTip;