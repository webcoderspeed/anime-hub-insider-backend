module.exports = {
  apps: [
    {
      name: 'animehubinsider-backend-server',
      script: 'npm run start:prod',
      watch: true,
      node_args: [
        '-r',
        './node_modules/dotenv/config',
        '--experimental-modules',
        '--experimental-json-modules',
      ],

      timestamp: 'HH:mm Z DD-MM-YYYY',
      ignore_watch: ['node_modules', 'uploads'],
    },
  ],
};
