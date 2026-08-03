/*
  Warnings:

  - You are about to drop the column `dataa` on the `Node` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Node" DROP COLUMN "dataa",
ADD COLUMN     "data" JSONB NOT NULL DEFAULT '{}';
