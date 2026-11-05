# rnd-agent-fixture-provider

A **public** test fixture for the R&D agent (Track B) on dev-maya. It deploys nothing and holds nothing secret:
never add a token, an internal hostname or customer data here.

It is the provider in Track B's three-repository end-to-end proof. Its published contract is
`contract/operations.json`, the exact list of HTTP operations `src/routes.ts` serves and the response each one gives
(`src/contract.spec.ts` keeps the two equal, status and body). A consumer fixture's contract test reads that file from this repository's `main` branch, so a change
to the contract becomes visible to the consumer only once a person merges it.

Repository settings, rulesets and App access are managed in devops-terragrunt
`github/repos/rnd-agent-fixture-provider`. Changes reach `main` only by pull request, with a code owner's review.

```
npm ci && npm test
```
