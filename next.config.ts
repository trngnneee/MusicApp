// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: process.env.NODE_ENV === 'development'
              ? 'http://localhost:3000'
              : 'https://music-app-sigma-eight.vercel.app/'
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,HEAD,PUT,PATCH,POST,DELETE'
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization'
          }
        ]
      }
    ]
  }
}

export default nextConfig