import { useEffect, useState } from "react";
import axios from "axios";
// استخدام المكتبة الصحيحة لبيئة الويب واستيراد خطاف التنقل
import { useNavigate } from "react-router-dom"; 

// --- الواجهات (Interfaces) ---
export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface ProductMeta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: ProductMeta;
  images: string[];
  thumbnail: string;
}

interface IDataProp {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

// --- المكون الرئيسي للملف ---
export function Welcome() {
  const [data, setData] = useState<IDataProp>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen font-bold text-fuchsia-500">
        جاري تحميل المنتجات...
      </div>
    );
  }

  if (!data?.products || data.products.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen font-bold text-red-500">
        لا توجد منتجات لعرضها.
      </div>
    );
  }

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0 w-full">
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 w-full" dir="rtl">
          {data.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      </div>
    </main>
  );
}

// --- مكوّن بطاقة المنتج المستقل ---
function ProductCard({ product }: { product: Product }) {
  const [imageShow, setImageShow] = useState<string>(product.thumbnail);
  // استدعاء دالة التنقل البرمجية بشكل صحيح
  const navigate = useNavigate(); 

  return (
    <li className="border border-fuchsia-300 rounded-2xl p-3 transition-all duration-400 hover:shadow-lg hover:shadow-fuchsia-500 max-w-[500px] flex flex-col justify-between">
      <div className="flex flex-col gap-2">
        {/* الصورة الرئيسية للمنتج */}
        <img
          src={imageShow}
          alt={product.title}
          className="object-cover max-w-[200px] max-h-[200px] mx-auto rounded-lg"
        />

        {/* العنوان والسعر */}
        <p className="border-t border-fuchsia-200 pt-2 font-bold text-sm md:text-lg lg:text-xl line-clamp-1">
          {product.title}
        </p>
        <p className="flex w-full justify-end font-semibold text-fuchsia-700">
          {product.price}\$
        </p>

        {/* شريط الصور المصغرة */}
        <div className="flex flex-row items-center overflow-x-auto gap-2 p-2 w-full border-t border-fuchsia-200 py-3">
          {product.images.map((imgUrl, index) => (
            <button
              type="button"
              onClick={() => setImageShow(imgUrl)}
              className={`max-w-24 max-h-24 p-0.5 rounded-xl transition-all ${imageShow === imgUrl
                  ? "outline outline-2 outline-fuchsia-500"
                  : "outline outline-1 outline-fuchsia-500/60 hover:opacity-80"
                }`}
              key={`${product.id}-img-${index}`}
            >
              <img
                src={imgUrl}
                alt={`صورة ${index + 1}`}
                className="object-cover size-10 rounded-lg"
              />
            </button>
          ))}
        </div>
      </div>

      {/* زر التفاصيل بعد التعديل البرمجي الصحيح */}
      <button
        type="button"
        className="w-full bg-fuchsia-500 hover:bg-fuchsia-600 transition-colors p-2 rounded-xl text-sm font-bold text-white text-center mt-3"
        // الانتقال إلى رابط تفاصيل المنتج ممرراً معرّف المنتج الفريد (ID) الديناميكي
        onClick={() => navigate(`/app/welcome/details/${product.id}`)}
      >
        التفاصيل
      </button>
    </li>
  );
}
