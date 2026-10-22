import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { type Product } from "./welcome"; // بحروف صغيرة حسب اسم الملف welcome.tsx
// استيراد واجهة المنتج لتأمين الأنواع برمجياً

const Details = () => {
    // استخراج الـ id من الرابط (يأتي دائماً كـ string)
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        // جلب بيانات المنتج المحدد فقط عبر الـ id الخاص به
        axios
            .get(`https://dummyjson.com{id}`)
            .then((response) => {
                setProduct(response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError("فشل في تحميل تفاصيل المنتج.");
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen font-bold text-fuchsia-500">
                جاري تحميل تفاصيل المنتج...
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-4 font-bold text-red-500">
                <p>{error || "المنتج غير موجود."}</p>
                <button
                    onClick={() => navigate(-1)}
                    className="bg-fuchsia-500 text-white px-4 py-2 rounded-xl text-sm"
                >
                    العودة للخلف
                </button>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-fuchsia-100">

                {/* زر العودة */}
                <div className="p-4 border-b border-gray-100">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-1 text-fuchsia-600 hover:text-fuchsia-700 font-bold transition-colors"
                    >
                        ← العودة إلى المنتجات
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                    {/* قسم صور المنتج */}
                    <div className="flex flex-col gap-4 items-center">
                        <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="w-full max-w-[350px] h-auto object-cover rounded-2xl border border-fuchsia-200 p-2 shadow-sm"
                        />
                    </div>

                    {/* قسم البيانات النصية */}
                    <div className="flex flex-col justify-between gap-6">
                        <div className="flex flex-col gap-3">
                            <span className="bg-fuchsia-100 text-fuchsia-800 text-xs font-semibold px-3 py-1 rounded-full w-fit">
                                {product.category}
                            </span>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.title}</h1>
                            <p className="text-gray-600 leading-relaxed text-sm md:text-base">{product.description}</p>
                        </div>

                        {/* تفاصيل السعر والشحن */}
                        <div className="bg-fuchsia-50/50 p-4 rounded-2xl flex flex-col gap-2 border border-fuchsia-100/50">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 font-medium">السعر:</span>
                                <span className="text-2xl font-bold text-fuchsia-700">{product.price}\$</span>
                            </div>
                            <div className="flex justify-between items-center text-xs md:text-sm text-gray-600">
                                <span>معلومات الشحن:</span>
                                <span className="font-semibold">{product.shippingInformation}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs md:text-sm text-gray-600">
                                <span>الضمان:</span>
                                <span className="font-semibold text-emerald-600">{product.warrantyInformation}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs md:text-sm text-gray-600">
                                <span>حالة التوفر:</span>
                                <span className={`font-bold ${product.stock > 0 ? "text-emerald-600" : "text-red-500"}`}>
                                    {product.availabilityStatus} ({product.stock} قطة متوفرة)
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* قسم تقييمات ومراجعات المستخدمين */}
                <div className="border-t border-gray-100 p-8 bg-gray-50/30">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">آراء ومراجعات العملاء</h2>
                    <div className="flex flex-col gap-4">
                        {product.reviews.map((review, index) => (
                            <div key={index} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-1">
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-gray-800 text-sm">{review.reviewerName}</span>
                                    <span className="text-yellow-500 font-bold">★ {review.rating}/5</span>
                                </div>
                                <p className="text-gray-600 text-sm mt-1">{review.comment}</p>
                                <span className="text-[10px] text-gray-400 self-end">
                                    {new Date(review.date).toLocaleDateString("ar-EG")}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </main>
    );
};

export default Details;
