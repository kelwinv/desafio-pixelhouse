"use client";

import { GiftForm } from "@/components/layout/form/gift-form";
import { HomeHeader } from "../components/layout/home/header";
import { useEffect, useState } from "react";
import { GiftsList } from "@/components/layout/home/GiftsList";
import { useGifts } from "./hooks/useGifts";
import { typeGift } from "./type/gift";
import { toast } from "sonner";

export default function Home() {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    basePrice: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [gifts, setGifts] = useState<typeGift[]>([]);
  const { getAllGifts, deleteGift } = useGifts();

  const openAddDialog = () => {
    setFormData({
      title: "",
      image: "",
      description: "",
      basePrice: "",
    });
    setIsDialogOpen(true);
  };

  const handleDeleteGift = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir este presente?")) {
      try {
        await deleteGift(id);
        setGifts((oldGifts) => oldGifts.filter((gift) => gift.id !== id));
        toast.info("Presente Deletado com sucesso");
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "Erro desconhecido";
        toast.error("Erro ao deletar presente", {
          description: errorMessage,
        });
      }
    }
  };

  useEffect(() => {
    const fetchGifts = async () => {
      const gifts = await getAllGifts();
      console.log(gifts);

      setGifts(gifts);
      setTotalPrice(gifts.reduce((acc, gift) => acc + gift.basePrice, 0));
    };
    fetchGifts();
  }, [getAllGifts]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <HomeHeader
        openAddDialog={openAddDialog}
        totalPrice={totalPrice}
        giftsQuantity={gifts.length}
      />
      <GiftsList
        gifts={gifts}
        openAddDialog={openAddDialog}
        onDelete={handleDeleteGift}
        onEdit={() => {}}
        onViewDetails={() => {}}
      />

      <GiftForm
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={(newGift) => {
          setIsDialogOpen(false);
          setGifts((oldState) => [...oldState, newGift]);
        }}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
}
