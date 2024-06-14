/*https://www.aleksandrhovhannisyan.com/blog/eleventy-build-info/*/

const packageJson = require('../../package.json');

module.exports = () => {
    const now = new Date();
    const timeZone = 'America/Toronto';
    const timeZoneAbbreviation = 'EST'
    const buildTime = new Intl.DateTimeFormat('en-CA', {
      dateStyle: 'short',
      timeStyle: 'short',
      timeZoneAbbreviation,
    }).format(now);

    const latestGitCommitHash =
    require('child_process').exec('git rev-parse HEAD', function(err, stdout) {
        console.log('Last commit hash on this branch is:', stdout);
    });
  
    return {
      time: {
        raw: now.toISOString(),
        // formatted: `${buildTime}`,
        formatted: `${buildTime} ${timeZoneAbbreviation}`,
        version: packageJson.version,
        hash: latestGitCommitHash,
      },
    };
  };