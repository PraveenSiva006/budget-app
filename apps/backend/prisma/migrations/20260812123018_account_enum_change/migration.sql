/*
  Warnings:

  - The values [BANK,CREDIT_CARD,WALLET] on the enum `AccountType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AccountType_new" AS ENUM ('GENERAL', 'CASH', 'CHECKING', 'SAVINGS', 'CREDIT', 'INVESTMENT', 'LOAN', 'MORTGAGE', 'OVERDRAFT');
ALTER TABLE "Account" ALTER COLUMN "type" TYPE "AccountType_new" USING ("type"::text::"AccountType_new");
ALTER TYPE "AccountType" RENAME TO "AccountType_old";
ALTER TYPE "AccountType_new" RENAME TO "AccountType";
DROP TYPE "public"."AccountType_old";
COMMIT;
