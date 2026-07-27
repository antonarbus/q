/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    // ── front/ layer ordering ──────────────────────────────────────────────
    // Each layer may only import from layers below it in the hierarchy:
    // app ← pages ← widgets ← features ← entities ← shared
    {
      name: 'front-pages-no-upward',
      comment: 'front/pages/ must not import from front/app/',
      severity: 'error',
      from: { path: '^front/pages/', pathNot: String.raw`\.(test|spec)\.[tj]sx?$` },
      to: { path: '^front/app/' },
    },
    {
      name: 'front-widgets-no-upward',
      comment: 'front/widgets/ must not import from front/pages/ or front/app/',
      severity: 'error',
      from: { path: '^front/widgets/', pathNot: String.raw`\.(test|spec)\.[tj]sx?$` },
      to: { path: '^front/(pages|app)/' },
    },
    {
      name: 'front-features-no-upward',
      comment: 'front/features/ must not import from front/widgets/, pages/, or app/',
      severity: 'error',
      from: { path: '^front/features/', pathNot: String.raw`\.(test|spec)\.[tj]sx?$` },
      to: { path: '^front/(widgets|pages|app)/' },
    },
    {
      name: 'front-entities-no-upward',
      comment: 'front/entities/ must not import from front/features/, widgets/, pages/, or app/',
      severity: 'error',
      from: { path: '^front/entities/', pathNot: String.raw`\.(test|spec)\.[tj]sx?$` },
      to: { path: '^front/(features|widgets|pages|app)/' },
    },
    {
      name: 'front-shared-no-upward',
      comment:
        'front/shared/ must not import from front/entities/, features/, widgets/, pages/, or app/',
      severity: 'error',
      from: { path: '^front/shared/', pathNot: String.raw`\.(test|spec)\.[tj]sx?$` },
      to: { path: '^front/(entities|features|widgets|pages|app)/' },
    },

    // ── back/ layer ordering ───────────────────────────────────────────────
    // Each layer may only import from layers below it in the hierarchy:
    // api ← entity ← shared
    // back/config is a leaf that back/shared legitimately depends on (and vice
    // versa for secrets), so it is intentionally left out of this ordering.
    {
      name: 'back-entity-no-upward',
      comment: 'back/entity/ must not import from back/api/',
      severity: 'error',
      from: { path: '^back/entity/', pathNot: String.raw`\.(test|spec)\.[tj]sx?$` },
      to: { path: '^back/api/' },
    },
    {
      name: 'back-shared-no-upward',
      comment: 'back/shared/ must not import from back/entity/ or back/api/',
      severity: 'error',
      from: {
        path: '^back/shared/',
        // schema.ts is Drizzle Kit's required single entry point re-exporting every
        // table schema (see the file's own header comment) - it must know about all entities
        pathNot: [
          String.raw`\.(test|spec)\.[tj]sx?$`,
          String.raw`^back/shared/lib/drizzle/schema\.ts$`,
        ],
      },
      to: { path: '^back/(entity|api)/' },
    },

    // ── Slice isolation (no cross-slice imports within a layer) ────────────
    // FSD rule: slices within the same layer are peers and must not depend on
    // each other. Capture groups in from.path are substituted into to.path.
    {
      name: 'no-cross-slice-front-entities',
      comment: 'Slices within front/entities/ must not import from sibling slices',
      severity: 'error',
      from: { path: '^front/entities/([^/]+)/', pathNot: String.raw`\.(test|spec)\.[tj]sx?$` },
      to: { path: '^front/entities/(?!$1/)[^/]+/' },
    },
    {
      name: 'no-cross-slice-front-pages',
      comment: 'Slices within front/pages/ must not import from sibling slices',
      severity: 'error',
      from: { path: '^front/pages/([^/]+)/', pathNot: String.raw`\.(test|spec)\.[tj]sx?$` },
      to: { path: '^front/pages/(?!$1/)[^/]+/' },
    },
    {
      name: 'no-cross-slice-front-widgets',
      comment: 'Slices within front/widgets/ must not import from sibling slices',
      severity: 'error',
      from: { path: '^front/widgets/([^/]+)/', pathNot: String.raw`\.(test|spec)\.[tj]sx?$` },
      to: { path: '^front/widgets/(?!$1/)[^/]+/' },
    },
    {
      // front/features/ is nested one level deeper than the other layers
      // (features/<group>/<slice>/), so the slice identifier needs 2 capture groups
      name: 'no-cross-slice-front-features',
      comment: 'Slices within front/features/ must not import from sibling slices',
      severity: 'error',
      from: {
        path: '^front/features/([^/]+)/([^/]+)/',
        pathNot: String.raw`\.(test|spec)\.[tj]sx?$`,
      },
      to: { path: '^front/features/(?!$1/$2/)[^/]+/[^/]+/' },
    },
    {
      name: 'no-cross-slice-back-api',
      comment: 'Slices within back/api/ must not import from sibling slices',
      severity: 'error',
      from: { path: '^back/api/([^/]+)/', pathNot: String.raw`\.(test|spec)\.[tj]sx?$` },
      to: { path: '^back/api/(?!$1/)[^/]+/' },
    },
    {
      name: 'no-cross-slice-back-entity',
      comment: 'Slices within back/entity/ must not import from sibling slices',
      severity: 'error',
      from: {
        path: '^back/entity/([^/]+)/',
        pathNot: [
          String.raw`\.(test|spec)\.[tj]sx?$`,
          // permission checks need the user's roles
          String.raw`^back/entity/quotation/getQuotationPermissionLevel\.ts$`,
          // a bookmark is a saved snapshot of a quotation, so it reuses the quotation schema
          String.raw`^back/entity/bookmark/schema/bookmarkSchemaV[0-9]+\.ts$`,
        ],
      },
      to: { path: '^back/entity/(?!$1/)[^/]+/' },
    },
  ],

  options: {
    /* Resolve @front/*, @back/*, @root/*, @tests/* TypeScript path aliases */
    tsConfig: { fileName: './tsconfig.json' },

    /* Track `import type` */
    tsPreCompilationDeps: true,

    moduleSystems: ['es6'],

    /* Only report violations in our own source */
    exclude: {
      path: 'node_modules',
    },

    reporterOptions: {
      text: {
        highlightFocused: true,
      },
    },
  },
}
