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

export async function GET() {
  const db = await connectMongo();
  const posts = await db
    .collection("posts")
    .find()
    .sort({ createdAt: -1 })
    .toArray();

  const data = await Promise.all(posts.map(formatPost));
  return NextResponse.json(data);
}

export async function POST(request: Request) {
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

  const now = new Date().toISOString();
  const db = await connectMongo();

  const result = await db.collection("posts").insertOne({
    title,
    content,
    author,
    createdAt: now,
    updatedAt: now,
  });

  const createdPost = await db.collection("posts").findOne({ _id: result.insertedId });

  if (!createdPost) {
    return NextResponse.json(
      { error: "Não foi possível criar o post." },
      { status: 500 }
    );
  }

  return NextResponse.json(await formatPost(createdPost), { status: 201 });
}
