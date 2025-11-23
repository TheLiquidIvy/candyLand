# CI/CD Setup Guide - Candy Heaven Landing Page

## GitHub Actions Workflow

### File Location
`.github/workflows/build-deploy.yml`

### What It Does
- **Triggers**: Automatically runs on `main` and `develop` branch pushes and PRs
- **Tests**: Builds with Node 18.x and 20.x (matrix testing)
- **Features**:
  - ✅ Installs dependencies with npm ci
  - ✅ Runs full build (vite build)
  - ✅ Uploads build artifacts to GitHub (7-day retention)
  - ✅ Auto-deploys to Replit on main branch push

### Setup Instructions

1. **Add GitHub Secrets**
   - Go to: `Settings → Secrets and variables → Actions`
   - Add `REPLIT_TOKEN` from your Replit account
     - Get token at: https://replit.com/account/api

2. **Branch Protection** (Optional but recommended)
   - Go to: `Settings → Branches → Add rule`
   - Require status checks to pass before merging
   - This ensures only working code gets merged to main

3. **Artifact Downloads**
   - After workflow runs, download built files from `Actions` tab
   - Artifacts stay for 7 days

---

## Azure Pipelines Workflow

### File Location
`azure-pipelines.yml`

### What It Does
- **Triggers**: Automatically runs on `main` and `develop` branch pushes and PRs
- **Tests**: Builds with Node 18.x and 20.x (matrix strategy)
- **Features**:
  - ✅ Installs dependencies
  - ✅ Caches npm packages for faster builds
  - ✅ Builds project with Vite
  - ✅ Publishes artifacts
  - ✅ Creates GitHub releases on main branch

### Setup Instructions

1. **Create Azure DevOps Project**
   - Go to: https://dev.azure.com
   - Create new project or use existing

2. **Connect GitHub Repo**
   - Project Settings → Service connections
   - New service connection → GitHub
   - Authorize and select your repo

3. **Create Pipeline**
   - Pipelines → New pipeline
   - Select GitHub
   - Select your repository
   - Choose "Existing Azure Pipelines YAML file"
   - Select `azure-pipelines.yml`

4. **Setup Service Connection for GitHub Releases**
   - Create GitHub PAT (Personal Access Token)
   - Add to Azure as service connection named `github-connection`

---

## Deployment Options

### Option 1: Deploy to Replit (GitHub Actions)
```bash
# In your Replit account, get your API token
# Add to GitHub Secrets as REPLIT_TOKEN
# The workflow will auto-deploy on main branch push
```

### Option 2: Deploy to Azure App Service
```yaml
# Add to azure-pipelines.yml:
- task: AzureWebApp@1
  inputs:
    azureSubscription: 'your-subscription'
    appName: 'your-app-name'
    package: $(System.DefaultWorkingDirectory)/dist
```

### Option 3: Deploy to Static Web App (Azure)
```yaml
- task: AzureStaticWebApp@0
  inputs:
    workingDirectory: '$(System.DefaultWorkingDirectory)'
    app_build_command: 'npm run build'
    output_location: 'dist'
```

---

## Next Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Add CI/CD workflows"
   git push origin main
   ```

2. **Watch Workflows Run**
   - GitHub: Go to Actions tab
   - Azure: Go to Pipelines section

3. **Monitor Builds**
   - Check build status badges (can add to README)
   - Download artifacts
   - Track deployment status

---

## Workflow Status Badges

Add to your README.md:

```markdown
![GitHub Actions Build](https://github.com/YOUR_USERNAME/YOUR_REPO/actions/workflows/build-deploy.yml/badge.svg)
[![Build Status](https://dev.azure.com/YOUR_ORG/YOUR_PROJECT/_apis/build/status/YOUR_PIPELINE)](https://dev.azure.com/YOUR_ORG/YOUR_PROJECT/_build/latest?definitionId=YOUR_DEF_ID)
```

---

## Troubleshooting

**GitHub Actions fails to build**
- Check Node version compatibility
- Verify npm dependencies: `npm install` locally first
- Check workflow logs in Actions tab

**Azure Pipeline won't trigger**
- Verify YAML syntax (very strict about indentation)
- Check service connection is authenticated
- Verify branch name matches trigger conditions

**Deployment fails**
- Check all secrets are added correctly
- Verify deployment destination is configured
- Check build artifact path is correct

---

## Security Best Practices

✅ **Do**
- Store sensitive tokens in GitHub/Azure Secrets only
- Use least-privilege access tokens
- Rotate tokens regularly
- Add branch protection rules
- Review all deployments before merging

❌ **Don't**
- Commit tokens or credentials to repo
- Use personal access tokens without rotation policy
- Deploy to production without testing
- Share secrets across projects
