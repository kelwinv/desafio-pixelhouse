import { typeGift } from "@/app/type/gift";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";

const ReportHighlights = ({ gifts }: { gifts: typeGift[] }) => {
  const mostExpensive = gifts.reduce(
    (max, gift) => (gift.basePrice > max.basePrice ? gift : max),
    gifts[0] || { basePrice: 0 }
  );
  const cheapest = gifts.reduce(
    (min, gift) => (gift.basePrice < min.basePrice ? gift : min),
    gifts[0] || { basePrice: 0 }
  );

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
      <Card className="border-0 shadow-xl bg-gradient-to-br from-green-50 to-green-100">
        <CardHeader>
          <CardTitle className="text-green-800">
            🏆 Presente Mais Caro
          </CardTitle>
        </CardHeader>
        <CardContent>
          {mostExpensive && (
            <div className="flex items-center gap-4">
              <Image
                height={24}
                width={24}
                src={mostExpensive.imageUrl || "/placeholder.svg"}
                alt={mostExpensive.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <h3 className="font-bold text-green-900">
                  {mostExpensive.title}
                </h3>
                <p className="text-2xl font-bold text-green-700">
                  {formatPrice(mostExpensive.basePrice)}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-blue-100">
        <CardHeader>
          <CardTitle className="text-blue-800">
            💰 Presente Mais Econômico
          </CardTitle>
        </CardHeader>
        <CardContent>
          {cheapest && (
            <div className="flex items-center gap-4">
              <Image
                height={24}
                width={24}
                src={cheapest.imageUrl || "/placeholder.svg"}
                alt={cheapest.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <h3 className="font-bold text-blue-900">{cheapest.title}</h3>
                <p className="text-2xl font-bold text-blue-700">
                  {formatPrice(cheapest.basePrice)}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export { ReportHighlights };
