build-module-zip: create-env build-assets build-zip

build-zip:
	rm -rf falcon.zip
	cp -Raf $(PWD) /tmp
	rm -rf /tmp/falcon/assets/cache
	rm -rf /tmp/falcon/_dev/node_modules
	rm -rf /tmp/falcon/_dev/webpack/.env
	rm -rf /tmp/falcon/.github
	rm -rf /tmp/falcon/.gitignore
	rm -rf /tmp/falcon/.php-cs-fixer.cache
	rm -rf /tmp/falcon/.git
	mv -v /tmp/falcon $(PWD)/falcon
	cd falcon && zip -r ../falcon.zip .
	rm -rf $(PWD)/falcon

create-env:
	cp -v $(PWD)/_dev/webpack/.env-example $(PWD)/_dev/webpack/.env

build-assets:
	cd _dev && . ${HOME}/.nvm/nvm.sh && nvm install && yarn install && yarn build

