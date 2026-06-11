/** @type {import('next').NextConfig} */
const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  },
]

const nextConfig = {
  outputFileTracingRoot: __dirname,
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [320, 640, 768, 1024, 1280, 1600],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512],
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['framer-motion', '@react-spring/web', 'lottie-react'],
  },
  poweredByHeader: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/security.txt',
        destination: '/.well-known/security.txt',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig