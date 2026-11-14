# The visual layer

The nameplate and line illustrations are custom SVGs made for this profile with coding assistance. They use a midnight blue, pale blue and warm sand palette. The orbit, cat blink, steam and stars use CSS animation. Each animation has a reduced-motion fallback. There are no external image generators, analytics or JavaScript inside these assets.

The icons are local line illustrations. They are navigation labels, not certifications or proficiency scores. Design, code, notes and after-hours icons are custom drawings; brand names identify destinations and are not official logos.

`assets/workbench.svg` is refreshed by `.github/workflows/workbench.yml` at 04:17 UTC daily (07:17 Riyadh), or manually from Actions. It reads the latest commit from three explicitly listed public repositories and escapes remote text before writing SVG. A commit is created only if the rendered content changes. It does not manufacture activity, invent streaks or read confidential repositories. The workflow uses the repository's built-in GitHub token and needs no personal secret.

The SVG assets render without the automation: the workflow updates their contents; it is not needed each time someone opens the profile.
