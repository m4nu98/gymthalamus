/*
  Warnings:

  - Added the required column `fechaNacimiento` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genero` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- First, add the columns as nullable
ALTER TABLE "Member" ADD COLUMN "fechaNacimiento" TIMESTAMP(3),
ADD COLUMN "genero" TEXT;

-- Update existing records with default values
UPDATE "Member" 
SET "fechaNacimiento" = '2000-01-01 00:00:00'::timestamp,
    "genero" = 'no especificado';

-- Now make the columns required
ALTER TABLE "Member" 
ALTER COLUMN "fechaNacimiento" SET NOT NULL,
ALTER COLUMN "genero" SET NOT NULL;
