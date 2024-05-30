pipeline {
    agent any
    tools {nodejs "nodejs"}
    environment {
        // registryCredential = 'millynguyen'
        dockerImage = ''
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
                echo "Run build to check if the code is valid"
                sh 'npm run build'
                echo "Build Docker Image"
                script {
                    dockerImage = docker.build("millynguyen/milly-test:${env.BUILD_ID}")
                }
            }
        }
        stage('Test') {
            steps {
                echo "Run unit tests with Jest"
                sh 'npm run test'
                echo "Code analysis with Eslint"
                sh 'npm run lint'
            }
        }
        stage('Code Quality Analysis') {
            steps {
                echo "Code quality analysis with SonarCloud"
            }
        }
        stage('Deploy') {
            steps {
                echo "Deploy to  DockerHub"
                script {
                    docker.withRegistry("https://registry.hub.docker.com", 'millydocker') {
                        dockerImage.push()
                    }
                sh "docker rmi -f millynguyen/milly-test:${env.BUILD_ID}"
                }
            }
        }
        stage('Release') {
            steps {
                echo "deploy to production with Vercel"
            }
        }
    }
}