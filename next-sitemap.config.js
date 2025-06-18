/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://pickly-gamma.vercel.app', // 배포 도메인
    generateRobotsTxt: true, // 자동으로 robots.txt도 만들어줌
    changefreq: 'daily',
    priority: 0.7,
    sitemapSize: 5000,
  };