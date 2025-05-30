import { typeGift } from "@/app/type/gift";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { DateTime } from "luxon";

const ReportBySeason = ({ gifts }: { gifts: typeGift[] }) => {
  const giftsByMonth = gifts.reduce((acc, gift) => {
    const month = DateTime.fromISO(gift.createdAt)
      .setLocale("pt-BR")
      .toFormat("LLLL yyyy");
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary-900">
          <Calendar className="w-5 h-5" />
          Presentes por Período
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.entries(giftsByMonth).map(([month, count]) => (
          <div
            key={month}
            className="flex items-center justify-between p-3 bg-primary-50 rounded-lg"
          >
            <span className="font-medium text-primary-800 capitalize">
              {month}
            </span>
            <Badge className="bg-primary-700">
              {count} {count === 1 ? "presente" : "presentes"}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export { ReportBySeason };
