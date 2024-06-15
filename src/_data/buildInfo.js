/*https://www.aleksandrhovhannisyan.com/blog/eleventy-build-info/*/

const packageJson = require('../../package.json');

module.exports = () => {
  const now = new Date();
  const timeZone = 'America/Toronto';
  const buildTime = new Intl.DateTimeFormat('en-CA', {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone,
  }).format(now);

  const latestGitCommitHash =
    require('child_process')
      .execSync('git rev-parse HEAD')
      .toString().trim();

  console.log(latestGitCommitHash);

  return {
    time: {
      raw: now.toISOString(),
      // formatted: `${buildTime}`,
      formatted: `${buildTime} (Local Time)`,
      version: packageJson.version,
      hash: latestGitCommitHash,
    },
  };
};