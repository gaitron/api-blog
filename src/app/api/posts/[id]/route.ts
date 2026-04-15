import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { connectMongo } from "@/lib/mongodb";

async function formatPost(doc: any) {
  return {
    id: doc._id.toString(),
    title: doc.title,
    content: doc.content,
    author: doc.author ?? "Anonymous",
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

function validateId(id: string) {
  if (!ObjectId.isValid(id)) {
    return false;
  }

  try {
    new ObjectId(id);
    return true;
  } catch {
    return false;
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!validateId(id)) {
    return NextResponse.json({ error: "ID inválido." }, { status: 400 });
  }

  const db = await connectMongo();
  const post = await db.collection("posts").findOne({ _id: new ObjectId(id) });

  if (!post) {
    return NextResponse.json({ error: "Post não encontrado." }, { status: 404 });
  }

  return NextResponse.json(await formatPost(post));
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!validateId(id)) {
    return NextResponse.json({ error: "ID inválido." }, { status: 400 });
  }

  const body = await request.json();
  const title = String(body.title ?? "").trim();
  const content = String(body.content ?? "").trim();
  const author = body.author ? String(body.author).trim() : undefined;

  if (!title || !content) {
    return NextResponse.json(
      { error: "Os campos title e content são obrigatórios." },
      { status: 400 }
    );
  }

  const db = await connectMongo();
  const now = new Date().toISOString();

  const setData: Record<string, any> = {
    title,
    content,
    updatedAt: now,
  };

  // Only include author if it's defined (provided by user)
  if (author !== undefined) {
    setData.author = author;
  }

  const updateResult = await db.collection("posts").findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: setData },
    { returnDocument: "after" }
  );

  if (!updateResult) {
    return NextResponse.json({ error: "Post não encontrado." }, { status: 404 });
  }

  return NextResponse.json(await formatPost(updateResult));
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!validateId(id)) {
    return NextResponse.json({ error: "ID inválido." }, { status: 400 });
  }

  const db = await connectMongo();
  const deleteResult = await db
    .collection("posts")
    .deleteOne({ _id: new ObjectId(id) });

  if (deleteResult.deletedCount === 0) {
    return NextResponse.json({ error: "Post não encontrado." }, { status: 404 });
  }

  return new Response(null, { status: 204 });
}
