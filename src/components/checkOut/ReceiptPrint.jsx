import React from "react";

const ReceiptPrint = ({ cash, change, product, total }) => {
  return (
    <div id="receipt-print-container" className="w-[80mm] bg-white p-3 text-sm font-sans">
      <div className="text-center mb-3">
        <h1 className="text-lg font-bold">Cafe shop</h1>
        <p className="text-xs">ที่อยู่: 123 ถนน ABC, กรุงเทพมหานคร</p>
        <p className="text-xs">เบอร์โทรศัพท์: 083-97810</p>
      </div>

      <div className="mb-4">
        <p className="font-semibold">รายการ:</p>
        {product.map((item) => (
          <div className="flex justify-between text-sm py-1 border-b" key={item.pd_name}>
            <span>{item.pd_name} × {item.count}</span>
            <span>{item.price * item.count} บาท</span>
          </div>
        ))}
      </div>

      <div className="border-t-2 pt-2 mt-4">
        <div className="flex justify-between font-semibold py-1">
          <span>รวม:</span>
          <span>{total} บาท</span>
        </div>
        <div className="flex justify-between font-semibold py-1">
          <span>ชำระเงิน:</span>
          <span>{cash} บาท</span>
        </div>
        <div className="flex justify-between font-semibold py-1">
          <span>ทอน:</span>
          <span>{change} บาท</span>
        </div>
      </div>

      <div className="text-center mt-4 text-xs text-gray-600">
        <p>ขอบคุณที่ใช้บริการ!</p>
      </div>
    </div>
  );
};

export default ReceiptPrint;
