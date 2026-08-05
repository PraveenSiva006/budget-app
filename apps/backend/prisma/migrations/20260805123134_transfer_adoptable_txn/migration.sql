-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "openingBalance" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "fromAccountId" DROP NOT NULL;
