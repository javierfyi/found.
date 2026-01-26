import { NextResponse } from "next/server"
import { readFile } from "fs/promises"
import path from "path"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params

  try {
    const filePath = path.join(process.cwd(), "public", "r", `${name}.json`)
    const content = await readFile(filePath, "utf-8")
    const json = JSON.parse(content)

    return NextResponse.json(json, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Cache-Control": "public, max-age=3600",
      },
    })
  } catch {
    return NextResponse.json(
      { error: `Registry item "${name}" not found` },
      { status: 404 }
    )
  }
}
