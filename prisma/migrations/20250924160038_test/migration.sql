-- CreateTable
CREATE TABLE "public"."user_information" (
    "id" SERIAL NOT NULL,
    "user_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "last_login_time" TIMESTAMP(3),
    "user_disabled" BOOLEAN NOT NULL DEFAULT false,
    "user_role" TEXT,

    CONSTRAINT "user_information_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_information_user_name_key" ON "public"."user_information"("user_name");
