import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

const UsersTable = pgTable("Users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
});

const filePaths = pgTable("fileTable",{
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  project: varchar({ length: 255 }).notNull(),
  path: varchar({ length: 511 }).notNull(),
  userId: integer().references(() => UsersTable.id),

}) 


export {UsersTable};