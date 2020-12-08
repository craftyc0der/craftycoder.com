#/bin/bash
rm -r ./public
hugo --environment=production -D
firebase deploy
