sudo yarn build-production;
yarn production;

forever start -c "sudo ganache-cli --defaultBalanceEther 9000000000000000000000 --db ./ganache-db" ./;