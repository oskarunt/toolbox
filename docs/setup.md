# Setup

1. Create a public GitHub repository named `toolbox` and push these files to its default branch.
2. Create a Parallel API key, then add it under **Settings → Secrets and variables → Actions** as a repository secret named `PARALLEL_API_KEY`.
3. Under **Settings → Actions → General**, allow workflows to read and write the repository and allow GitHub Actions to create pull requests. Repository or organization policy may otherwise prevent the publishing job from pushing its branch or opening the review PR.
4. Optionally create an `inbox` label. The issue form requests it, but the workflow does not rely on the label.
5. Open an **Add to toolbox** issue from the repository owner's personal GitHub account.

The owner check assumes this is a personal-account repository: the issue author and `github.repository_owner` must be the same login. An organization-owned repository would need a different allowlist.

## Parallel processor

The workflow uses the `base` Task API processor. Change `PARALLEL_PROCESSOR` in `.github/workflows/add-entry.yml` if a sample of real entries shows that `lite`, `core`, or a fast processor is a better tradeoff.

## Review flow

Parallel's candidate is never committed directly. The publishing job validates it, creates a deterministic entry and README, runs the checks, and opens a PR containing the research source URLs. Merge that PR to admit the item and automatically close its inbox issue.
