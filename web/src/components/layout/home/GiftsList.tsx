"use client";

import { typeGift } from "@/app/type/gift";
import { EmptyState } from "./EmptyState";
import { GiftCard } from "./GiftCard";

type GiftsListProps = {
  gifts: typeGift[];
  onEdit: (gift: typeGift) => void;
  onDelete: (giftId: string) => void;
  onViewDetails: (gift: typeGift) => void;
  openAddDialog: () => void;
};

function GiftsList({
  gifts,
  openAddDialog,
  onEdit,
  onDelete,
  onViewDetails,
}: GiftsListProps) {
  return (
    <div className="container mx-auto px-6 py-12">
      {gifts.length === 0 ? (
        <EmptyState openAddDialog={openAddDialog} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {gifts.map((gift) => (
            <GiftCard
              key={gift.id}
              gift={gift}
              onEdit={onEdit}
              onDelete={onDelete}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export { GiftsList };
