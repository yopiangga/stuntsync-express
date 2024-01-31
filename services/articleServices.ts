import prisma from "../prisma";
import { config } from "../config";

export async function getArticles() {
  const articles = await prisma.article.findMany({
    include: {
      user: true,
    },
  });

  return articles;
}

export async function getArticleById(id: number) {
  const article = await prisma.article.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });

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
