import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function PaymentPage() {
    const location = useLocation();
    const { totalQuantity, totalPrice, redirect } = location.state || {};

    console.log('Số lượng:', totalQuantity);
    console.log('Thành tiền:', totalPrice);
    console.log('Redirect từ:', redirect);

    const momoPhone = "0985627061"; // số MoMo nhận tiền (của bạn)
    const receiverName = "Nguyen Huu Nhat"; // tên hiển thị
    const qrData = `https://nhantien.momo.vn/0985627061/${totalPrice}`;

    return (
        <div className="flex flex-col items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
            {/* Link Back */}
            <div className="w-full max-w-lg mb-6 text-blue-600">
                <Link to={redirect} className="text-lg font-semibold hover:underline">
                    ← Trở về
                </Link>
            </div>

            {/* Payment Info Card */}
            <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg border border-gray-200">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
                    Quét mã để thanh toán
                </h2>

                {/* QR Code */}
                <div className="flex justify-center mb-5">
                    <QRCodeSVG value={qrData} size={200} />
                </div>

                {/* Payment Details */}
                <div className="text-center">
                    <p className="text-sm text-gray-600">Tên người nhận: <strong>{receiverName}</strong></p>
                    <p className="text-sm text-gray-600">SĐT người nhận: <strong>{momoPhone}</strong></p>

                    <p className="mt-5 text-xl text-gray-900 font-semibold">
                        Thành tiền: <span className="text-blue-500">{totalPrice?.toLocaleString()}đ</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
