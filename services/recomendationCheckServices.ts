import prisma from "../prisma";
import { config } from "../config";

export async function getRecomendationCheckByRecomendationId({
  recomendationId,
}: {
  recomendationId: number;
}) {
  const recomendationsCheck = await prisma.recomendationCheck.findMany({
    where: {
      recomendationId,
    },
  });

  return recomendationsCheck;
}

export async function createRecomendationCheck({
  recomendationId,
}: {
  recomendationId: number;
}) {
  const recomendationCheck = await prisma.recomendationCheck.create({
    data: {
      recomendationId,
    },
  });

  return recomendationCheck;
}
