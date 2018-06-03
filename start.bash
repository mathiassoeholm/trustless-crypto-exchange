cd api
yarn build-production
yarn rename-production
forever start -c "yarn production" ./

forever start -c "ganache-cli --defaultBalanceEther 9000000000000000000000 --db ./ganache-db" ./