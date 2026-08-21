-- Custom migration (IMP-020): composite foreign key enforcing that
-- invitations.current_version_id, when set, always names a version that
-- belongs to that same invitation.
--
-- docs/06_DATABASE_DESIGN.md §14.1: "`current_version_id` must refer to a
-- version belonging to the same invitation; this invariant is enforced
-- transactionally and, where practical, by a composite foreign key."
--
-- Not expressible in the Drizzle schema DSL (src/db/schema/invitations.ts):
-- an `extraConfig` foreignKey() referencing invitation_versions' columns
-- directly (not through a lazy `.references()` callback) reintroduces a
-- two-way TypeScript type-inference cycle between the two mutually
-- referencing tables. See the comment at the top of that file.
--
-- The target column set (invitation_id, id) is declared unique in
-- migration 0000 (invitation_versions_invitation_id_id_key), which
-- PostgreSQL requires for a composite foreign key target. Because
-- current_version_id is nullable, PostgreSQL's default MATCH SIMPLE
-- foreign-key matching skips enforcement whenever it is null — an
-- invitation with no current version yet is unaffected.
ALTER TABLE "invitations"
  ADD CONSTRAINT "invitations_current_version_same_invitation_fk"
  FOREIGN KEY ("id", "current_version_id")
  REFERENCES "invitation_versions" ("invitation_id", "id")
  ON DELETE NO ACTION ON UPDATE NO ACTION;
