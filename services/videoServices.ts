import prisma from "../prisma";
import { config } from "../config";

export async function getVideos() {
  const videos = await prisma.video.findMany({
    include: {
      user: true,
    },
  });

  return videos;
}

export async function getVideoById({
  id,
}: {
  id: number;
}) {
  const video = await prisma.video.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });

  if (!video) {
    throw new Error("Video not found");
  }

  return video;
}

export async function createVideo({
  title,
  desc,
  url,
  published,
  userId,
}: {
  title: string;
  desc: string;
  url: string;
  published: boolean;
  userId: number;
}) {
  const video = await prisma.video.create({
    data: {
      title,
      desc,
      url,
      published,
      userId,
    },
  });

  if (!video) {
    throw new Error("Something went wrong");
  }

  return video;
}

export async function updateVideo({
  id,
  title,
  desc,
  url,
  published,
}: {
  id: number;
  title: string;
  desc: string;
  url: string;
  published: boolean;
}) {
  const video = await prisma.video.update({
    where: {
      id,
    },
    data: {
      title,
      desc,
      url,
      published,
    },
  });

  if (!video) {
    throw new Error("Something went wrong");
  }

  return video;
}

export async function deleteVideo(id: number) {
  const video = await prisma.video.delete({
    where: {
      id,
    },
  });

  if (!video) {
    throw new Error("Something went wrong");
  }

  return video;
}
