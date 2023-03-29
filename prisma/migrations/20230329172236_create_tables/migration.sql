-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatarUrl" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Process" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "areaId" TEXT,

    CONSTRAINT "Process_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubProcess" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "processId" TEXT,

    CONSTRAINT "SubProcess_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "done" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "expiresIn" TIMESTAMP(3) NOT NULL,
    "documentation" TEXT,
    "processId" TEXT,
    "subProcessId" TEXT,
    "systemId" TEXT,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Area" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Area_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TaskToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_TaskToUser_AB_unique" ON "_TaskToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_TaskToUser_B_index" ON "_TaskToUser"("B");

-- AddForeignKey
ALTER TABLE "Process" ADD CONSTRAINT "Process_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "Area"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubProcess" ADD CONSTRAINT "SubProcess_processId_fkey" FOREIGN KEY ("processId") REFERENCES "Process"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_processId_fkey" FOREIGN KEY ("processId") REFERENCES "Process"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_subProcessId_fkey" FOREIGN KEY ("subProcessId") REFERENCES "SubProcess"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TaskToUser" ADD CONSTRAINT "_TaskToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TaskToUser" ADD CONSTRAINT "_TaskToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
