import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Gift, Plus } from "lucide-react";

const EmptyState = ({ openAddDialog }: { openAddDialog: () => void }) => {
  return (
    <Card className="text-center py-16 shadow-xl bg-white/80 backdrop-blur-sm">
      <CardContent className="space-y-6">
        <div className="mx-auto w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
          <Gift className="w-12 h-12 text-blue-600" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-blue-900 mb-2">
            Nenhum presente cadastrado
          </h3>
          <p className="text-blue-600 text-lg mb-6">
            Comece criando seu primeiro presente na lista
          </p>
        </div>
        <Button
          onClick={openAddDialog}
          size="lg"
          className="bg-blue-700 hover:bg-blue-800 shadow-lg hover:shadow-xl"
        >
          <Plus className="w-5 h-5 mr-2" />
          Adicionar Primeiro Presente
        </Button>
      </CardContent>
    </Card>
  );
};

export { EmptyState };
