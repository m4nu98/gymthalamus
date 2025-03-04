/*
  Warnings:

  - The primary key for the `Member` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `fechaInicio` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `fechaNacimiento` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `fechaPago` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `metodoPago` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `sucursal` on the `Member` table. All the data in the column will be lost.
  - The `id` column on the `Member` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `nombre` on the `Member` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `apellido` on the `Member` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `email` on the `Member` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `telefono` on the `Member` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `plan` on the `Member` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `estado` on the `Member` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `genero` on the `Member` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - A unique constraint covering the columns `[reset_token]` on the table `Member` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fecha_nacimiento` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Member" DROP CONSTRAINT "Member_pkey",
DROP COLUMN "fechaInicio",
DROP COLUMN "fechaNacimiento",
DROP COLUMN "fechaPago",
DROP COLUMN "metodoPago",
DROP COLUMN "sucursal",
ADD COLUMN     "fecha_nacimiento" DATE NOT NULL,
ADD COLUMN     "password_hash" VARCHAR(255),
ADD COLUMN     "reset_token" VARCHAR(255),
ADD COLUMN     "reset_token_expires" TIMESTAMP(3),
ADD COLUMN     "sucursal_id" INTEGER,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "nombre" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "apellido" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "telefono" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "plan" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "estado" SET DEFAULT 'pendiente',
ALTER COLUMN "estado" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "genero" SET DATA TYPE VARCHAR(50),
ADD CONSTRAINT "Member_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Sucursal" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "direccion" VARCHAR(255) NOT NULL,
    "telefono" VARCHAR(20) NOT NULL,

    CONSTRAINT "Sucursal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sucursal_nombre_key" ON "Sucursal"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Member_reset_token_key" ON "Member"("reset_token");

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_sucursal_id_fkey" FOREIGN KEY ("sucursal_id") REFERENCES "Sucursal"("id") ON DELETE SET NULL ON UPDATE CASCADE;
