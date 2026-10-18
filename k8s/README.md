# Deployment to Kubernetes (k8s)

Deploying the application to a Kubernetes cluster is done in two steps:

1. Apply resources
2. Patch certain resources with updated values (e.g., secrets, images, etc.)
3. Restart the deployments to pick up the new values

Pre-requisites:

- Access to a kubernetes cluster
- `kubectl` installed

## Step 1: Apply Resources

To apply the resources, run the following command:

```bash
# Apply the resources for the desired environment
kubectl apply -k dev/ --namespace=sam
# or for production
kubectl apply -k prod/ --namespace=sam
```

> [!WARNING]
> Do not directly apply resources via `common/`. Resources appplied directly via `common/` are not suffixed with environment (i.e. `frontend-prod`) and may not find the resources that they depend on.

## Step 2: Update Resources

Some resources need to be updated with values that should not be hard-coded (i.e. secrets) or may change over time (e.g., image tags). To update these resources, you can use `kubectl patch` or `kubectl edit`.

### Secret - Registry

> [!NOTE]
> This is only required if you are using container images in a private registry.

To update registry credential secrets, you can use the following command:

```bash
kubectl create secret docker-registry regcred \
  --docker-server=ghcr.io \
  --docker-username=<your-username> \
  --docker-password=<your-token> \
  --namespace=sam
```

Replace `<your-username>` and `<your-token>` with your actual registry credentials.

### Secret - Generic

To update generic secrets (see `common/secrets.yaml` for reference), use the following commands:

```bash
kubectl create secret generic backend \
  --from-literal=BACKEND_ADMIN_JWT_SECRET='your-admin-jwt-secret' \
  --from-literal=BACKEND_API_TOKEN_SALT='your-api-token' \
  --from-literal=BACKEND_APP_KEYS='your-app-keys' \
  --from-literal=BACKEND_JWT_SECRET='your-jwt-secret' \
  --from-literal=BACKEND_ENCRYPTION_KEY='your-encryption-key' \
  --from-literal=BACKEND_TRANSFER_TOKEN_SALT='your-transfer-token' \
  --from-literal=FRONTEND_NUXT_API_TOKEN='your-api-token' \
  --namespace=sam
```

Replace the values with your actual secrets. The keys should match those defined in [`common/secrets.yaml`](common/secrets.yaml) for backend and frontend components.

### Image Tags

To update image tags in deployments, run the following command:

```bash
kubectl set image deployment/frontend-dev frontend=ghcr.io/samdruant-com/website-frontend:v1.0.0 --namespace=sam
```

  - `frontend-dev` is the deployment name (see `common/deployment.yaml` and the suffix label applied in `prod` or `dev`)
- `frontend` is the container name in the deployment spec
- `ghcr.io/samdruant-com/website-frontend:v1.0.0` is the new image and tag

## Step 3: Restart deployment

Once the resources have been updated, run the following command to update the application:

```bash
kubectl rollout restart deployment/frontend-dev --namespace=sam
kubectl rollout restart deployment/backend-dev --namespace=sam
```
