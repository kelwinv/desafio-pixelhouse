"use client";

import { useState, useEffect } from "react";
import { useGifts } from "../hooks/useGifts";
import { typeGift } from "../type/gift";
import { ReportHeader } from "@/components/layout/report/header";
import { ReportStatistics } from "@/components/layout/report/statistics";
import { ReportPriceRange } from "@/components/layout/report/priceRange";
import { ReportBySeason } from "@/components/layout/report/bySeason";
import { ReportHighlights } from "@/components/layout/report/highlights";
import { ReportTable } from "@/components/layout/report/table";

export default function Report() {
  const [gifts, setGifts] = useState<typeGift[]>([]);
  const { getAllGifts } = useGifts();

  useEffect(() => {
    const fetchGifts = async () => {
      const gifts = await getAllGifts();

      setGifts(gifts);
    };
    fetchGifts();
  }, [getAllGifts]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100">
      <ReportHeader />

      {gifts.length > 0 ? (
        <main className="container mx-auto px-6 py-12">
          <ReportStatistics gifts={gifts} />

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <ReportPriceRange gifts={gifts} />
            <ReportBySeason gifts={gifts} />
          </section>

          <ReportHighlights gifts={gifts} />
          <ReportTable gifts={gifts} />
        </main>
      ) : (
        <div className="container mx-auto px-6 py-12 flex justify-center items-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
