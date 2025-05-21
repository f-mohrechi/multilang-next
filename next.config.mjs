import createNextInlplugin from "next-intl/plugin"

/** @type {import('next').NextConfig} */

const withNextIntl = createNextInlplugin()

const nextConfig = {};

export default withNextIntl(nextConfig);
