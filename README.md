## craftycoder.com
my personal website


### `preconditions`
1. [install hugo](https://gohugo.io/getting-started/installing/)
2. Go to $path/functions and create the key.json file, and then copy / paste your credentials obtained from firebase.

### install theme

```bash
git submodule add https://git.okkur.org/syna themes/syna
cd themes/syna
git checkout v0.17 
```

### `To run the application locally from the root of the application:`

- `hugo serve -D`
- `cd functions`
- `npm run-script serve`

### deploy to firebase

```bash
hugo --environment=production -D
firebase deploy
```
