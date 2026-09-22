/*
  Warnings:

  - You are about to drop the column `teamMemberId` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the `TeamMember` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_teamMemberId_fkey";

-- DropIndex
DROP INDEX "Review_teamMemberId_idx";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "teamMemberId";

-- DropTable
DROP TABLE "TeamMember";
