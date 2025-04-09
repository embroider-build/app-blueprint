# @embroider/app-blueprint

**Very** experimental blueprint for scaffolding Ember v2 apps with Vite

> [!WARNING]
> This blueprint is a preview of the [v2 app blueprint](https://rfcs.emberjs.com/id/0507-embroider-v2-package-format/) and was intended to an experiment to see what was needed to ship v2 addons. While the blueprint was successful in its aims, this blueprint will never become the default for newly generated Ember addons. The DX hit of forcing every Ember developer to maintain a monorepo was too high a bar and the Ember Core Tooling team decided it didn't match the expectations of the Ember community. We are currently developing a non-monorepo version of the addon blueprint that is still work in progress but you can try it out now: https://github.com/ember-cli/ember-addon-blueprint
>
> Anyone considering a new migration of a v1 addon to v2 should use the new `@ember/addon-blueprint` and not this one 👍

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
pnpm dlx ember-cli-update
```
