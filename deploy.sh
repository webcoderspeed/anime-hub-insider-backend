set -e

FORMATTED_INPUT="${1,,}"

if [[ $FORMATTED_INPUT == '--hard' ]];
then
	echo -e "Deploy Type: HARD\nRemoving node_modules"
	rm -rf node_modules/
else
	echo "Deploy Type: SOFT"
fi

pnpm install --frozen-lockfile
pnpm build
echo "Deploying..."



pm2 stop ecosystem.config.cjs

pm2 start ecosystem.config.cjs

echo "Deployed!"	
