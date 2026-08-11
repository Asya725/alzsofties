import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Download,
  Upload,
  CheckCircle,
  AlertCircle,
  ChevronLeft,
  Circle,
  CheckCircle2,
  ArrowRight,
  X,
  Package,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useOrder } from "../context/OrderContext";

// --- LOCAL ASSETS ---
import abaQr from "../assets/qrcode/aba-qr copy.png";
import acledaQr from "../assets/qrcode/acleda-qr copy.JPG";
import abaLogo from "../assets/logo/aba-logo copy.png";
import acledaLogo from "../assets/logo/logo-acleda copy.jpg";

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart, cartSubtotal } = useCart();
  const { addOrder } = useOrder();

  const [uploadedFile, setUploadedFile] = useState(null);
  const [error, setError] = useState("");
  const [placedOrderId, setPlacedOrderId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("aba");

  const fileInputRef = useRef(null);

  // Currency Conversion (USD to KHR)
  const totalRielRaw = (cartSubtotal || 0) * 4000;
  const totalRiel = totalRielRaw.toLocaleString();

  const qrCodes = {
    aba: abaQr,
    acleda: acledaQr,
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please upload an image file (JPEG/PNG).");
        return;
      }
      setUploadedFile(file);
      setError("");
    }
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    setUploadedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handlePlaceOrder = () => {
    if (!uploadedFile) {
      setError("Please upload your payment receipt to proceed.");
      return;
    }

    // Generate Unique Order ID
    const generatedId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

    // Save Order via Order Context
    if (addOrder) {
      addOrder({
        id: generatedId,
        items: [...cart],
        totalUSD: cartSubtotal || 0,
        totalKHR: totalRielRaw,
        paymentMethod: paymentMethod.toUpperCase(),
        receiptName: uploadedFile.name,
        date: new Date().toISOString(),
        status: "Pending Review",
      });
    }

    setPlacedOrderId(generatedId);

    // Clear bag after order creation
    if (clearCart) clearCart();
  };

  // SUCCESS SCREEN
  if (placedOrderId) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] dark:bg-gray-950 flex flex-col items-center justify-center p-5 font-['Poppins',sans-serif] transition-colors duration-300">
        <div className="max-w-md w-full bg-white dark:bg-[#111111] rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-8 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-6">
            <CheckCircle
              size={36}
              className="text-green-600 dark:text-green-500"
              strokeWidth={2}
            />
          </div>

          <span className="text-xs font-bold tracking-widest text-[#e30039] uppercase bg-rose-50 dark:bg-rose-900/20 px-3 py-1 rounded-full mb-3">
            {placedOrderId}
          </span>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
            Order Submitted
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
            Your receipt is under review by our team. You can track the status
            of your purchase inside your profile.
          </p>

          <div className="flex flex-col w-full gap-3">
            <button
              onClick={() => navigate("/my-orders")}
              className="w-full bg-[#0a0a0a] dark:bg-white text-white dark:text-[#0a0a0a] hover:bg-black dark:hover:bg-gray-100 font-bold py-3.5 rounded-xl transition-all text-sm tracking-wide flex justify-center items-center gap-2"
            >
              <Package size={18} /> View My Orders
            </button>

            <button
              onClick={() => navigate("/")}
              className="w-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 font-semibold py-3.5 rounded-xl transition-colors text-sm"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  // EMPTY CART FALLBACK
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] dark:bg-gray-950 flex flex-col items-center justify-center p-5 font-['Poppins',sans-serif]">
        <p className="text-gray-500 dark:text-gray-400 mb-4 text-base">
          Your bag is empty.
        </p>
        <button
          onClick={() => navigate("/")}
          className="text-gray-900 dark:text-white font-semibold hover:underline text-base"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  // CHECKOUT SCREEN
  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-[#050505] pb-24 font-['Poppins',sans-serif] transition-colors duration-300">
      {/* HEADER */}
      <header className="max-w-5xl mx-auto px-5 pt-8 pb-8 flex items-center justify-between mb-2">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
        >
          <ChevronLeft size={20} strokeWidth={2} /> Back
        </button>
        <h1 className="text-lg font-bold text-gray-900 dark:text-white tracking-wide">
          Secure Checkout
        </h1>
        <div className="w-20"></div>
      </header>

      <main className="max-w-5xl mx-auto px-5 grid md:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16">
        {/* LEFT COLUMN: PAYMENT FLOW */}
        <div className="flex flex-col gap-10">
          {/* STEP 1: BANK SELECTION */}
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
              1. Payment Method
            </h2>
            <div className="flex flex-col gap-4">
              {/* ABA */}
              <button
                onClick={() => setPaymentMethod("aba")}
                className={`w-full rounded-xl p-5 flex items-center justify-between transition-all duration-200 text-left bg-white dark:bg-[#111111] ${
                  paymentMethod === "aba"
                    ? "border-2 border-[#e30039] shadow-md"
                    : "border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-[#00234b] rounded-lg shadow-sm flex items-center justify-center p-2 shrink-0 overflow-hidden">
                    <img
                      src={abaLogo}
                      alt="ABA Bank"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-gray-900 dark:text-white">
                      ABA Bank Transfer
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                      Scan KHQR in ABA Mobile
                    </p>
                  </div>
                </div>
                {paymentMethod === "aba" ? (
                  <CheckCircle2
                    className="text-[#e30039] shrink-0"
                    size={24}
                    strokeWidth={2}
                  />
                ) : (
                  <Circle
                    className="text-gray-300 dark:text-gray-700 shrink-0"
                    size={24}
                    strokeWidth={1.5}
                  />
                )}
              </button>

              {/* ACLEDA */}
              <button
                onClick={() => setPaymentMethod("acleda")}
                className={`w-full rounded-xl p-5 flex items-center justify-between transition-all duration-200 text-left bg-white dark:bg-[#111111] ${
                  paymentMethod === "acleda"
                    ? "border-2 border-[#e30039] shadow-md"
                    : "border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white rounded-lg shadow-sm border border-gray-100 flex items-center justify-center p-2 shrink-0 overflow-hidden">
                    <img
                      src={acledaLogo}
                      alt="Acleda Bank"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-gray-900 dark:text-white">
                      Acleda Bank Transfer
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                      Scan KHQR in Acleda Mobile
                    </p>
                  </div>
                </div>
                {paymentMethod === "acleda" ? (
                  <CheckCircle2
                    className="text-[#e30039] shrink-0"
                    size={24}
                    strokeWidth={2}
                  />
                ) : (
                  <Circle
                    className="text-gray-300 dark:text-gray-700 shrink-0"
                    size={24}
                    strokeWidth={1.5}
                  />
                )}
              </button>
            </div>
          </section>

          {/* STEP 2: QR & UPLOAD */}
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
              2. Scan & Upload
            </h2>

            <div className="bg-white dark:bg-[#111111] border border-gray-100 dark:border-gray-800 rounded-2xl p-6 sm:p-10 flex flex-col items-center shadow-sm">
              <div className="w-full max-w-[280px] mx-auto mb-6 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <img
                  src={qrCodes[paymentMethod]}
                  alt={`${paymentMethod.toUpperCase()} KHQR`}
                  className="w-full h-auto object-contain block"
                />
              </div>

              <a
                href={qrCodes[paymentMethod]}
                download={`${paymentMethod}-khqr.jpg`}
                className="flex items-center justify-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors py-3.5 px-6 border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm w-full max-w-[280px] mb-8"
              >
                <Download size={18} strokeWidth={1.5} /> Save QR Code
              </a>

              <div className="w-full max-w-[280px]">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/jpeg, image/png, image/jpg"
                  className="hidden"
                />

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition-all relative overflow-hidden min-h-[160px] ${
                    error
                      ? "border-red-400 bg-red-50/50 dark:border-red-900/30 dark:bg-red-900/10"
                      : "border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  }`}
                >
                  {uploadedFile ? (
                    <div className="flex flex-col items-center text-center w-full">
                      {/* Image Thumbnail Preview */}
                      <div className="relative w-24 h-24 mb-2 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">
                        <img
                          src={URL.createObjectURL(uploadedFile)}
                          alt="Receipt Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={handleRemoveFile}
                          className="absolute top-1 right-1 bg-black/60 hover:bg-black text-white p-1 rounded-full backdrop-blur-sm transition-colors"
                        >
                          <X size={12} />
                        </button>
                      </div>
                      <p className="text-xs font-semibold text-gray-900 dark:text-white truncate max-w-[220px]">
                        {uploadedFile.name}
                      </p>
                      <p className="text-xs text-green-600 dark:text-green-500 mt-0.5 font-medium flex items-center gap-1">
                        <CheckCircle2 size={12} /> Receipt Attached
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-center py-6">
                      <Upload
                        size={28}
                        strokeWidth={1.5}
                        className="text-gray-400 dark:text-gray-500 mb-3"
                      />
                      <p className="text-base font-medium text-gray-900 dark:text-white">
                        Upload Receipt
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1.5 uppercase tracking-wider">
                        JPEG or PNG
                      </p>
                    </div>
                  )}
                </div>

                {error && (
                  <p className="mt-4 flex items-center justify-center gap-1.5 text-red-600 dark:text-red-400 text-sm font-medium">
                    <AlertCircle size={16} /> {error}
                  </p>
                )}
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: ORDER SUMMARY */}
        <div className="relative mt-4 md:mt-0">
          <div className="md:sticky md:top-8 bg-white dark:bg-[#111111] p-6 sm:p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-white mb-6">
              Order Summary
            </h2>

            <div className="flex flex-col gap-6 mb-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
              {cart.map((item) => (
                <div key={item.key} className="flex gap-4">
                  <div className="w-[72px] h-[90px] shrink-0 bg-gray-50 dark:bg-gray-800 rounded-md overflow-hidden border border-gray-100 dark:border-gray-800/50">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col flex-1 py-1">
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-base font-medium text-gray-900 dark:text-white leading-tight line-clamp-2">
                        {item.name}
                      </span>
                      <span className="text-base font-medium text-gray-900 dark:text-white">
                        ${(item.price * (item.qty || 1)).toFixed(2)}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400 mt-1 block">
                      Size: {item.size}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 mt-2 block">
                      Qty: {item.qty}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* TOTALS SECTION */}
            <div className="pt-6 border-t border-gray-100 dark:border-gray-800/80 mb-6 flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Subtotal (USD)
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  ${(cartSubtotal || 0).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Subtotal (KHR)
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  ៛{totalRiel}
                </span>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 dark:border-gray-800/80 mb-8 flex justify-between items-center">
              <span className="text-base font-bold tracking-widest text-gray-900 dark:text-white uppercase">
                Total
              </span>
              <span className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                ${(cartSubtotal || 0).toFixed(2)}
              </span>
            </div>

            {/* PLACE ORDER BUTTON */}
            <button
              onClick={handlePlaceOrder}
              className="w-full bg-[#0a0a0a] dark:bg-white text-white dark:text-[#0a0a0a] hover:bg-black dark:hover:bg-gray-100 font-bold py-4 rounded-xl transition-all active:scale-[0.98] text-sm tracking-widest uppercase shadow-sm flex justify-center items-center gap-2"
            >
              Place Order <ArrowRight size={16} strokeWidth={2} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
