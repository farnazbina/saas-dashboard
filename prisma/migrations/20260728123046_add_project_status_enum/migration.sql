-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_teamLeadId_fkey";

-- CreateTable
CREATE TABLE "TeamLead" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeamLead_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TeamLead_email_key" ON "TeamLead"("email");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_teamLeadId_fkey" FOREIGN KEY ("teamLeadId") REFERENCES "TeamLead"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
