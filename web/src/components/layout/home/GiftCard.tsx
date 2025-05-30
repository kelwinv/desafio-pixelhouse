import { typeGift } from "@/app/type/gift";
import { formatPrice } from "@/app/utils/formatPrice";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar, Edit, Trash2 } from "lucide-react";
import { DateTime } from "luxon";
import Image from "next/image";

type GiftsListProps = {
  gift: typeGift;
  onEdit: (gift: typeGift) => void;
  onDelete: (giftId: string) => void;
  onViewDetails: (gift: typeGift) => void;
};

const GiftCard = ({
  gift,
  onEdit,
  onDelete,
  onViewDetails,
}: GiftsListProps) => {
  return (
    <Card className="group overflow-hidden border-0 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/90 backdrop-blur-sm animate-fade-in">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={
            gift.imageUrl || "https://via.placeholder.com/300x300?text=Presente"
          }
          width={250}
          height={250}
          alt={gift.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Badge className="absolute top-4 right-4 bg-blue-700 text-white shadow-lg">
          {formatPrice(gift.basePrice)}
        </Badge>
      </div>

      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-blue-900 group-hover:text-blue-700 transition-colors duration-300">
          {gift.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-0 space-y-4">
        <p className="text-blue-700 leading-relaxed line-clamp-3">
          {gift.description}
        </p>

        <div className="flex items-center gap-2 text-sm text-blue-500">
          <Calendar className="w-4 h-4" />
          <span>
            Criado em {DateTime.fromISO(gift.createdAt).toFormat("dd MM yyyy")}
          </span>
        </div>

        <div className="space-y-2">
          <Button
            onClick={() => onViewDetails(gift)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl"
          >
            Ver Detalhes
          </Button>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(gift)}
              className="flex-1 border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-500"
            >
              <Edit className="w-4 h-4 mr-2" />
              Editar
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(gift.id)}
              className="flex-1 shadow-lg hover:shadow-xl"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Excluir
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { GiftCard };
