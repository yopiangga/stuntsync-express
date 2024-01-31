import prisma from "../prisma";
import { config } from "../config";

export async function getMonitorings() {
  const monitorings = await prisma.monitoring.findMany();

  return monitorings;
}

export async function getMonitoringById(id: number) {
  const monitoring = await prisma.monitoring.findUnique({
    where: {
      id,
    },
  });

  return monitoring;
}

export async function createMonitoring({
  babyId,
  height,
  weight,
  head,
  month,
}: {
  babyId: number;
  height: number;
  weight: number;
  head: number;
  month: string;
}) {
  const monitoring = await prisma.monitoring.create({
    data: {
      babyId,
      height,
      weight,
      head,
      month,
    },
  });

  if (!monitoring) {
    throw new Error("Something went wrong");
  }

  return monitoring;
}

export async function updateMonitoring({
  id,
  height,
  weight,
  head,
  month,
}: {
  id: number;
  height: number;
  weight: number;
  head: number;
  month: string;
}) {
  const monitoring = await prisma.monitoring.update({
    where: {
      id,
    },
    data: {
      height,
      weight,
      head,
      month,
    },
  });

  if (!monitoring) {
    throw new Error("Something went wrong");
  }

  return monitoring;
}

export async function deleteMonitoring(id: number) {
  const monitoring = await prisma.monitoring.delete({
    where: {
      id,
    },
  });

  if (!monitoring) {
    throw new Error("Something went wrong");
  }

  return monitoring;
}
