/** @type {import('next').NextConfig} */
const nextConfig = {
        reactStrictMode: true,
    images: {
        domains: ['lh3.googleusercontent.com','avatars.githubusercontent.com'],
    },

    // images: {
    //     remotePatterns: [
    //     {
    //         protocol: 'https',
    //         hostname: 'lh3.googleusercontent.com',
    //         port: '',
    //         pathname: '*',
    //     },
    //     ],
    // },
};

export default nextConfig;
