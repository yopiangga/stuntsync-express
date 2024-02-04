import prisma from "../prisma";
import { config } from "../config";

export async function getVideos() {
  const videos = await prisma.video.findMany({
    include: {
      user: true,
    },
  });

  let videoPath = config.baseUrl + "/uploads/video/";
  videos.map((video) => {
    video.image = videoPath + video.image;
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

  let imagePath = config.baseUrl + "/uploads/video/" + video.image;
  video.image = imagePath;

  return video;
}

export async function createVideo({
  title,
  desc,
  image,
  url,
  published,
  userId,
}: {
  title: string;
  desc: string;
  image: string;
  url: string;
  published: boolean;
  userId: number;
}) {
  const video = await prisma.video.create({
    data: {
      title,
      desc,
      image,
      url,
      published,
      userId,
    },
  });

  if (!video) {
    throw new Error("Something went wrong");
  }

  let imagePath = config.baseUrl + "/uploads/video/" + video.image;
  video.image = imagePath;

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

export async function updateVideoImage({
  id,
  image,
}: {
  id: number;
  image: string;
}) {
  const video = await prisma.video.update({
    where: {
      id,
    },
    data: {
      image,
    },
  });

  if (!video) {
    throw new Error("Something went wrong");
  }

  let imagePath = config.baseUrl + "/uploads/video/" + video.image;
  video.image = imagePath;

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
