kubectl apply -f secret.yaml
kubectl apply -f deployments.yaml
kubectl apply -f services.yaml

kubectl get all -n mongodb-namespace