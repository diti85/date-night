echo "Kill all the running PM2 actions"
sudo pm2 kill

echo "Jump to app folder"
cd /home/ubuntu/date-night

echo "Update app from Git"
git pull

echo "Install app dependencies"
sudo rm -rf node_modules package-lock.json
sudo npm install
echo "Installing backend dependencies"
sudo cd /home/ubuntu/date-night/backend
sudo npm install

echo "Build your app"
sudo npm run build
sudo cp -R dist/ /var/www/html/datenight/

echo "Run new PM2 action"
sudo cp /home/ubuntu/eccosystem.json eccosystem.json
sudo pm2 start eccosystem.json
