import prisma from "../prisma";
import { config } from "../config";

export function myProfile({ id }: { id: number }) {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
}

export async function updateProfile({
  id,
  name,
  email,
  password,
}: {
  id: number;
  name: string;
  email: string;
  password: string;
}) {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      name,
      email,
      password,
    },
  });

  return user;
}

export async function updateProfileImage({
  id,
  image,
}: {
  id: number;
  image: string;
}) {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      image,
    },
  });

  if (!user) {
    throw new Error("Something went wrong");
  }

  let imagePath = config.baseUrl + "/uploads/user/" + user.image;
  user.image = imagePath;

  return user;
}
