-- CreateTable
CREATE TABLE "_dealer_of_event" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_dealer_of_event_AB_unique" ON "_dealer_of_event"("A", "B");

-- CreateIndex
CREATE INDEX "_dealer_of_event_B_index" ON "_dealer_of_event"("B");

-- AddForeignKey
ALTER TABLE "_dealer_of_event" ADD CONSTRAINT "_dealer_of_event_A_fkey" FOREIGN KEY ("A") REFERENCES "AuthorizedDealer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_dealer_of_event" ADD CONSTRAINT "_dealer_of_event_B_fkey" FOREIGN KEY ("B") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
