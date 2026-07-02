export default ({ env }) => ({
  ckeditor5: { enabled: true },

  // Media uploads. When R2 creds are present, store files in Cloudflare R2
  // (S3-compatible) and serve them from R2_PUBLIC_URL. Otherwise the key is
  // omitted entirely and Strapi falls back to its local disk provider (files
  // under public/uploads) for dev.
  ...(env("R2_ACCESS_KEY_ID")
    ? {
        upload: {
          config: {
            provider: "aws-s3",
            providerOptions: {
              // Public base URL the stored file links resolve to (r2.dev or a
              // custom domain bound to the bucket). No trailing slash.
              baseUrl: env("R2_PUBLIC_URL"),
              s3Options: {
                endpoint: env("R2_ENDPOINT"), // https://<account_id>.r2.cloudflarestorage.com
                region: "auto",
                credentials: {
                  accessKeyId: env("R2_ACCESS_KEY_ID"),
                  secretAccessKey: env("R2_SECRET_ACCESS_KEY"),
                },
                // ACL: null keeps the provider from sending a (default)
                // public-read ACL header — R2 rejects ACLs. The bucket is made
                // public via r2.dev / a custom domain instead.
                params: { Bucket: env("R2_BUCKET"), ACL: null },
              },
            },
            actionOptions: {
              upload: {},
              uploadStream: {},
              delete: {},
            },
          },
        },
      }
    : {}),
});
