// app/api/gifts/route.ts
import { NextRequest, NextResponse } from "next/server";

// Tipos baseados nos testes da API
interface CreateGiftDto {
  title: string;
  description: string;
  imageUrl: string;
  basePrice: number;
}

interface GiftResponse {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  basePrice: number;
  createdAt: string;
}

interface ApiResponse<T> {
  status: number;
  data: T | null;
  error?: string[] | string;
}

export async function GET() {
  try {
    const apiResponse = await fetch(`${process.env.API_URL}/gifts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!apiResponse.ok) {
      console.error("Erro na API externa:", apiResponse.status);
      return NextResponse.json(
        {
          status: 500,
          data: null,
          error: "Erro ao buscar presentes na API externa",
        },
        { status: 500 }
      );
    }

    const result: ApiResponse<GiftResponse[]> = await apiResponse.json();

    return NextResponse.json(result);
  } catch (error) {
    console.error("Erro ao buscar presentes:", error);

    return NextResponse.json(
      {
        status: 500,
        data: null,
        error: "Erro interno do servidor",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateGiftDto = await request.json();

    if (
      !body.title ||
      !body.description ||
      !body.imageUrl ||
      body.basePrice === undefined
    ) {
      return NextResponse.json(
        {
          status: 400,
          data: null,
          error: [
            "Campos obrigatórios não preenchidos: title, description, imageUrl e basePrice são obrigatórios",
          ],
        },
        { status: 400 }
      );
    }

    if (body.basePrice < 0) {
      return NextResponse.json(
        {
          status: 400,
          data: null,
          error: ["Preço base deve ser maior ou igual a zero"],
        },
        { status: 400 }
      );
    }

    const apiResponse = await fetch(`${process.env.API_URL}/gifts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: body.title,
        description: body.description,
        imageUrl: body.imageUrl,
        basePrice: body.basePrice,
      }),
    });

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json();
      console.error("Erro na API externa:", errorData);

      return NextResponse.json(
        {
          status: apiResponse.status,
          data: null,
          error: errorData.error || "Erro ao criar presente na API externa",
        },
        { status: apiResponse.status }
      );
    }

    const result: ApiResponse<GiftResponse> = await apiResponse.json();

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Erro no servidor:", error);

    return NextResponse.json(
      {
        status: 500,
        data: null,
        error: "Erro interno do servidor",
      },
      { status: 500 }
    );
  }
}
