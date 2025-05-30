"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { Gift, Save, X, Loader2 } from "lucide-react";
import { toast, Toaster } from "sonner";
import { useGifts } from "@/app/hooks/useGifts";
import { typeGift as TypeGift } from "@/app/type/gift";

type GiftFormProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (gift: TypeGift) => void;
  formData: {
    title: string;
    image: string;
    description: string;
    basePrice: string;
  };
  setFormData: (data: {
    title: string;
    image: string;
    description: string;
    basePrice: string;
  }) => void;
  editingGift?: boolean;
};

const GiftForm = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  setFormData,
  editingGift,
}: GiftFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const { createGift } = useGifts();

  const handleSubmit = async () => {
    if (!formData.title || !formData.description || !formData.basePrice) {
      toast.warning("Campos obrigatórios", {
        description: "Por favor, preencha todos os campos obrigatórios",
      });
      return;
    }

    setIsLoading(true);

    try {
      const gift = await createGift({
        title: formData.title,
        imageUrl: formData.image,
        description: formData.description,
        basePrice: parseFloat(formData.basePrice),
      });

      toast("Presente adicionado!", {
        description: `${formData.title} foi ${
          editingGift ? "atualizado" : "adicionado"
        } com sucesso.`,
      });

      onSubmit(gift);
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Erro ao salvar", {
          description: error.message,
        });
        return;
      }

      toast.error("Erro ao salvar", {
        description: "Não foi possível salvar o presente. Tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-lg border-0 shadow-2xl">
          <DialogHeader className="p-6">
            <DialogTitle className="text-2xl font-bold text-primary-900 flex items-center gap-3">
              <div className="p-2 bg-primary-100 rounded-lg">
                <Gift className="w-6 h-6 text-primary-700" />
              </div>
              {editingGift ? "Editar Presente" : "Novo Presente"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Nome do presente"
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">URL da Imagem</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                placeholder="https://exemplo.com/imagem.jpg"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Descreva o presente..."
                rows={4}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="basePrice">Preço Base (R$) *</Label>
              <Input
                id="basePrice"
                type="number"
                step="0.01"
                min="0"
                value={formData.basePrice}
                onChange={(e) =>
                  setFormData({ ...formData, basePrice: e.target.value })
                }
                placeholder="0.00"
                required
                disabled={isLoading}
              />
            </div>

            <div className="flex gap-3 pt-6">
              <Button
                onClick={handleSubmit}
                className="flex-1 bg-blue-700 hover:bg-blue-800 shadow-lg hover:shadow-xl"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    {editingGift ? "Atualizar" : "Adicionar"}
                  </>
                )}
              </Button>

              {!isLoading && (
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="border-blue-300 text-blue-700 hover:bg-blue-50"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancelar
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Toaster />
    </>
  );
};

export { GiftForm };
