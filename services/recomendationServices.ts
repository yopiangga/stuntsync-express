import prisma from "../prisma";
import { config } from "../config";

export async function getRecomendations() {
  const recomendation = await prisma.recomendation.findMany({});

  return recomendation;
}

export async function getRecomendationById(id: number) {
  const recomendation = await prisma.recomendation.findUnique({
    where: {
      id,
    },
  });

  if (!recomendation) {
    throw new Error("Recomendation not found");
  }

  return recomendation;
}

export async function createRecomendation({
  userId,
  babyId,
  title,
  desc,
  type,
  month,
}: {
  userId: number;
  babyId: number;
  title: string;
  desc: string;
  type: string;
  month: string;
}) {
  const recomendation = await prisma.recomendation.create({
    data: {
      userId,
      babyId,
      title,
      desc,
      type,
      month,
    },
  });

  if (!recomendation) {
    throw new Error("Something went wrong");
  }

  return recomendation;
}

export async function updateRecomendation({
  id,
  title,
  desc,
  type,
  month,
  isCheck,
}: {
  id: number;
  title: string;
  desc: string;
  type: string;
  month: string;
  isCheck?: boolean;
}) {
  const recomendation = await prisma.recomendation.update({
    where: {
      id,
    },
    data: {
      title,
      desc,
      type,
      month,
      isCheck,
    },
  });

  if (!recomendation) {
    throw new Error("Something went wrong");
  }

  return recomendation;
}

export async function deleteRecomendation(id: number) {
  const recomendation = await prisma.recomendation.delete({
    where: {
      id,
    },
  });

  if (!recomendation) {
    throw new Error("Something went wrong");
  }

  return recomendation;
}
