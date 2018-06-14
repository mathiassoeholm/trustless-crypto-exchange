sudo yarn build-production;
yarn production;

forever start -c "sudo ganache-cli --account="0xd0553e1b1a82f39bffbc492c4538e5d3c8bd21f71fd2d360d5272e2a1e4e4fcc,9000000000000000000000"" ./