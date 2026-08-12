# Railway web vendor packages

Railway Production Root Directory is `apps/web`, so the build context
cannot see `../../packages/*`. These copies keep the concept demo
buildable under that constraint.

Sync from canonical packages:

```bash
node scripts/sync-web-railway-vendor.mjs
node scripts/sync-web-railway-vendor.mjs --check
```
