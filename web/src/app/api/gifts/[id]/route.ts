// app/api/gifts/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";

interface UpdateGiftDto {
  title?: string;
  description?: string;
  imageUrl?: string;
  basePrice?: number;
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

function isValidUUID(id: string): boolean {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!isValidUUID(id)) {
      return NextResponse.json(
        {
          status: 400,
          data: null,
          error: ["Invalid gift ID format"],
        },
        { status: 400 }
      );
    }

    const apiResponse = await fetch(`${process.env.API_URL}/gifts/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (apiResponse.status === 404) {
      return NextResponse.json(
        {
          status: 404,
          data: null,
          error: "Presente não encontrado",
        },
        { status: 404 }
      );
    }

    if (!apiResponse.ok) {
      console.error("Erro na API externa:", apiResponse.status);
      return NextResponse.json(
        {
          status: 500,
          data: null,
          error: "Erro ao buscar presente na API externa",
        },
        { status: 500 }
      );
    }

    const result: ApiResponse<GiftResponse> = await apiResponse.json();

    return NextResponse.json(result);
  } catch (error) {
    console.error("Erro ao buscar presente:", error);

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

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!isValidUUID(id)) {
      return NextResponse.json(
        {
          status: 400,
          data: null,
          error: ["Invalid gift ID format"],
        },
        { status: 400 }
      );
    }

    const body: UpdateGiftDto = await request.json();

    if (body.basePrice !== undefined && body.basePrice < 0) {
      return NextResponse.json(
        {
          status: 400,
          data: null,
          error: ["Preço base deve ser maior ou igual a zero"],
        },
        { status: 400 }
      );
    }

    const apiResponse = await fetch(`${process.env.API_URL}/gifts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (apiResponse.status === 404) {
      return NextResponse.json(
        {
          status: 404,
          data: null,
          error: "Presente não encontrado",
        },
        { status: 404 }
      );
    }

    if (!apiResponse.ok) {
      const errorData = await apiResponse.text();
      console.error("Erro na API externa:", errorData);

      return NextResponse.json(
        {
          status: apiResponse.status,
          data: null,
          error: "Erro ao atualizar presente na API externa",
        },
        { status: apiResponse.status }
      );
    }

    const result: ApiResponse<GiftResponse> = await apiResponse.json();

    return NextResponse.json(result);
  } catch (error) {
    console.error("Erro ao atualizar presente:", error);

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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!isValidUUID(id)) {
      return NextResponse.json(
        {
          status: 400,
          data: null,
          error: ["Invalid gift ID format"],
        },
        { status: 400 }
      );
    }

    const apiResponse = await fetch(`${process.env.API_URL}/gifts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (apiResponse.status === 404) {
      return NextResponse.json(
        {
          status: 404,
          data: null,
          error: "Presente não encontrado",
        },
        { status: 404 }
      );
    }

    if (!apiResponse.ok) {
      console.error("Erro na API externa:", apiResponse.status);
      return NextResponse.json(
        {
          status: 500,
          data: null,
          error: "Erro ao deletar presente na API externa",
        },
        { status: 500 }
      );
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Erro ao deletar presente:", error);

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
