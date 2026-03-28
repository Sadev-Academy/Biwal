// app/actions.ts
"use server";
import { prisma } from "@/lib/prisma";

export async function getData() {
    try {
        const data = await prisma.product.findMany();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw new Error("Failed to fetch data from database.");
    }
}