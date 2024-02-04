import prisma from "../prisma";
import { config } from "../config";

export async function getArticlesPublished() {
  const articles = await prisma.article.findMany({
    where: {
      published: true,
    },
    include: {
      user: true,
    },
  });

  let imagePath = config.baseUrl + "/uploads/article/";
  articles.map((article) => {
    article.image = imagePath + article.image;
  });

  return articles;
}

export async function getArticleById({
  id,
}: {
  id: number;
}) {
  const article = await prisma.article.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });

  if (!article) {
    throw new Error("User not found");
  }

  let imagePath = config.baseUrl + "/uploads/article/";
  article.image = imagePath + article.image;

  return article;
}

export async function createArticle({
  title,
  desc,
  image,
  content,
  published,
  userId,
}: {
  title: string;
  desc: string;
  image: string;
  content: string;
  published: boolean;
  userId: number;
}) {
  const article = await prisma.article.create({
    data: {
      title,
      desc,
      image,
      content,
      published,
      userId,
    },
  });

  if (!article) {
    throw new Error("Something went wrong");
  }

  let imagePath = config.baseUrl + "/uploads/article/" + article.image;
  article.image = imagePath;

  return article;
}

export async function updateArticle({
  id,
  title,
  desc,
  content,
  published,
}: {
  id: number;
  title: string;
  desc: string;
  content: string;
  published: boolean;
}) {
  const article = await prisma.article.update({
    where: {
      id,
    },
    data: {
      title,
      desc,
      content,
      published,
    },
  });

  if (!article) {
    throw new Error("Something went wrong");
  }

  let imagePath = config.baseUrl + "/uploads/article/" + article.image;
  article.image = imagePath;

  return article;
}

export async function updateArticleImage({
  id,
  image,
}: {
  id: number;
  image: string;
}) {
  const article = await prisma.article.update({
    where: {
      id,
    },
    data: {
      image,
    },
  });

  if (!article) {
    throw new Error("Something went wrong");
  }

  let imagePath = config.baseUrl + "/uploads/article/" + article.image;
  article.image = imagePath;

  return article;
}

export async function deleteArticle(id: number) {
  const article = await prisma.article.delete({
    where: {
      id,
    },
  });

  if (!article) {
    throw new Error("Something went wrong");
  }

  return article;
}
