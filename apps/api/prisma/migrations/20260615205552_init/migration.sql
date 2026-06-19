-- CreateEnum
CREATE TYPE "Momentum" AS ENUM ('SLOW', 'MEDIUM', 'FAST', 'VERY_FAST');

-- CreateEnum
CREATE TYPE "Confidence" AS ENUM ('A', 'B', 'C', 'D');

-- CreateEnum
CREATE TYPE "NodeStatus" AS ENUM ('LOCKED', 'EMERGING', 'ACTIVE', 'ACHIEVED', 'CONTESTED', 'DANGEROUS');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('MODEL_RELEASE', 'BENCHMARK', 'RESEARCH_PAPER', 'PRODUCT_LAUNCH', 'ADOPTION', 'REGULATION', 'SAFETY_INCIDENT', 'EXPERT_ANALYSIS');

-- CreateTable
CREATE TABLE "Route" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "shortTitle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "capabilityIndex" INTEGER NOT NULL,
    "momentum" "Momentum" NOT NULL,
    "confidence" "Confidence" NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL,
    "colorToken" TEXT NOT NULL DEFAULT 'cyan',
    "orderIndex" INTEGER NOT NULL DEFAULT 0,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Route_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Node" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "routeSlug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "NodeStatus" NOT NULL,
    "positionX" INTEGER NOT NULL,
    "positionY" INTEGER NOT NULL,
    "scoreContribution" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Node_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "summary" TEXT NOT NULL,
    "whyItMatters" TEXT NOT NULL,
    "eventType" "EventType" NOT NULL,
    "confidence" "Confidence" NOT NULL,
    "sourceUrls" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventRouteImpact" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "routeId" INTEGER NOT NULL,
    "delta" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "EventRouteImpact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogPost" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BlogPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GlossaryTerm" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "term" TEXT NOT NULL,
    "definition" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GlossaryTerm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_NodeParents" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_NodeParents_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_EventNodes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_EventNodes_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_BlogRoutes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_BlogRoutes_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_BlogNodes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_BlogNodes_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_BlogEvents" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_BlogEvents_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_GlossaryRoutes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_GlossaryRoutes_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_GlossaryNodes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_GlossaryNodes_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Route_slug_key" ON "Route"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Node_slug_key" ON "Node"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Event_slug_key" ON "Event"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "EventRouteImpact_eventId_routeId_key" ON "EventRouteImpact"("eventId", "routeId");

-- CreateIndex
CREATE UNIQUE INDEX "BlogPost_slug_key" ON "BlogPost"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "GlossaryTerm_slug_key" ON "GlossaryTerm"("slug");

-- CreateIndex
CREATE INDEX "_NodeParents_B_index" ON "_NodeParents"("B");

-- CreateIndex
CREATE INDEX "_EventNodes_B_index" ON "_EventNodes"("B");

-- CreateIndex
CREATE INDEX "_BlogRoutes_B_index" ON "_BlogRoutes"("B");

-- CreateIndex
CREATE INDEX "_BlogNodes_B_index" ON "_BlogNodes"("B");

-- CreateIndex
CREATE INDEX "_BlogEvents_B_index" ON "_BlogEvents"("B");

-- CreateIndex
CREATE INDEX "_GlossaryRoutes_B_index" ON "_GlossaryRoutes"("B");

-- CreateIndex
CREATE INDEX "_GlossaryNodes_B_index" ON "_GlossaryNodes"("B");

-- AddForeignKey
ALTER TABLE "Node" ADD CONSTRAINT "Node_routeSlug_fkey" FOREIGN KEY ("routeSlug") REFERENCES "Route"("slug") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventRouteImpact" ADD CONSTRAINT "EventRouteImpact_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventRouteImpact" ADD CONSTRAINT "EventRouteImpact_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NodeParents" ADD CONSTRAINT "_NodeParents_A_fkey" FOREIGN KEY ("A") REFERENCES "Node"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NodeParents" ADD CONSTRAINT "_NodeParents_B_fkey" FOREIGN KEY ("B") REFERENCES "Node"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventNodes" ADD CONSTRAINT "_EventNodes_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventNodes" ADD CONSTRAINT "_EventNodes_B_fkey" FOREIGN KEY ("B") REFERENCES "Node"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlogRoutes" ADD CONSTRAINT "_BlogRoutes_A_fkey" FOREIGN KEY ("A") REFERENCES "BlogPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlogRoutes" ADD CONSTRAINT "_BlogRoutes_B_fkey" FOREIGN KEY ("B") REFERENCES "Route"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlogNodes" ADD CONSTRAINT "_BlogNodes_A_fkey" FOREIGN KEY ("A") REFERENCES "BlogPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlogNodes" ADD CONSTRAINT "_BlogNodes_B_fkey" FOREIGN KEY ("B") REFERENCES "Node"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlogEvents" ADD CONSTRAINT "_BlogEvents_A_fkey" FOREIGN KEY ("A") REFERENCES "BlogPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlogEvents" ADD CONSTRAINT "_BlogEvents_B_fkey" FOREIGN KEY ("B") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GlossaryRoutes" ADD CONSTRAINT "_GlossaryRoutes_A_fkey" FOREIGN KEY ("A") REFERENCES "GlossaryTerm"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GlossaryRoutes" ADD CONSTRAINT "_GlossaryRoutes_B_fkey" FOREIGN KEY ("B") REFERENCES "Route"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GlossaryNodes" ADD CONSTRAINT "_GlossaryNodes_A_fkey" FOREIGN KEY ("A") REFERENCES "GlossaryTerm"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GlossaryNodes" ADD CONSTRAINT "_GlossaryNodes_B_fkey" FOREIGN KEY ("B") REFERENCES "Node"("id") ON DELETE CASCADE ON UPDATE CASCADE;
