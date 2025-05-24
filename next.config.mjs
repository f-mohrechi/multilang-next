import createNextInlplugin from "next-intl/plugin"

/** @type {import('next').NextConfig} */

const withNextIntl = createNextInlplugin()

const nextConfig = {
     webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  }
};

export default withNextIntl(nextConfig);
