import prisma from "../prisma";
import { config } from "../config";
import { Gender } from "@prisma/client";

export async function getBabies() {
  const babys = await prisma.baby.findMany({
    include: {
      user: true,
    },
  });

  return babys;
}

export async function getBabyById(id: number) {
  const baby = await prisma.baby.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });

  return baby;
}

export async function createBaby({
  name,
  dob,
  gender,
  image,
  userId,
}: {
  name: string;
  dob: string;
  gender: Gender;
  image: string;
  userId: number;
}) {
  const baby = await prisma.baby.create({
    data: {
      name,
      dob,
      gender,
      image,
      userId,
    },
  });

  if (!baby) {
    throw new Error("Something went wrong");
  }

  return baby;
}

export async function updateBaby({
  id,
  name,
  dob,
  gender,
}: {
  id: number;
  name: string;
  dob: string;
  gender: Gender;
}) {
  const baby = await prisma.baby.update({
    where: {
      id,
    },
    data: {
      name,
      dob,
      gender,
    },
  });

  if (!baby) {
    throw new Error("Something went wrong");
  }

  let imagePath = config.baseUrl + "/uploads/baby/" + baby.image;
  baby.image = imagePath;

  return baby;
}

export async function updateBabyImage({
  id,
  image,
}: {
  id: number;
  image: string;
}) {
  const baby = await prisma.baby.update({
    where: {
      id,
    },
    data: {
      image,
    },
  });

  if (!baby) {
    throw new Error("Something went wrong");
  }

  let imagePath = config.baseUrl + "/uploads/baby/" + baby.image;
  baby.image = imagePath;

  return baby;
}

export async function deleteBaby(id: number) {
  const baby = await prisma.baby.delete({
    where: {
      id,
    },
  });

  return baby;
}
