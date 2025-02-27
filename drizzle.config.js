/** @type { import("drizzle-kit").Config } */
export default {
  schema: './configs/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_wrYOshV80bQe@ep-icy-term-a8p2pywq-pooler.eastus2.azure.neon.tech/ai-vdgy?sslmode=require',
  },
};
