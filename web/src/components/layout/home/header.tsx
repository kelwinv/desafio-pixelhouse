import { BarChart3, DollarSign, Gift, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/utils";

type HomeHeaderProps = {
  giftsQuantity?: number;
  totalPrice?: number;
  openAddDialog?: () => void;
};

function HomeHeader({
  giftsQuantity = 0,
  totalPrice = 0,
  openAddDialog,
}: HomeHeaderProps) {
  const router = useRouter();

  const handleReportClick = () => {
    router.push("/reports");
  };

  return (
    <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 shadow-2xl">
      <div className="container mx-auto px-6 py-12">
        <main className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <section className="text-white">
            <div className="flex items-center gap-3 mb-4">
              <i className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                <Gift className="w-8 h-8" />
              </i>
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
                Lista de Presentes
              </h1>
            </div>
            <p className="text-blue-100 text-lg max-w-2xl leading-relaxed">
              Gerencie sua lista de presentes com uma interface moderna e
              intuitiva. Organize, edite e acompanhe todos os seus presentes em
              um só lugar.
            </p>
            <div className="flex items-center gap-6 mt-6">
              <div className="flex items-center gap-2 text-blue-200">
                <DollarSign className="w-5 h-5" />
                <span className="font-medium">
                  Total: {formatPrice(totalPrice)}
                </span>
              </div>
              <div className="flex items-center gap-2 text-blue-200">
                <Gift className="w-5 h-5" />
                <span className="font-medium">
                  {giftsQuantity}{" "}
                  {giftsQuantity === 1 ? "presente" : "presentes"}
                </span>
              </div>
            </div>
          </section>
          <section className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={handleReportClick}
              size="lg"
              variant="outline"
              className="bg-white/10 text-white cursor-pointer border-white/20 hover:bg-white/20 shadow-xl hover:shadow-2xl backdrop-blur-sm"
            >
              <BarChart3 className="w-5 h-5 mr-2" />
              Ver Relatórios
            </Button>

            <Button
              onClick={openAddDialog}
              size="lg"
              className="bg-white text-blue-900 cursor-pointer hover:bg-blue-50 shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              <Plus className="w-5 h-5 mr-2" />
              Adicionar Presente
            </Button>
          </section>
        </main>
      </div>
    </header>
  );
}

export { HomeHeader };
