// GITHUB_PAGES=true alone still means "serve from github.io/<repo>" (no custom domain wired up
// yet in that environment). Once a custom domain is live behind the CNAME file, deploys should
// set CUSTOM_DOMAIN=true (or simply omit GITHUB_PAGES) so the site is built to be served from
// the root, matching keyboardtoolkit.site.
const isProjectPageBuild = process.env.GITHUB_PAGES === "true" && process.env.CUSTOM_DOMAIN !== "true";
const repoName = "Keyboard-type-test-";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: isProjectPageBuild ? `/${repoName}` : "",
  assetPrefix: isProjectPageBuild ? `/${repoName}/` : "",
};

export default nextConfig;
