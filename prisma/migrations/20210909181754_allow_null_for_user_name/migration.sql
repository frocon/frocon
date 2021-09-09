-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firebaseIdToken" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "avatar" TEXT
);
INSERT INTO "new_User" ("avatar", "createdAt", "email", "firebaseIdToken", "id", "name", "updatedAt") SELECT "avatar", "createdAt", "email", "firebaseIdToken", "id", "name", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User.firebaseIdToken_unique" ON "User"("firebaseIdToken");
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
