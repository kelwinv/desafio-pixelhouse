import { useState, useCallback } from "react";
import { typeGift } from "../type/gift";

export interface CreateGiftData {
  title: string;
  description: string;
  imageUrl: string;
  basePrice: number;
}

export interface UpdateGiftData {
  title?: string;
  description?: string;
  imageUrl?: string;
  basePrice?: number;
}

interface ApiResponse<T> {
  status: number;
  data: T | null;
  error?: string[] | string;
}

export const useGifts = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const makeRequest = useCallback(
    async <T>(url: string, options: RequestInit = {}): Promise<T> => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            ...options.headers,
          },
          ...options,
        });

        if (!response.ok) {
          const errorData = await response.json();

          if (errorData.error) {
            throw new Error(errorData.error);
          }

          throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }

        if (response.status === 204) {
          return null as T;
        }

        const data = await response.json();
        return data;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Erro desconhecido";
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const getAllGifts = useCallback(async (): Promise<typeGift[]> => {
    const response = await makeRequest<ApiResponse<typeGift[]>>("/api/gifts");
    return response.data || [];
  }, [makeRequest]);

  const getGiftById = useCallback(
    async (id: string): Promise<typeGift | null> => {
      const response = await makeRequest<ApiResponse<typeGift>>(
        `/api/gifts/${id}`
      );
      return response.data;
    },
    [makeRequest]
  );

  const createGift = useCallback(
    async (giftData: CreateGiftData): Promise<typeGift> => {
      const response = await makeRequest<ApiResponse<typeGift>>("/api/gifts", {
        method: "POST",
        body: JSON.stringify(giftData),
      });

      if (!response.data) {
        throw new Error("Erro ao criar presente");
      }

      return response.data;
    },
    [makeRequest]
  );

  const updateGift = useCallback(
    async (id: string, giftData: UpdateGiftData): Promise<typeGift> => {
      const response = await makeRequest<ApiResponse<typeGift>>(
        `/api/gifts/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(giftData),
        }
      );

      if (!response.data) {
        throw new Error("Erro ao atualizar presente");
      }

      return response.data;
    },
    [makeRequest]
  );

  const deleteGift = useCallback(
    async (id: string): Promise<void> => {
      await makeRequest<void>(`/api/gifts/${id}`, {
        method: "DELETE",
      });
    },
    [makeRequest]
  );

  return {
    loading,
    error,

    getAllGifts,
    getGiftById,
    createGift,
    updateGift,
    deleteGift,

    clearError: () => setError(null),
  };
};
