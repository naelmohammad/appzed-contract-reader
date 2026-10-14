# AppZed Contract Reader Agent

Extracts key terms, dates, and renewal deadlines from contracts for human review. Stateless: send contract text, get a term sheet back.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/naelmohammad/appzed-contract-reader)

Click **Deploy to Cloudflare**: it clones this repo to your GitHub account, provisions the bindings below on your Cloudflare account, and wires CI/CD with preview URLs on every PR.

## Bindings (auto-provisioned)

```jsonc
{
  "name": "appzed-contract-reader",
  "ai": {
    "binding": "AI"
  }
}
```

## Try it

```bash
curl -X POST https://<your-worker>.workers.dev/extract \
  -H 'content-type: application/json' \
  -d '{"contract":"This Services Agreement starts 2026-01-01 for 12 months and auto-renews unless cancelled 30 days prior. Fee: $500/month."}'
```

GET /health for a liveness check. Managed by AppZed (https://dev.appzed.com/solutions/contract-reader).
