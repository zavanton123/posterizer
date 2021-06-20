# build the prod images
docker build -t zavanton/posterizer-web:latest -t zavanton/posterizer-web:$SHA -f ./web/Dockerfile ./web
docker build -t zavanton/posterizer-api:latest -t zavanton/posterizer-api:$SHA -f ./api/Dockerfile ./api

# push the prod images to Docker Hub (with the latest tag)
docker push zavanton/posterizer-web:latest
docker push zavanton/posterizer-api:latest

# push the prod images to Docker Hub (with the git sha tag)
docker push zavanton/posterizer-web:$SHA
docker push zavanton/posterizer-api:$SHA

# apply the k8s configs located in the ./k8s directory
kubectl apply -f k8s

# update the images in the k8s cluster
kubectl set image deployments/server-deployment server=zavanton/posterizer-api:$SHA
kubectl set image deployments/client-deployment client=zavanton/posterizer-web:$SHA
