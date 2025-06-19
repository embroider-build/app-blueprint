> [!IMPORTANT]
> This has been replaced by the app blueprint, [@ember/app-blueprint](https://github.com/ember-cli/ember-app-blueprint).

<details>
<summary>View the outdated README</summary>

# @embroider/app-blueprint

**Very** experimental blueprint for scaffolding Ember v2 apps with Vite

> [!WARNING]
> This blueprint is a preview of the [v2 app blueprint](https://rfcs.emberjs.com/id/0977-v2-app-format) and uses alpha versions of the upcoming Embroider release. When the RFC has reached the "Released" stage, and the upcoming Embroider release has been marked stable, you should be ok to use this blueprint; until then, only use this blueprint if you know what you're doing.

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
</details>
