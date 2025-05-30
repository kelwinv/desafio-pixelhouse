import { typeGift } from "@/app/type/gift";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { Progress } from "@radix-ui/react-progress";
import { PieChart } from "lucide-react";

const ReportPriceRange = ({ gifts }: { gifts: typeGift[] }) => {
  const priceRanges = {
    budget: gifts.filter((gift) => gift.basePrice <= 500),
    medium: gifts.filter(
      (gift) => gift.basePrice > 500 && gift.basePrice <= 1500
    ),
    premium: gifts.filter((gift) => gift.basePrice > 1500),
  };
  return (
    <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary-900">
          <PieChart className="w-5 h-5" />
          Distribuição por Faixa de Preço
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-primary-700">
              Econômico (até R$ 500)
            </span>
            <Badge variant="secondary">{priceRanges.budget.length} itens</Badge>
          </div>
          <Progress
            value={(priceRanges.budget.length / gifts.length) * 100}
            className="h-3"
          />
          <p className="text-xs text-primary-600 mt-1">
            {formatPrice(
              priceRanges.budget.reduce((sum, gift) => sum + gift.basePrice, 0)
            )}
          </p>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-primary-700">
              Intermediário (R$ 501 - R$ 1.500)
            </span>
            <Badge variant="secondary">{priceRanges.medium.length} itens</Badge>
          </div>
          <Progress
            value={(priceRanges.medium.length / gifts.length) * 100}
            className="h-3"
          />
          <p className="text-xs text-primary-600 mt-1">
            {formatPrice(
              priceRanges.medium.reduce((sum, gift) => sum + gift.basePrice, 0)
            )}
          </p>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-primary-700">
              Premium (acima de R$ 1.500)
            </span>
            <Badge variant="secondary">
              {priceRanges.premium.length} itens
            </Badge>
          </div>
          <Progress
            value={(priceRanges.premium.length / gifts.length) * 100}
            className="h-3"
          />
          <p className="text-xs text-primary-600 mt-1">
            {formatPrice(
              priceRanges.premium.reduce((sum, gift) => sum + gift.basePrice, 0)
            )}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export { ReportPriceRange };
