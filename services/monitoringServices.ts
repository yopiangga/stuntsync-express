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
  month,
}: {
  babyId: number;
  height: number;
  month: number;
}) {
  const monitoring = await prisma.monitoring.create({
    data: {
      babyId,
      height,
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
  month,
}: {
  id: number;
  height: number;
  month: number;
}) {
  const monitoring = await prisma.monitoring.update({
    where: {
      id,
    },
    data: {
      height,
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

export async function getMonitoringsByBabyId(babyId: number) {
  const monitorings = await prisma.monitoring.findMany({
    where: {
      babyId,
    },
  });

  return monitorings;
}