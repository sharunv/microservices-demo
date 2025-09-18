pipeline {
    agent any

    environment {
        PROJECT_ID     = 'project-gcp-468607'
        CLUSTER_NAME   = 'velath'
        CLUSTER_REGION = 'us-central1-a'
        IMAGE_TAG      = "${env.BUILD_NUMBER}"
        GOOGLE_APPLICATION_CREDENTIALS = credentials('gcp-key')
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/sharunv/microservices-demo.git'
            }
        }

        stage('Auth GCP') {
            steps {
                sh '''
                echo "Authenticating with GCP..."
                gcloud auth activate-service-account --key-file=$GOOGLE_APPLICATION_CREDENTIALS
                gcloud config set project $PROJECT_ID
                gcloud container clusters get-credentials $CLUSTER_NAME --zone us-central1-a --project project-gcp-468607
                
                '''
            }
        }

        stage('Build & Push Users Service') {
            steps {
                sh '''
               
                sudo docker build -t gcr.io/$PROJECT_ID/users-service:$IMAGE_TAG ./users-service
                sudo docker push gcr.io/$PROJECT_ID/users-service:$IMAGE_TAG
                

                '''
            }
        }

        stage('Build & Push Orders Service') {
            steps {
                sh '''
               
                sudo docker build -t gcr.io/$PROJECT_ID/orders-service:$IMAGE_TAG ./orders-service
                sudo docker push gcr.io/$PROJECT_ID/orders-service:$IMAGE_TAG
                '''
            }
        }

        stage('Deploy with Helm') {
            steps {
                sh '''
                cd helm/microservices
                helm upgrade --install microservices-demo . \
                    --set usersService.image=gcr.io/$PROJECT_ID/users-service:$IMAGE_TAG \
                    --set ordersService.image=gcr.io/$PROJECT_ID/orders-service:$IMAGE_TAG
                '''
            }
        }
    }
}
