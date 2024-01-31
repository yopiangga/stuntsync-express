import prisma from "../prisma";
import { config } from "../config";

export async function getPosyandus() {
  const posyandu = await prisma.posyandu.findMany();

  return posyandu;
}

export async function getPosyanduById(id: number) {
  const posyandu = await prisma.posyandu.findUnique({
    where: {
      id,
    },
  });

  if (!posyandu) {
    throw new Error("Posyandu not found");
  }

  return posyandu;
}

export async function createPosyandu({
  name,
  address,
  phone,
  image,
}: {
  name: string;
  address: string | null;
  phone: string | null;
  image: string;
}) {
  const posyandu = await prisma.posyandu.create({
    data: {
      name,
      address,
      phone,
      image,
    },
  });

  if (!posyandu) {
    throw new Error("Something went wrong");
  }

  return posyandu;
}

export async function updatePosyandu({
  id,
  name,
  address,
  phone,
}: {
  id: number;
  name: string;
  address: string | null;
  phone: string | null;
}) {
  const posyandu = await prisma.posyandu.update({
    where: {
      id,
    },
    data: {
      name,
      address,
      phone,
    },
  });

  if (!posyandu) {
    throw new Error("Something went wrong");
  }

  return posyandu;
}

export async function updatePosyanduImage({
  id,
  image,
}: {
  id: number;
  image: string;
}) {
  const posyandu = await prisma.posyandu.update({
    where: {
      id,
    },
    data: {
      image,
    },
  });

  if (!posyandu) {
    throw new Error("Something went wrong");
  }

  return posyandu;
}

export async function deletePosyandu(id: number) {
  const posyandu = await prisma.posyandu.delete({
    where: {
      id,
    },
  });

  if (!posyandu) {
    throw new Error("Something went wrong");
  }

  return posyandu;
}
