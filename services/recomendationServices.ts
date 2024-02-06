import prisma from "../prisma";
import { config } from "../config";
import { getRecomendationsByAge } from "../helpers/getRecomendationsByAge";

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
  subType,
  month,
  qty,
}: {
  userId: number;
  babyId: number;
  title: string;
  desc: string;
  type: string;
  subType: number | null;
  month: number;
  qty: number;
}) {
  const recomendation = await prisma.recomendation.create({
    data: {
      userId,
      babyId,
      title,
      desc,
      type,
      subType,
      month,
      qty,
    },
  });

  if (!recomendation) {
    throw new Error("Something went wrong");
  }

  return recomendation;
}

export async function createRecomendationAuto({
  babyId,
  month
}: {
  babyId: number;
  month: number;
}) {

  const recomendations = await getRecomendationsByAge(month);

  if (recomendations.length === 0) {
    throw new Error("Recomendations not found");
  }

  const recomendationsToCreate = recomendations.map((recomendation) => {
    return {
      babyId,
      title: recomendation.title,
      desc: recomendation.desc,
      type: recomendation.type,
      subType: recomendation.subType,
      month: recomendation.month,
      qty: recomendation.qty,
    };
  });

  const createdRecomendations = await prisma.recomendation.createMany({
    data: recomendationsToCreate,
  });

  if (!createdRecomendations) {
    throw new Error("Something went wrong");
  }

  return createdRecomendations;

}

export async function updateRecomendation({
  id,
  title,
  desc,
  type,
  subType,
  month,
  qty,
}: {
  id: number;
  title: string;
  desc: string;
  type: string;
  subType: number | null;
  month: number;
  qty: number;
}) {
  const recomendation = await prisma.recomendation.update({
    where: {
      id,
    },
    data: {
      title,
      desc,
      type,
      subType,
      month,
      qty,
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

export async function getRecomendationsByBabyId({
  babyId
}: {babyId: number}) {
  const recomendation = await prisma.recomendation.findMany({
    where: {
      babyId,
    },
    include: {
      checks: true
    }
  });

  return recomendation;
}