-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'OPERATOR', 'MODERATOR');

-- CreateTable
CREATE TABLE "User" (
    "id" BIGSERIAL NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "fatherName" VARCHAR(255),
    "phoneNumber" VARCHAR(255) NOT NULL,
    "password" VARCHAR(2000) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "avatar" VARCHAR(2000),
    "IIN" VARCHAR(20) NOT NULL,
    "anketaId" BIGINT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Anketa" (
    "id" BIGSERIAL NOT NULL,
    "birthDay" TIMESTAMP(3) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "education" VARCHAR(255) NOT NULL,
    "specialty" VARCHAR(255) NOT NULL,
    "workStudy" VARCHAR(255) NOT NULL,

    CONSTRAINT "Anketa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImageModel" (
    "id" BIGSERIAL NOT NULL,
    "link" TEXT NOT NULL,
    "bookId" BIGINT NOT NULL,
    "newsId" BIGINT NOT NULL,

    CONSTRAINT "ImageModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book" (
    "id" BIGSERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "author" VARCHAR(100) NOT NULL,
    "isbn" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "publishing_date" TIMESTAMP(3) NOT NULL,
    "topic" TEXT NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookGenre" (
    "id" BIGSERIAL NOT NULL,
    "bookId" BIGINT NOT NULL,
    "genreId" BIGINT NOT NULL,

    CONSTRAINT "BookGenre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "News" (
    "id" BIGSERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "short_title" VARCHAR(30) NOT NULL,
    "description" VARCHAR(1000) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" BIGSERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "userId" BIGINT NOT NULL,
    "newsId" BIGINT NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Response" (
    "id" BIGSERIAL NOT NULL,
    "bookId" BIGINT NOT NULL,
    "userId" BIGINT NOT NULL,

    CONSTRAINT "Response_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" BIGSERIAL NOT NULL,
    "received_date" TIMESTAMP(3) NOT NULL,
    "expiration_date" TIMESTAMP(3) NOT NULL,
    "return_date" TIMESTAMP(3) NOT NULL,
    "userId" BIGINT NOT NULL,
    "bookId" BIGINT NOT NULL,
    "isExtend" BOOLEAN NOT NULL DEFAULT false,
    "isExtendApproved" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- CreateIndex
CREATE INDEX "index_user_iin" ON "User"("IIN");

-- CreateIndex
CREATE INDEX "index_user_phone" ON "User"("phoneNumber");

-- CreateIndex
CREATE INDEX "index_book_title" ON "Book"("title");

-- CreateIndex
CREATE INDEX "index_book_author" ON "Book"("author");

-- CreateIndex
CREATE INDEX "index_book_authorOrTitle" ON "Book"("author", "title");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_anketaId_fkey" FOREIGN KEY ("anketaId") REFERENCES "Anketa"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageModel" ADD CONSTRAINT "ImageModel_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageModel" ADD CONSTRAINT "ImageModel_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookGenre" ADD CONSTRAINT "BookGenre_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookGenre" ADD CONSTRAINT "BookGenre_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
