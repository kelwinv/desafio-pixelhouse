import { Button } from "@/components/ui/button";
import { Link, ArrowLeft, BarChart3 } from "lucide-react";

const ReportHeader = () => {
  return (
    <div className="bg-gradient-to-r from-primary-900 via-primary-800 to-primary-700 shadow-2xl">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="text-white">
            <div className="flex items-center gap-4 mb-4">
              <Link href="/">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10 -ml-2"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>
              </Link>
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                <BarChart3 className="w-8 h-8" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
                Relatórios
              </h1>
            </div>
            <p className="text-primary-100 text-lg max-w-2xl leading-relaxed">
              Análise detalhada da sua lista de presentes com estatísticas,
              tendências e insights valiosos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ReportHeader };
