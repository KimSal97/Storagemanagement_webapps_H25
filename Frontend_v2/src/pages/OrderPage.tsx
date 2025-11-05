"use client";
import React, { useState } from "react";
import type { Result } from "../types/result";
import { navigate } from "rwsdk/client";
import Sidebar from "../components/Dashboard/Sidebar";
import Header from "../components/Dashboard/Header";
import ProductCard from "../components/OrderPage/ProductCard";

const OrderPage = () => {

    return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">
            Bestillinger
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProductCard 
                title="Product Name"
                price={29.99}
                baseStock={100}
                minimumStock={20}
                dailySales={5}
                supplyTimeDays={10}
                Status="good"
            />
            <ProductCard 
                title="Another Product"
                price={49.99}
                baseStock={50}
                minimumStock={15}
                dailySales={8}
                supplyTimeDays={14}
                Status="warning"
            />
            </div>
        </main>
      </div>
    </div>
    );
}
export default OrderPage;