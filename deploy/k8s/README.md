# Kubernetes Deployment

The deployment files have been grouped into three folders:

- `common/` - contains the common resources that are shared across all environments.
- `dev/` - contains the resources specific to the development environment.
- `prod/` - contains the resources specific to the production environment.

The main difference between the development and production environments is the values of the configmap. Also, the production environment has an ingress resource that defines the routing rules for the application and sets up SSL certificates for the application's domain.

## Usage

This section describes how to deploy the application to a Kubernetes cluster.

Pre-requisites:

- Setup a Kubernetes cluster
- Setup a certificate manager (see this [guide](https://www.oliverrr.net/notes/enabling-tls-on-your-k8-cluster))

### Getting Started

```bash
# first, apply env-specific resources
kubectl apply -f dev/

# or
kubectl apply -f prod/

# then, apply common resources
kubectl apply -f common/
```

### Setting up secrets

> Do not store real secrets in the `common/secret.yaml` file. The values present in the file are just placeholders for documentation purposes.

The `common/secret.yaml` file contains the secrets that are used by the application. However, since the values are just placeholders, you need to update them with the actual values in the cluster.

There are many ways (`kubectl edit`, `kubectl patch`) to update the secret values in the cluster but the recommended way is to use `kubectl create` + `kubectl apply` assuming you have a `.env` file with the actual secret values:

```bash
# Create and apply the secret directly
kubectl create secret generic sam --from-env-file=.env --dry-run=client -o yaml | kubectl apply -f -

# Restart the relevant deployments to pick up the new secret values
kubectl rollout restart deployment/sam-server
```

If you don't have a `.env` file, you can create the secret manually:

```bash
# create the secret from literal values
kubectl create secret generic sam --from-literal=DB_URI=your-database-password --from-literal=JWT_SECRET=your-jwt-secret --from-literal=ADMIN_SECRET=your-admin-secret --from-literal=BUCKET_S3_KEY=your-bucket-key --from-literal=BUCKET_S3_SECRET=your-bucket-secret --from-literal=BUCKET_NAME=your-bucket-name --from-literal=BUCKET_S3_REGION=your-bucket-region --from-literal=BUCKET_S3_URI=your-bucket-uri --dry-run=client -o yaml > secret.yaml

# apply the secret resource
kubectl apply -f secret.yaml

# restart the relevant deployments to pick up the new secret values
kubectl rollout restart deployment/sam-server

# delete the secret.yaml file
rm secret.yaml
```
