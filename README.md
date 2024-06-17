# @embroider/app-blueprint

**Very** experimental blueprint for scaffolding Ember v2 apps with Vite

> [!CAUTION]
> This blueprint is not intended for production or development use. There are a number of known issues that we are working on, and it is intended as a technology preview only. Do not use this blueprint unless you know what you are doing!
> 
> If you want to use Embroider in a production application follow the instructions on [the main Embroider README](https://github.com/embroider-build/embroider).

This is likely to change on a daily basis so you have to keep up to date with the changes to expect it work. Use [ember-cli-update](https://github.com/ember-cli/ember-cli-update) to update to the latest version.

## Usage

### Generating a brand new app

This following command will create a new folder called `my-fancy-app` in your cwd 

```bash
npx ember-cli@latest new my-fancy-app -b @embroider/app-blueprint --pnpm
```

### Updating an existing Ember app

If you want to try to update an existing app you can run this command **inside** your app's directory:

```bash
pnpx ember-cli@latest init -b @embroider/app-blueprint --pnpm --name your-app-name
```

it will prompt you to override some files and you should say yes to every override. 

Note: replace `your-app-name` with your existing app name (from the `package.json` file) for a smaller diff.

### Updating the blueprint version

Use [ember-cli-update](https://github.com/ember-cli/ember-cli-update) to update to later versions of the blueprint:

```bash
pnpx ember-cli-update
```
