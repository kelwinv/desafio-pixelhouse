import { typeGift } from "@/app/type/gift";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatPrice, formatDate } from "@/lib/utils";
import Image from "next/image";

const ReportTable = ({ gifts }: { gifts: typeGift[] }) => {
  return (
    <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-primary-900">
          📋 Lista Completa de Presentes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-primary-200">
                <th className="text-left py-3 px-4 font-semibold text-primary-800">
                  Presente
                </th>
                <th className="text-left py-3 px-4 font-semibold text-primary-800">
                  Preço
                </th>
                <th className="text-left py-3 px-4 font-semibold text-primary-800">
                  Data
                </th>
                <th className="text-left py-3 px-4 font-semibold text-primary-800">
                  Categoria
                </th>
              </tr>
            </thead>
            <tbody>
              {gifts.map((gift) => (
                <tr
                  key={gift.id}
                  className="border-b border-primary-100 hover:bg-primary-50 transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <Image
                        height={24}
                        width={24}
                        src={gift.imageUrl || "/placeholder.svg"}
                        alt={gift.title}
                        className="w-10 h-10 rounded object-cover"
                      />
                      <div>
                        <p className="font-medium text-primary-900">
                          {gift.title}
                        </p>
                        <p className="text-sm text-primary-600 truncate max-w-xs">
                          {gift.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-semibold text-primary-800">
                    {formatPrice(gift.basePrice)}
                  </td>
                  <td className="py-3 px-4 text-primary-700">
                    {formatDate(gift.createdAt)}
                  </td>
                  <td className="py-3 px-4">
                    <Badge
                      variant={
                        gift.basePrice <= 500
                          ? "secondary"
                          : gift.basePrice <= 1500
                          ? "default"
                          : "destructive"
                      }
                    >
                      {gift.basePrice <= 500
                        ? "Econômico"
                        : gift.basePrice <= 1500
                        ? "Intermediário"
                        : "Premium"}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export { ReportTable };
