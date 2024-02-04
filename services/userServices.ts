import prisma from "../prisma";
import { config } from "../config";

export async function myProfile({ id }: { id: number }) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      baby: true,
      posyandu: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // change image baby
  if (user.baby) {
    user.baby.map((baby) => {
      if (baby.image) {
        baby.image = config.baseUrl + "/uploads/baby/" + baby.image;
      }
    });
  }

  let imagePath = config.baseUrl + "/uploads/user/" + user.image;
  user.image = imagePath;

  return user;

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

export async function changePassword({
  id,
  oldPassword,
  newPassword,
}: {
  id: number;
  oldPassword: string;
  newPassword: string;
}) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.password !== oldPassword) {
    throw new Error("Old password is wrong");
  }

  const updatedUser = await prisma.user.update({
    where: {
      id,
    },
    data: {
      password: newPassword,
    },
  });

  return updatedUser;
}