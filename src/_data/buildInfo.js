/*https://www.aleksandrhovhannisyan.com/blog/eleventy-build-info/*/

const packageJson = require('../../package.json');

module.exports = () => {
  const now = new Date();
  const timeZone = 'EST';
  const buildTime = new Intl.DateTimeFormat('en-CA', {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone,
  }).format(now);

  const latestGitCommitHash =
    require('child_process')
      .execSync('git rev-parse --short HEAD')
      .toString().trim();

  return {
    time: {
      raw: now.toISOString(),
      // formatted: `${buildTime}`,
      formatted: `${buildTime} ${timeZone}`,
      version: packageJson.version,
      hash: latestGitCommitHash,
    },
  };
};