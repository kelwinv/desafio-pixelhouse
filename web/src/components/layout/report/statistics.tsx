import { typeGift } from "@/app/type/gift";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatPrice, formatDate } from "@/lib/utils";
import { Gift, DollarSign, TrendingUp, Clock } from "lucide-react";

const ReportStatistics = ({ gifts }: { gifts: typeGift[] }) => {
  const totalValue = gifts.reduce((sum, gift) => sum + gift.basePrice, 0);

  const averagePrice = gifts.length > 0 ? totalValue / gifts.length : 0;

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-primary-600">
              Total de Presentes
            </CardTitle>
            <Gift className="w-5 h-5 text-primary-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-primary-900">
            {gifts.length}
          </div>
          <p className="text-sm text-primary-600 mt-1">itens cadastrados</p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-primary-600">
              Valor Total
            </CardTitle>
            <DollarSign className="w-5 h-5 text-primary-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-primary-900">
            {formatPrice(totalValue)}
          </div>
          <p className="text-sm text-primary-600 mt-1">investimento total</p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-primary-600">
              Preço Médio
            </CardTitle>
            <TrendingUp className="w-5 h-5 text-primary-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-primary-900">
            {formatPrice(averagePrice)}
          </div>
          <p className="text-sm text-primary-600 mt-1">por presente</p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-primary-600">
              Último Adicionado
            </CardTitle>
            <Clock className="w-5 h-5 text-primary-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-lg font-bold text-primary-900 truncate">
            {gifts.length > 0 ? gifts[gifts.length - 1].title : "Nenhum"}
          </div>
          <p className="text-sm text-primary-600 mt-1">
            {gifts.length > 0
              ? formatDate(gifts[gifts.length - 1].createdAt)
              : ""}
          </p>
        </CardContent>
      </Card>
    </section>
  );
};

export { ReportStatistics };
