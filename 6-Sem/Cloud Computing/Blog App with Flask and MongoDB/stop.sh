kubectl delete service/mongodb-express-service -n mongodb-namespace
kubectl delete service/mongodb-service -n mongodb-namespace
kubectl delete deployment.apps/mongodb-deployment -n mongodb-namespace
kubectl delete deployment.apps/mongodb-express-deployment -n mongodb-namespace
kubectl delete deployment.apps/flask-app-deployment -n mongodb-namespace
kubectl delete service/flask-app-service -n mongodb-namespace


kubectl get all -n mongodb-namespace